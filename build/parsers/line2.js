export const usLine2Prefixes = {
    APARTMENT: "APT",
    APT: "APT",
    BASEMENT: "BSMT",
    BSMT: "BSMT",
    BLDG: "BLDG",
    BUILDING: "BLDG",
    DEPARTMENT: "DEPT",
    DEPT: "DEPT",
    FL: "FL",
    FLOOR: "FL",
    FRNT: "FRNT",
    FRONT: "FRNT",
    HANGAR: "HNGR",
    HNGR: "HNGR",
    LBBY: "LBBY",
    LOBBY: "LBBY",
    LOT: "LOT",
    LOWER: "LOWR",
    LOWR: "LOWER",
    OFC: "OFC",
    OFFICE: "OFC",
    PENTHOUSE: "PH",
    PH: "PH",
    PIER: "PIER",
    REAR: "REAR",
    RM: "RM",
    ROOM: "RM",
    SIDE: "SIDE",
    SLIP: "SLIP",
    SPACE: "SPC",
    SPC: "SPC",
    STE: "STE",
    STOP: "STOP",
    SUITE: "STE",
    TRAILER: "TRLR",
    TRLR: "TRLR",
    UNIT: "UNIT",
    UPPER: "UPPR",
    UPPR: "UPPR",
    "#": "#",
};
export function validateUsLine2Type(input) {
    input = input.toUpperCase();
    const found = usLine2Prefixes[input];
    if (found) {
        return input;
    }
    const inputArr = input.split(" ");
    return (Object.keys(usLine2Prefixes).find((v) => {
        const idx = inputArr.indexOf(v);
        if (idx === -1)
            return false;
        // Prefix must be the last word or followed by a number (e.g. "APT 4B", "STE 200").
        // This prevents street name words like "Lower" from being misread as unit designators.
        const next = inputArr[idx + 1];
        return !next || /^\d/.test(next);
    }) || undefined);
}
