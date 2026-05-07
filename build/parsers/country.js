export function isValidCountryCode(inputString) {
    return !!inputString && ['US', 'USA', 'United States', 'Canada'].includes(inputString);
}
