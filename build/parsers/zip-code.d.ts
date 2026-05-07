interface ParseZipCodeResult {
  zip5?: string;
  zip4?: string;
  zipInternational?: string;
  originalInput: string;
  trimmedString: string;
}
/**
 * Parses ZIP/Postal Codes in these forms:
 *
 * - `#####` (US ZIP Code - 5 Digit)
 * - `#####-####` (US ZIP Code - 5 + 4 Digit)
 * - `A1A-1A1`/`A1A1A1`/`"A1A 1A1"` (Canadian Zip Code)
 *
 * The input to this function should **end** with the ZIP code to process.
 * Other cases are not yet supported. For example:
 * @example
 *
 * parseZipCode('1 Main Street, San Diego CA 92115')
 *
 * @param input
 * @returns
 */
export declare function parseZipCode(input: string | undefined): ParseZipCodeResult | undefined;
