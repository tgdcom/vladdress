const poBoxRegex = /(P\.?O\.?|POST\s+OFFICE)\s+(BOX|DRAWER)\s\w+/i;
export const parsePOBox = (streetString) => {
    const line1 = streetString?.match(poBoxRegex)?.[0];
    streetString = streetString?.replace(poBoxRegex, '').trim(); // Carve off the first address line
    return { line1, streetString };
};
export const matchesPOBox = (input) => {
    return !!input && poBoxRegex.test(input);
};
