export declare const matchesNoSuffix: (input: string | undefined) => boolean;
interface ParseNoSuffixResult {
  line1: string | undefined;
  line2: string | undefined;
  streetName: string | undefined;
  streetNumber: string | undefined;
  streetString: string | undefined;
}
export declare const parseNoSuffix: (streetString: string | undefined) => ParseNoSuffixResult;
