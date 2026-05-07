import { ParsedAddress } from "./model/parsed-address";
interface Options {
  allowPartialAddress?: boolean;
}
export declare const parseUsAddress: (address: string, options?: Options) => Partial<ParsedAddress>;
export declare const makeFormattedAddress: (
  stateCode: string,
  placeName: string,
  line1?: string,
  zipCode?: string,
) => string;
export declare const makeAddressId: (formattedAddress: string) => string;
