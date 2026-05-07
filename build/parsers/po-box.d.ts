interface ParsePOBoxResult {
  line1: string | undefined;
  streetString: string | undefined;
}
export declare const parsePOBox: (streetString: string | undefined) => ParsePOBoxResult;
export declare const matchesPOBox: (input: string | undefined) => boolean;
