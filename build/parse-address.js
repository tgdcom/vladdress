import { removeRepeatedSpaces } from './utils/strings';
import { isValidCountryCode } from './parsers/country';
import { parseZipCode } from './parsers/zip-code';
import { getStateInfo } from './parsers/state';
import { getLastElement } from './utils/array';
import { parseUsAddress } from './parse-address-us';
import { parsePrAddress } from './parse-address-pr';
export const parseAddress = function (address, options) {
    if (!address) {
        throw new Error('parseAddress: Argument must be a non-empty string.');
    }
    // Detect state to choose the right parser
    let parts = address.split(/,|\t|\n/).map(removeRepeatedSpaces).filter((s) => !!s);
    if (isValidCountryCode(getLastElement(parts)?.trim())) {
        parts = parts.slice(0, -1);
    }
    const stateZipString = getLastElement(parts)?.trim();
    const zip = parseZipCode(stateZipString);
    const stateInfo = getStateInfo(zip?.trimmedString ?? stateZipString ?? '');
    if (stateInfo.stateAbbreviation === 'PR') {
        return parsePrAddress(address, options);
    }
    return parseUsAddress(address, options);
};
