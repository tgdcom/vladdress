export const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
export const removeRepeatedSpaces = (from) => {
    return from.replace(/\s+/g, ' ');
};
export const replaceCaseInsensitive = (input, replacer, last = false, replaceWith) => {
    if (!replacer || !input) {
        return input;
    }
    const lowerCaseInput = input.toLowerCase();
    const lowerCaseReplacer = replacer.toLowerCase();
    const idx = last ? lowerCaseInput.lastIndexOf(lowerCaseReplacer) : lowerCaseInput.indexOf(lowerCaseReplacer);
    if (idx === -1) {
        return input;
    }
    return input.substring(0, idx) + (replaceWith || '') + input.substring(idx + lowerCaseReplacer.length);
};
