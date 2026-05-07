export declare const prLine1Prefixes: Record<string, string>;
export declare function getPrLine1Prefix(input: string | undefined): string | undefined;
export declare function matchesPrStreet(input: string | undefined): boolean;
interface ParsePrStreetResult {
  streetNumber: string | undefined;
  streetSuffix: string | undefined;
  streetName: string | undefined;
  streetDirection: string | undefined;
  line1: string;
  line2: string | undefined;
}
export declare function parsePrStreet(streetString: string): ParsePrStreetResult;
