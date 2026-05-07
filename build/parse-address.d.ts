import { ParsedAddress } from "./model/parsed-address";
interface Options {
  allowPartialAddress?: boolean;
}
export declare const parseAddress: (address: string, options?: Options) => Partial<ParsedAddress>;
