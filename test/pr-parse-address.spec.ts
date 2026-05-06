import { describe, it, expect } from "vite-plus/test";
import * as addresser from "../src";

describe("Puerto Rican Address Parser (parseAddress)", function () {
  describe("Puerto Rican Addresses", () => {
    it("should parse AVE prefix with apartment (Pub 28 §291 pattern 1)", function () {
      const result = addresser.parseAddress("1234 AVE ASHFORD APT 1A, SAN JUAN PR 00907-1021");
      expect(result.streetNumber).toBe("1234");
      expect(result.streetSuffix).toBe("Ave");
      expect(result.streetName).toBe("Ashford");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("1234 Ave Ashford");
      expect(result.addressLine2).toBe("APT 1A");
      expect(result.placeName).toBe("San Juan");
      expect(result.stateAbbreviation).toBe("PR");
      expect(result.stateName).toBe("Puerto Rico");
      expect(result.zipCode).toBe("00907");
      expect(result.zipCodePlusFour).toBe("00907-1021");
    });

    it("should parse a simple CALLE street (Pub 28 §295)", function () {
      const result = addresser.parseAddress("24 CALLE MARTINEZ, MAYAGUEZ PR 00969");
      expect(result.streetNumber).toBe("24");
      expect(result.streetSuffix).toBe("Calle");
      expect(result.streetName).toBe("Martinez");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("24 Calle Martinez");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Mayaguez");
      expect(result.stateAbbreviation).toBe("PR");
      expect(result.stateName).toBe("Puerto Rico");
      expect(result.zipCode).toBe("00969");
    });

    it("should parse a numbered urbanization with no named street (Pub 28 §292)", function () {
      const result = addresser.parseAddress("1234 URB LOS OLMOS, PONCE PR 00731-1235");
      expect(result.streetNumber).toBe("1234");
      expect(result.streetName).toBe("Urb Los Olmos");
      expect(result.addressLine1).toBe("1234 Urb Los Olmos");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Ponce");
      expect(result.stateAbbreviation).toBe("PR");
      expect(result.stateName).toBe("Puerto Rico");
      expect(result.zipCode).toBe("00731");
      expect(result.zipCodePlusFour).toBe("00731-1235");
    });

    it("should parse URB + CALLE as three-line format (Pub 28 §292)", function () {
      const result = addresser.parseAddress(
        "URB LAS GLADIOLAS, 150 CALLE A, SAN JUAN PR 00926-0221",
      );
      expect(result.addressLine1).toBe("Urb Las Gladiolas");
      expect(result.addressLine2).toBe("150 Calle A");
      expect(result.streetNumber).toBe("150");
      expect(result.streetSuffix).toBe("Calle");
      expect(result.streetName).toBe("A");
      expect(result.streetDirection).toBeUndefined();
      expect(result.placeName).toBe("San Juan");
      expect(result.stateAbbreviation).toBe("PR");
      expect(result.stateName).toBe("Puerto Rico");
      expect(result.zipCode).toBe("00926");
      expect(result.zipCodePlusFour).toBe("00926-0221");
    });

    it("should parse COND + CALLE + APT as three-line format (Pub 28 §291 pattern 2)", function () {
      const result = addresser.parseAddress(
        "COND LAS AMAPOLAS, 1230 CALLE AMAPOLAS APT 103, CAROLINA PR 00979-1126",
      );
      expect(result.addressLine1).toBe("Cond Las Amapolas");
      expect(result.addressLine2).toBe("1230 Calle Amapolas, APT 103");
      expect(result.streetNumber).toBe("1230");
      expect(result.streetSuffix).toBe("Calle");
      expect(result.streetName).toBe("Amapolas");
      expect(result.streetDirection).toBeUndefined();
      expect(result.placeName).toBe("Carolina");
      expect(result.stateAbbreviation).toBe("PR");
      expect(result.stateName).toBe("Puerto Rico");
      expect(result.zipCode).toBe("00979");
      expect(result.zipCodePlusFour).toBe("00979-1126");
    });
  });

  describe("PO Box", () => {
    it("should parse a PR PO Box address", function () {
      const result = addresser.parseAddress("PO BOX 1234, BAYAMON PR 00979");
      expect(result.addressLine1).toBe("PO BOX 1234");
      expect(result.addressLine2).toBeUndefined();
      expect(result.streetNumber).toBeUndefined();
      expect(result.streetName).toBeUndefined();
      expect(result.placeName).toBe("Bayamon");
      expect(result.stateAbbreviation).toBe("PR");
      expect(result.stateName).toBe("Puerto Rico");
      expect(result.zipCode).toBe("00979");
    });

    it("should parse a PR PO Box address with dots and ZIP+4", function () {
      const result = addresser.parseAddress("P.O. BOX 1234, BAYAMON PR 00979-0001");
      expect(result.addressLine1).toBe("P.O. BOX 1234");
      expect(result.addressLine2).toBeUndefined();
      expect(result.streetNumber).toBeUndefined();
      expect(result.streetName).toBeUndefined();
      expect(result.placeName).toBe("Bayamon");
      expect(result.stateAbbreviation).toBe("PR");
      expect(result.stateName).toBe("Puerto Rico");
      expect(result.zipCode).toBe("00979");
      expect(result.zipCodePlusFour).toBe("00979-0001");
    });

    it("should provide an id", function () {
      const result = addresser.parseAddress("PO BOX 1234\nBAYAMON PR 00979-0001");
      expect(result.addressLine1).toBe("PO BOX 1234");
      expect(result.id).toBe("po-box-1234-bayamon-pr-00979");
    });
  });
});
