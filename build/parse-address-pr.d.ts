import { ParsedAddress } from "./model/parsed-address";
interface Options {
  allowPartialAddress?: boolean;
}
export declare const parsePrAddress: (address: string, options?: Options) => Partial<ParsedAddress>;
