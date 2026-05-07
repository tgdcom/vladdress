import { getKeyByValue } from "../utils/properties";
import allStates from "../data/states.json";
import { replaceCaseInsensitive, toTitleCase } from "../utils/strings";
export function getStateInfo(input) {
    const result = {};
    if (input.length == 2 && getKeyByValue(allStates, input.toUpperCase())) {
        result.stateAbbreviation = input.toUpperCase();
        const key = getKeyByValue(allStates, result.stateAbbreviation);
        if (key) {
            result.stateName = toTitleCase(key);
        }
    }
    else {
        // Next check if the state string ends in state name or abbeviation
        // (state abbreviation must be preceded by a space to ensure accuracy)
        const lowerInput = input.toLowerCase();
        for (const state of Object.keys(allStates)) {
            if (lowerInput.endsWith(state)) {
                result.stateName = toTitleCase(state);
                result.stateAbbreviation = allStates[state];
                result.trimmedString = replaceCaseInsensitive(input, state)?.trim();
                break;
            }
            else if (lowerInput.endsWith(" " + allStates[state].toLowerCase())) {
                result.stateAbbreviation = allStates[state];
                result.stateName = toTitleCase(state);
                result.trimmedString = replaceCaseInsensitive(input, allStates[state])?.trim();
                break;
            }
        }
    }
    return result;
}
