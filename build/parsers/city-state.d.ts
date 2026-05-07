import allCities from "../data/cities.json";
interface ParsePlaceNameResult {
  placeName: string | undefined;
  placeString: string | undefined;
}
export declare const parsePlaceName: (
  placeString: string | undefined,
  stateAbbreviation: keyof typeof allCities | undefined,
) => ParsePlaceNameResult;
