import { toTitleCase } from "../utils/strings";
import allCities from "../data/cities.json";

type StateCities = string[];

interface ParsePlaceNameResult {
  placeName: string | undefined;
  placeString: string | undefined;
}

export const parsePlaceName = (
  placeString: string | undefined,
  stateAbbreviation: keyof typeof allCities | undefined,
): ParsePlaceNameResult => {
  const citiesForState: StateCities = stateAbbreviation ? allCities[stateAbbreviation] : [];
  const lowercasePlaceString = placeString?.toLowerCase();

  const foundCity = citiesForState.find((cityName) => {
    const lower = cityName.toLowerCase();
    return lowercasePlaceString === lower || lowercasePlaceString?.endsWith(' ' + lower);
  });

  let resultPlaceName: string | undefined;

  if (foundCity) {
    placeString = placeString?.substring(0, placeString.length - foundCity.length);
    resultPlaceName = foundCity;
  } else {
    resultPlaceName = toTitleCase(placeString || "");
    placeString = "";
  }

  return {
    placeName: resultPlaceName,
    placeString,
  };
};
