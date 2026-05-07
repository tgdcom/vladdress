export declare const streetAddressRegex: RegExp;
export declare const matchesStreetAddress: (input: string | undefined) => boolean;
export declare const matchStreetAddress: (input: string | undefined) => RegExpMatchArray | null;
interface ParseStreetAddressResult {
  streetName: string | undefined;
  line1: string | undefined;
  line2: string | undefined;
  streetDirection: string | undefined;
  streetSuffix: string | undefined;
  streetNumber: string | undefined;
  streetString: string | undefined;
}
export declare const parseStreetAddress: (
  streetString: string | undefined,
) => ParseStreetAddressResult;
