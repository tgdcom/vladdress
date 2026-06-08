import { toTitleCase } from "../utils/strings";
import allCities from "../data/cities.json";
export const parsePlaceName = (placeString, stateAbbreviation) => {
    const citiesForState = stateAbbreviation ? allCities[stateAbbreviation] : [];
    const lowercasePlaceString = placeString?.toLowerCase();
    const foundCity = citiesForState.find((cityName) => {
        const lower = cityName.toLowerCase();
        return lowercasePlaceString === lower || lowercasePlaceString?.endsWith(' ' + lower);
    });
    let resultPlaceName;
    if (foundCity) {
        placeString = placeString?.substring(0, placeString.length - foundCity.length);
        resultPlaceName = foundCity;
    }
    else {
        resultPlaceName = toTitleCase(placeString || "");
        placeString = "";
    }
    return {
        placeName: resultPlaceName,
        placeString,
    };
};
