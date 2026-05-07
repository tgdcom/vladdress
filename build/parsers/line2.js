export const usLine2Prefixes = {
    'APARTMENT': 'APT',
    'APT': 'APT',
    'BASEMENT': 'BSMT',
    'BSMT': 'BSMT',
    'BLDG': 'BLDG',
    'BUILDING': 'BLDG',
    'DEPARTMENT': 'DEPT',
    'DEPT': 'DEPT',
    'FL': 'FL',
    'FLOOR': 'FL',
    'FRNT': 'FRNT',
    'FRONT': 'FRNT',
    'HANGAR': 'HNGR',
    'HNGR': 'HNGR',
    'LBBY': 'LBBY',
    'LOBBY': 'LBBY',
    'LOT': 'LOT',
    'LOWER': 'LOWR',
    'LOWR': 'LOWER',
    'OFC': 'OFC',
    'OFFICE': 'OFC',
    'PENTHOUSE': 'PH',
    'PH': 'PH',
    'PIER': 'PIER',
    'REAR': 'REAR',
    'RM': 'RM',
    'ROOM': 'RM',
    'SIDE': 'SIDE',
    'SLIP': 'SLIP',
    'SPACE': 'SPC',
    'SPC': 'SPC',
    'STE': 'STE',
    'STOP': 'STOP',
    'SUITE': 'STE',
    'TRAILER': 'TRLR',
    'TRLR': 'TRLR',
    'UNIT': 'UNIT',
    'UPPER': 'UPPR',
    'UPPR': 'UPPR',
    '#': '#',
};
export function validateUsLine2Type(input) {
    input = input.toUpperCase();
    const found = usLine2Prefixes[input];
    if (found) {
        return input;
    }
    const inputArr = input.split(' ');
    return Object.keys(usLine2Prefixes).find((v) => inputArr.includes(v)) || undefined;
}
