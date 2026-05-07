import { toTitleCase } from '../../utils/strings';
import { validateUsLine2Type } from '../line2';
export const prLine1Prefixes = {
    URB: 'Urb',
    COND: 'Cond',
    BDA: 'Bda',
    BO: 'Bo',
    RES: 'Res',
    PARC: 'Parc',
    REPTO: 'Repto',
    MANS: 'Mans',
    VIL: 'Vil',
    JARD: 'Jard',
    EXT: 'Ext',
    EDIF: 'Edif',
};
const prStreetTypes = {
    calle: 'Calle',
    ave: 'Ave',
    avenida: 'Ave',
    carr: 'Carr',
    carretera: 'Carr',
};
// Norte/Sur/Este/Oeste → standard USPS abbreviations (English equivalents per §294)
const prDirectionals = {
    norte: 'N',
    sur: 'S',
    este: 'E',
    oeste: 'O',
    noreste: 'NE',
    noroeste: 'NO',
    sureste: 'SE',
    suroeste: 'SO',
};
const prStreetRegex = /^(?<streetNum>[\d]\w*)\s+(?<streetType>calle|ave(?:nida)?|carr(?:etera)?)\s+(?<streetName>.+)$/i;
export function getPrLine1Prefix(input) {
    if (!input)
        return undefined;
    const firstWord = input.split(/\s/)[0].toUpperCase();
    return prLine1Prefixes[firstWord] ? firstWord : undefined;
}
export function matchesPrStreet(input) {
    return !!input && prStreetRegex.test(input);
}
export function parsePrStreet(streetString) {
    // Strip any trailing line2 designator (APT, UNIT, etc.) before parsing the street
    let line2;
    const line2Type = validateUsLine2Type(streetString);
    if (line2Type) {
        const upperStr = streetString.toUpperCase();
        const idx = upperStr.indexOf(line2Type);
        line2 = streetString.substring(idx).trim();
        streetString = streetString.substring(0, idx).trim();
    }
    const match = streetString.match(prStreetRegex);
    if (!match?.groups) {
        throw new Error(`parsePrStreet: could not parse "${streetString}"`);
    }
    const { streetNum, streetType, streetName: rawName } = match.groups;
    const streetSuffix = prStreetTypes[streetType.toLowerCase()];
    // Check for trailing Spanish directional
    let streetName = rawName.trim();
    let streetDirection;
    const nameParts = streetName.split(/\s+/);
    const lastWord = nameParts[nameParts.length - 1].toLowerCase();
    if (prDirectionals[lastWord]) {
        streetDirection = prDirectionals[lastWord];
        nameParts.pop();
        streetName = nameParts.join(' ');
    }
    streetName = toTitleCase(streetName);
    const line1Parts = [streetNum, streetSuffix, streetName, streetDirection].filter(Boolean);
    const line1 = line1Parts.join(' ');
    return {
        streetNumber: streetNum,
        streetSuffix,
        streetName,
        streetDirection,
        line1,
        line2,
    };
}
