import { removeRepeatedSpaces, toTitleCase } from './utils/strings';
import { isValidCountryCode } from './parsers/country';
import { parseZipCode } from './parsers/zip-code';
import { getStateInfo } from './parsers/state';
import { getLastElement } from './utils/array';
import { parsePlaceName } from './parsers/city-state';
import { matchesNoSuffix, parseNoSuffix } from './parsers/no-suffix';
import { matchesPOBox, parsePOBox } from './parsers/po-box';
import { getPrLine1Prefix, matchesPrStreet, parsePrStreet } from './parsers/pr/street-address';
import { ParsedAddress } from './model/parsed-address';
import { makeFormattedAddress, makeAddressId } from './parse-address-us';

interface Options {
    allowPartialAddress?: boolean;
}

export const parsePrAddress = function (address: string, options?: Options): Partial<ParsedAddress> {
    if (!address) {
        throw new Error('parseAddress: Argument must be a non-empty string.');
    }

    let addressParts = address.split(/,|\t|\n/).map(removeRepeatedSpaces).filter((s) => !!s);

    const countrySection = getLastElement(addressParts)?.trim();
    if (isValidCountryCode(countrySection)) {
        addressParts = addressParts.slice(0, -1);
    }

    const stateZipString = getLastElement(addressParts)?.trim();
    const zipCode = parseZipCode(stateZipString);
    const resultZipCode = zipCode?.zip5 || zipCode?.zipInternational;
    let resultZip4: string | undefined;

    if (zipCode?.zip5 && zipCode.zip4) {
        resultZip4 = `${zipCode.zip5}-${zipCode.zip4}`;
    }

    let cityStateString = zipCode?.trimmedString;

    if (cityStateString && cityStateString.length > 0) {
        addressParts[addressParts.length - 1] = cityStateString;
    } else {
        addressParts.splice(-1, 1);
        cityStateString = addressParts[addressParts.length - 1]?.trim();
    }

    const stateInfo = getStateInfo(cityStateString);
    const resultStateAbbreviation = stateInfo.stateAbbreviation;
    const resultStateName = stateInfo.stateName;
    const cityString = stateInfo.trimmedString;

    if (!resultStateAbbreviation || !resultStateName || resultStateAbbreviation.length != 2) {
        throw new Error('Can not parse address. State not found.');
    }

    let placeString: string | undefined;

    if (cityString && cityString.length > 0) {
        addressParts[addressParts.length - 1] = cityString;
        placeString = getLastElement(addressParts);
    } else {
        addressParts.splice(-1, 1);
        placeString = addressParts[addressParts.length - 1]?.trim();
    }

    type StateAbbreviation = Parameters<typeof parsePlaceName>[1];
    const placeNameResult = parsePlaceName(placeString, resultStateAbbreviation as StateAbbreviation);
    const resultPlaceName = placeNameResult.placeName;

    if (!resultPlaceName) {
        throw new Error('No Place Name Specified');
    }

    placeString = placeNameResult.placeString;

    if (placeString && placeString.length > 0) {
        addressParts[addressParts.length - 1] = placeString;
    } else {
        addressParts = addressParts.slice(0, -1);
    }

    if (addressParts.length === 0) {
        if (!options?.allowPartialAddress) {
            throw new Error('Can not parse address. Invalid street address data. Input string: ' + address);
        }

        const formattedAddress = makeFormattedAddress(resultStateAbbreviation, resultPlaceName);
        return {
            formattedAddress,
            id: makeAddressId(formattedAddress),
            stateAbbreviation: resultStateAbbreviation,
            stateName: resultStateName,
            placeName: resultPlaceName,
            zipCode: resultZipCode,
            zipCodePlusFour: resultZip4,
        };
    }

    // Handle two-part PR addresses: one part is a line-1 prefix (URB/COND/etc.)
    if (addressParts.length === 2) {
        const line1Idx = addressParts.findIndex(p => !!getPrLine1Prefix(p));

        if (line1Idx !== -1) {
            const prLine1Raw = addressParts.splice(line1Idx, 1)[0].trim();
            const streetLine = addressParts[0].trim();

            const resultAddressLine1 = toTitleCase(prLine1Raw);

            let resultStreetNumber: string | undefined;
            let resultStreetSuffix: string | undefined;
            let resultStreetName: string | undefined;
            let resultStreetDirection: string | undefined;
            let resultAddressLine2: string = streetLine;

            if (matchesPrStreet(streetLine)) {
                const res = parsePrStreet(streetLine);
                resultStreetNumber = res.streetNumber;
                resultStreetSuffix = res.streetSuffix;
                resultStreetName = res.streetName;
                resultStreetDirection = res.streetDirection;
                // Keep the full street line (including any embedded APT) as addressLine2
                resultAddressLine2 = res.line2
                    ? `${res.line1}, ${res.line2}`
                    : res.line1;
            }

            const addressString = `${resultAddressLine1}, ${resultAddressLine2}`;
            const resultFormattedAddress = makeFormattedAddress(
                resultStateAbbreviation,
                resultPlaceName,
                addressString,
                resultZipCode,
            );

            return {
                zipCode: resultZipCode,
                zipCodePlusFour: resultZip4,
                stateAbbreviation: resultStateAbbreviation,
                stateName: resultStateName,
                placeName: resultPlaceName,
                addressLine1: resultAddressLine1,
                addressLine2: resultAddressLine2,
                streetNumber: resultStreetNumber,
                streetSuffix: resultStreetSuffix,
                streetDirection: resultStreetDirection,
                streetName: resultStreetName,
                id: makeAddressId(resultFormattedAddress),
                formattedAddress: resultFormattedAddress,
            };
        }

        throw new Error('Can not parse address. More than two address lines.');
    }

    const streetString = addressParts[0]?.trim();

    let resultAddressLine1: string | undefined;
    let resultStreetNumber: string | undefined;
    let resultStreetName: string | undefined;
    let resultStreetDirection: string | undefined;
    let resultStreetSuffix: string | undefined;
    let resultAddressLine2: string | undefined;

    if (matchesPOBox(streetString)) {
        const res = parsePOBox(streetString);
        resultAddressLine1 = res.line1;
    } else if (matchesPrStreet(streetString)) {
        const res = parsePrStreet(streetString);
        resultAddressLine1 = res.line1;
        resultStreetNumber = res.streetNumber;
        resultStreetSuffix = res.streetSuffix;
        resultStreetName = res.streetName;
        resultStreetDirection = res.streetDirection;
        resultAddressLine2 = res.line2;
    } else if (matchesNoSuffix(streetString)) {
        const res = parseNoSuffix(streetString);
        resultStreetNumber = res.streetNumber;
        resultStreetName = toTitleCase(res.streetName || '');
        resultAddressLine1 = [resultStreetNumber, resultStreetName].filter(Boolean).join(' ');
        resultAddressLine2 = res.line2;
    } else {
        throw new Error('Can not parse address. Invalid street address data. Input string: ' + address);
    }

    if (!resultAddressLine1) {
        throw new Error('Could not generate Address Line 1');
    }

    let addressString = resultAddressLine1;
    if (resultAddressLine2) {
        addressString += ', ' + resultAddressLine2;
    }

    const resultFormattedAddress = makeFormattedAddress(
        resultStateAbbreviation,
        resultPlaceName,
        addressString,
        resultZipCode,
    );

    return {
        zipCode: resultZipCode,
        zipCodePlusFour: resultZip4,
        stateAbbreviation: resultStateAbbreviation,
        stateName: resultStateName,
        placeName: resultPlaceName,
        addressLine1: resultAddressLine1,
        addressLine2: resultAddressLine2,
        streetNumber: resultStreetNumber,
        streetSuffix: resultStreetSuffix,
        streetDirection: resultStreetDirection,
        streetName: resultStreetName,
        id: makeAddressId(resultFormattedAddress),
        formattedAddress: resultFormattedAddress,
    };
};
