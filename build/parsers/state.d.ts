interface GetStateInfoResult {
  stateAbbreviation?: string;
  stateName?: string;
  trimmedString?: string;
}
export declare function getStateInfo(input: string): GetStateInfoResult;
