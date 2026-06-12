import { describe, it, expect } from "vite-plus/test";
import { parseAddress } from "../src/parse-address";

describe("Address Parser (parseAddress)", function () {
  describe("Formatting", () => {
    it("should parse a simple address", function () {
      const result = parseAddress("123 Main St, Conway, SC");
      expect(result.streetNumber).toBe("123");
      expect(result.streetName).toBe("Main");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("123 Main St");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Conway");
      expect(result.stateAbbreviation).toBe("SC");
      expect(result.stateName).toBe("South Carolina");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse a street name with two words", function () {
      const result = parseAddress("123 Fat Duck St, Powder Springs, GA");
      expect(result.streetNumber).toBe("123");
      expect(result.streetName).toBe("Fat Duck");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("123 Fat Duck St");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Powder Springs");
      expect(result.stateAbbreviation).toBe("GA");
      expect(result.stateName).toBe("Georgia");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse a street name containing a line2 keyword (e.g. 'Lower')", function () {
      const result = parseAddress("5858 Lower Bay Rd, Bay Saint Louis, MS 39520");
      expect(result.streetNumber).toBe("5858");
      expect(result.streetName).toBe("Lower Bay");
      expect(result.streetSuffix).toBe("Rd");
      expect(result.addressLine1).toBe("5858 Lower Bay Rd");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Bay Saint Louis");
      expect(result.stateAbbreviation).toBe("MS");
      expect(result.zipCode).toBe("39520");
    });
    it("should parse a street address with double spaces", function () {
      const result = parseAddress("123 Main  St, Conway, SC");
      expect(result.streetNumber).toBe("123");
      expect(result.streetName).toBe("Main");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("123 Main St");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Conway");
      expect(result.stateAbbreviation).toBe("SC");
      expect(result.stateName).toBe("South Carolina");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse a street address with zip code in standard format", function () {
      const result = parseAddress("123 Main  St, New Braunfels, TX 78132");
      expect(result.streetNumber).toBe("123");
      expect(result.streetName).toBe("Main");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("123 Main St");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("New Braunfels");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBe("78132");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse a street address with zip code plus four in standard format", function () {
      const result = parseAddress("123 Main  St, Conway, NC 29526-3131");
      expect(result.streetNumber).toBe("123");
      expect(result.streetName).toBe("Main");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("123 Main St");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Conway");
      expect(result.stateAbbreviation).toBe("NC");
      expect(result.stateName).toBe("North Carolina");
      expect(result.zipCode).toBe("29526");
      expect(result.zipCodePlusFour).toBe("29526-3131");
    });
    it("should parse a street address with a state name", function () {
      const result = parseAddress("123 Main  St, Conway, South Carolina 29526-3131");
      expect(result.streetNumber).toBe("123");
      expect(result.streetName).toBe("Main");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("123 Main St");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Conway");
      expect(result.stateAbbreviation).toBe("SC");
      expect(result.stateName).toBe("South Carolina");
      expect(result.zipCode).toBe("29526");
      expect(result.zipCodePlusFour).toBe("29526-3131");
    });
    it("should parse a street address with a lowercase state name", function () {
      const result = parseAddress("123 Main  St, Conway, south carolina 29526-3131");
      expect(result.streetNumber).toBe("123");
      expect(result.streetName).toBe("Main");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("123 Main St");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Conway");
      expect(result.stateAbbreviation).toBe("SC");
      expect(result.stateName).toBe("South Carolina");
      expect(result.zipCode).toBe("29526");
      expect(result.zipCodePlusFour).toBe("29526-3131");
    });
    it("should parse a street address with a lowercase state abbeviation", function () {
      const result = parseAddress("123 Main  St, San Antonio, tx 29526-3131");
      expect(result.streetNumber).toBe("123");
      expect(result.streetName).toBe("Main");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("123 Main St");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("San Antonio");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBe("29526");
      expect(result.zipCodePlusFour).toBe("29526-3131");
    });
    it("should parse a street address with a delimited zip code", function () {
      const result = parseAddress("123 Main  St, Canyon Lake, tx, 29526-3131");
      expect(result.streetNumber).toBe("123");
      expect(result.streetName).toBe("Main");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("123 Main St");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Canyon Lake");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBe("29526");
      expect(result.zipCodePlusFour).toBe("29526-3131");
    });
    it("should parse an address with no city delimiter", function () {
      const result = parseAddress("1301 Columbia College Drive Columbia, SC 29203");
      expect(result.streetNumber).toBe("1301");
      expect(result.streetName).toBe("Columbia College");
      expect(result.streetSuffix).toBe("Dr");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("1301 Columbia College Dr");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Columbia");
      expect(result.stateAbbreviation).toBe("SC");
      expect(result.stateName).toBe("South Carolina");
      expect(result.zipCode).toBe("29203");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse an address with line 2 incorrectly placed before line 1", function () {
      const result = parseAddress("UNIT 101, 1301 Acme Street E, Columbia, SC 29203");
      expect(result.streetNumber).toBe("1301");
      expect(result.streetName).toBe("Acme");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBe("E");
      expect(result.addressLine1).toBe("1301 Acme St E");
      expect(result.addressLine2).toBe("UNIT 101");
      expect(result.placeName).toBe("Columbia");
      expect(result.stateAbbreviation).toBe("SC");
      expect(result.stateName).toBe("South Carolina");
      expect(result.zipCode).toBe("29203");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse an address with secondary address at the beginning of line 1", function () {
      const result = parseAddress("UNIT 101, 1301 Acme Avenue, Columbia, SC 29203");
      expect(result.streetNumber).toBe("1301");
      expect(result.streetName).toBe("Acme");
      expect(result.streetSuffix).toBe("Ave");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("1301 Acme Ave");
      expect(result.addressLine2).toBe("UNIT 101");
      expect(result.placeName).toBe("Columbia");
      expect(result.stateAbbreviation).toBe("SC");
      expect(result.stateName).toBe("South Carolina");
      expect(result.zipCode).toBe("29203");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse an address with a trailing directional, all caps, and no delimiters", function () {
      const result = parseAddress("300 BOYLSTON ST E SEATTLE WA 98102");
      expect(result.streetNumber).toBe("300");
      expect(result.streetName).toBe("Boylston");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBe("E");
      expect(result.addressLine1).toBe("300 Boylston St E");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Seattle");
      expect(result.stateAbbreviation).toBe("WA");
      expect(result.stateName).toBe("Washington");
      expect(result.zipCode).toBe("98102");
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it("should parse an address with a trailing country", function () {
      const result = parseAddress("300 BOYLSTON AVE, SEATTLE WA 98102, USA");
      expect(result.streetNumber).toBe("300");
      expect(result.streetName).toBe("Boylston");
      expect(result.streetSuffix).toBe("Ave");
      expect(result.addressLine1).toBe("300 Boylston Ave");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Seattle");
      expect(result.stateAbbreviation).toBe("WA");
      expect(result.stateName).toBe("Washington");
      expect(result.zipCode).toBe("98102");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse an address with a dot after street abbreviation", function () {
      const result = parseAddress("200 SUMMIT LAKE DR., VALHALLA NY 10595");
      expect(result.streetNumber).toBe("200");
      expect(result.streetName).toBe("Summit Lake");
      expect(result.streetSuffix).toBe("Dr");
      expect(result.addressLine1).toBe("200 Summit Lake Dr");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Valhalla");
      expect(result.stateAbbreviation).toBe("NY");
      expect(result.stateName).toBe("New York");
      expect(result.zipCode).toBe("10595");
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it("should parse an address with a newline separator", function () {
      const result = parseAddress("200 SUMMIT LAKE DR.\nVALHALLA NY 10595");
      expect(result.streetNumber).toBe("200");
      expect(result.streetName).toBe("Summit Lake");
      expect(result.streetSuffix).toBe("Dr");
      expect(result.addressLine1).toBe("200 Summit Lake Dr");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Valhalla");
      expect(result.stateAbbreviation).toBe("NY");
      expect(result.stateName).toBe("New York");
      expect(result.zipCode).toBe("10595");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
  });

  describe("Missing Data", () => {
    it("should not parse a street address with missing city and state", function () {
      expect(() => parseAddress("123 Main  St")).toThrow("Can not parse address.");
    });
    it("should validate input is not undefined", function () {
      expect(() => parseAddress(undefined as any)).toThrow("Argument must be a non-empty string.");
    });
    it("should validate input is a non-empty string", function () {
      expect(() => parseAddress("")).toThrow("Argument must be a non-empty string.");
    });
    it("should not parse an invalid state abbreviation", function () {
      expect(() => parseAddress("123 Main St, Canyon Lake, XX, 29526-3131")).toThrow(
        "Can not parse address.",
      );
    });
    it("should throw if mandatory components are not present", function () {
      expect(() => parseAddress("1010 PINE, 9E-6-01\nST. LOUIS")).toThrow();
    });
  });

  describe("Partial Addresses", () => {
    it("City, State ZIP", () => {
      const result = parseAddress("Charlotte, NC 28202", { allowPartialAddress: true });
      expect(result.formattedAddress).toBe("Charlotte, NC");
      expect(result.id).toBe("charlotte-nc");
      expect(result.stateAbbreviation).toBe("NC");
      expect(result.zipCode).toBe("28202");
    });

    it("Full Address w/ option set", () => {
      const result = parseAddress("221 N Cedar St, Charlotte, NC 28202");

      expect(result.zipCode).toBe("28202");
      expect(result.streetName?.trim().length).toBeGreaterThan(0);
      expect(result.streetNumber).toBeDefined();
    });
  });

  describe("PO Box", () => {
    it("should parse an address with a PO BOX", function () {
      const result = parseAddress("PO BOX 538\nBASILE LA 70515-0538");
      expect(result.addressLine1).toBe("PO BOX 538");
      expect(result.addressLine2).toBeUndefined();
      expect(result.streetNumber).toBeUndefined();
      expect(result.streetName).toBeUndefined();
      expect(result.streetSuffix).toBeUndefined();
      expect(result.placeName).toBe("Basile");
      expect(result.stateAbbreviation).toBe("LA");
      expect(result.stateName).toBe("Louisiana");
      expect(result.zipCode).toBe("70515");
      expect(result.zipCodePlusFour).toBe("70515-0538");
    });

    it("should parse an address with a PO BOX written as P.O. DRAWER", function () {
      const result = parseAddress("P.O. DRAWER 538\nBASILE LA 70515-0538");
      expect(result.addressLine1).toBe("P.O. DRAWER 538");
      expect(result.addressLine2).toBeUndefined();
      expect(result.streetNumber).toBeUndefined();
      expect(result.streetName).toBeUndefined();
      expect(result.streetSuffix).toBeUndefined();
      expect(result.placeName).toBe("Basile");
      expect(result.stateAbbreviation).toBe("LA");
      expect(result.stateName).toBe("Louisiana");
      expect(result.zipCode).toBe("70515");
      expect(result.zipCodePlusFour).toBe("70515-0538");
    });

    it("should provide an id", function () {
      const result = parseAddress("PO BOX 538\nBASILE LA 70515-0538");
      expect(result.addressLine1).toBe("PO BOX 538");
      expect(result.id).toBe("po-box-538-basile-la-70515");
    });
  });

  describe("Edge Cases", () => {
    describe("Repeated Data", () => {
      it("should parse an address with same street and city name", function () {
        const result = parseAddress("400 South Orange Ave, South Orange , NJ 07079");
        expect(result.streetNumber).toBe("400");
        expect(result.streetName).toBe("South Orange");
        expect(result.streetSuffix).toBe("Ave");
        expect(result.streetDirection).toBeUndefined();
        expect(result.addressLine1).toBe("400 South Orange Ave");
        expect(result.addressLine2).toBeUndefined();
        expect(result.placeName).toBe("South Orange");
        expect(result.stateAbbreviation).toBe("NJ");
        expect(result.stateName).toBe("New Jersey");
        expect(result.zipCode).toBe("07079");
        expect(result.zipCodePlusFour).toBeUndefined();
      });
      it("should parse an address with a secondary value on same section with city", function () {
        const result = parseAddress("1301 Columbia College Drive Unit 101 Columbia, SC 29203");
        expect(result.streetNumber).toBe("1301");
        expect(result.streetName).toBe("Columbia College");
        expect(result.streetSuffix).toBe("Dr");
        expect(result.addressLine1).toBe("1301 Columbia College Dr");
        expect(result.addressLine2).toBe("Unit 101");
        expect(result.streetDirection).toBeUndefined();
        expect(result.placeName).toBe("Columbia");
        expect(result.stateAbbreviation).toBe("SC");
        expect(result.stateName).toBe("South Carolina");
        expect(result.zipCode).toBe("29203");
        expect(result.zipCodePlusFour).toBeUndefined();
      });
      it("should parse an address with a secondary value on separate line", function () {
        const result = parseAddress("1301 Columbia College Drive, APT A, Columbia, SC 29203");
        expect(result.streetNumber).toBe("1301");
        expect(result.streetName).toBe("Columbia College");
        expect(result.streetSuffix).toBe("Dr");
        expect(result.streetDirection).toBeUndefined();
        expect(result.addressLine1).toBe("1301 Columbia College Dr");
        expect(result.addressLine2).toBe("APT A");
        expect(result.placeName).toBe("Columbia");
        expect(result.stateAbbreviation).toBe("SC");
        expect(result.stateName).toBe("South Carolina");
        expect(result.zipCode).toBe("29203");
        expect(result.zipCodePlusFour).toBeUndefined();
      });
      it("should parse an address with a glen plus haven suffix (2 suffixes)", function () {
        const result = parseAddress("1301 Glen Haven, Columbia, SC 29203");
        expect(result.streetNumber).toBe("1301");
        expect(result.streetName).toBe("Glen");
        expect(result.streetSuffix).toBe("Hvn");
        expect(result.streetDirection).toBeUndefined();
        expect(result.addressLine1).toBe("1301 Glen Hvn");
        expect(result.addressLine2).toBeUndefined();
        expect(result.placeName).toBe("Columbia");
        expect(result.stateAbbreviation).toBe("SC");
        expect(result.stateName).toBe("South Carolina");
        expect(result.zipCode).toBe("29203");
        expect(result.zipCodePlusFour).toBeUndefined();
      });
    });
    it('should parse a street address with "Ave C" style street name', function () {
      const result = parseAddress("826 N Ave C, Crowley, LA 70526");
      expect(result.streetNumber).toBe("826");
      expect(result.streetName).toBe("N Ave C");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("826 N Ave C");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Crowley");
      expect(result.stateAbbreviation).toBe("LA");
      expect(result.stateName).toBe("Louisiana");
      expect(result.zipCode).toBe("70526");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it('should parse a street address with "Avenue N" style street name', function () {
      const result = parseAddress("826 N Avenue N, Crowley, LA 70526");
      expect(result.streetNumber).toBe("826");
      expect(result.streetName).toBe("N Ave N");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("826 N Ave N");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Crowley");
      expect(result.stateAbbreviation).toBe("LA");
      expect(result.stateName).toBe("Louisiana");
      expect(result.zipCode).toBe("70526");
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it('should parse a street address with "Ave. b" style street name', function () {
      const result = parseAddress("826 N Ave. b, Crowley, LA 70526");
      expect(result.streetNumber).toBe("826");
      expect(result.streetName).toBe("N Ave B");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("826 N Ave B");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Crowley");
      expect(result.stateAbbreviation).toBe("LA");
      expect(result.stateName).toBe("Louisiana");
      expect(result.zipCode).toBe("70526");
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it('should parse a street address with "Ave. b" style street name with non delimited second address line', function () {
      const result = parseAddress("826 N Ave. b Unit 101, Crowley, LA 70526");
      expect(result.streetNumber).toBe("826");
      expect(result.streetName).toBe("N Ave B");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("826 N Ave B");
      expect(result.addressLine2).toBe("Unit 101");
      expect(result.placeName).toBe("Crowley");
      expect(result.stateAbbreviation).toBe("LA");
      expect(result.stateName).toBe("Louisiana");
      expect(result.zipCode).toBe("70526");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse a street address without a normal suffix like 123 Texas Gold", function () {
      const result = parseAddress("12939 Texas Gold, San Antonio, TX 78253");
      expect(result.streetNumber).toBe("12939");
      expect(result.streetName).toBe("Texas Gold");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("12939 Texas Gold");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("San Antonio");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBe("78253");
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it("should parse a street address without a normal suffix and 2nd address line like 123 Texas Gold Unit 101", function () {
      const result = parseAddress("12939 Texas Gold Unit 101, San Antonio, TX 78253");
      expect(result.streetNumber).toBe("12939");
      expect(result.streetName).toBe("Texas Gold");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("12939 Texas Gold");
      expect(result.addressLine2).toBe("Unit 101");
      expect(result.placeName).toBe("San Antonio");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBe("78253");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse an Interstate address with a # unit", function () {
      const result = parseAddress("10701 S Interstate 35 # 35, Austin, TX");
      expect(result.streetNumber).toBe("10701");
      expect(result.streetName).toBe("S Interstate 35");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("10701 S Interstate 35");
      expect(result.addressLine2).toBe("# 35");
      expect(result.placeName).toBe("Austin");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it("should parse FM number style road names", function () {
      const result = parseAddress("11434 W FM 471, San Antonio, TX");
      expect(result.streetNumber).toBe("11434");
      expect(result.streetName).toBe("W FM 471");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("11434 W FM 471");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("San Antonio");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse street name ending in Oak", function () {
      const result = parseAddress("24330 Invitation Oak, San Antonio, TX");
      expect(result.streetNumber).toBe("24330");
      expect(result.streetName).toBe("Invitation Oak");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("24330 Invitation Oak");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("San Antonio");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it("should parse street name thats just a number", function () {
      const result = parseAddress("506 W 1100, Chesterton, IN");
      expect(result.streetNumber).toBe("506");
      expect(result.streetName).toBe("W 1100");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("506 W 1100");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Chesterton");
      expect(result.stateAbbreviation).toBe("IN");
      expect(result.stateName).toBe("Indiana");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it("should parse street name that ends in Run", function () {
      const result = parseAddress("25403 Longbranch Run, San Antonio, TX");
      expect(result.streetNumber).toBe("25403");
      expect(result.streetName).toBe("Longbranch Run");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("25403 Longbranch Run");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("San Antonio");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it("should parse street name that ends in Chase", function () {
      const result = parseAddress("22923 Cardigan Chase, San Antonio, TX");
      expect(result.streetNumber).toBe("22923");
      expect(result.streetName).toBe("Cardigan Chase");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("22923 Cardigan Chase");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("San Antonio");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it("should parse street name that ends in Day", function () {
      const result = parseAddress("7114 Sunny Day, San Antonio, TX");
      expect(result.streetNumber).toBe("7114");
      expect(result.streetName).toBe("Sunny Day");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("7114 Sunny Day");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("San Antonio");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it("should parse street name that has a leading directional and is just a number", function () {
      const result = parseAddress("110 N 2500, Vernal, UT");
      expect(result.streetNumber).toBe("110");
      expect(result.streetName).toBe("N 2500");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("110 N 2500");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Vernal");
      expect(result.stateAbbreviation).toBe("UT");
      expect(result.stateName).toBe("Utah");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it('should parse "123 Rue Dauphine style address', function () {
      const result = parseAddress("625 Rue Dauphine, Eunice, LA");
      expect(result.streetNumber).toBe("625");
      expect(result.streetName).toBe("Rue Dauphine");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("625 Rue Dauphine");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Eunice");
      expect(result.stateAbbreviation).toBe("LA");
      expect(result.stateName).toBe("Louisiana");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it("should parse street name of N Portola with unit name", function () {
      const result = parseAddress("47 N Portola, # 35, Laguna Beach, CA");
      expect(result.streetNumber).toBe("47");
      expect(result.streetName).toBe("N Portola");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("47 N Portola");
      expect(result.addressLine2).toBe("# 35");
      expect(result.placeName).toBe("Laguna Beach");
      expect(result.stateAbbreviation).toBe("CA");
      expect(result.stateName).toBe("California");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse a street name with no suffix but the street name itself matches a suffix", function () {
      const result = parseAddress("1010 PINE, 9E-6-01\nST. LOUIS MO 63101");
      expect(result.streetNumber).toBe("1010");
      expect(result.streetName).toBe("Pine");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("1010 Pine");
      expect(result.addressLine2).toBe("9E-6-01");
      expect(result.placeName).toBe("St. Louis");
      expect(result.stateAbbreviation).toBe("MO");
      expect(result.stateName).toBe("Missouri");
      expect(result.zipCode).toBe("63101");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
  });
  describe("Street Directions", () => {
    it("should parse an address with a direction following the street type", function () {
      const result = parseAddress("1301 Acme Street E, Columbia, SC 29203");
      expect(result.streetNumber).toBe("1301");
      expect(result.streetName).toBe("Acme");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBe("E");
      expect(result.addressLine1).toBe("1301 Acme St E");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Columbia");
      expect(result.stateAbbreviation).toBe("SC");
      expect(result.stateName).toBe("South Carolina");
      expect(result.zipCode).toBe("29203");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse an address with a lowercase direction following the street type", function () {
      const result = parseAddress("1301 Acme Street e, Columbia, SC 29203");
      expect(result.streetNumber).toBe("1301");
      expect(result.streetName).toBe("Acme");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBe("E");
      expect(result.addressLine1).toBe("1301 Acme St E");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Columbia");
      expect(result.stateAbbreviation).toBe("SC");
      expect(result.stateName).toBe("South Carolina");
      expect(result.zipCode).toBe("29203");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
  });

  describe("Data Issues", () => {
    it("should parse a valid address for a small city not in us-cities.json file", function () {
      const result = parseAddress("5555 Duffek Dr, Kirby, TX 78219");
      expect(result.streetNumber).toBe("5555");
      expect(result.streetName).toBe("Duffek");
      expect(result.streetSuffix).toBe("Dr");
      expect(result.addressLine1).toBe("5555 Duffek Dr");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Kirby");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBe("78219");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
  });

  describe("Normal Cases", () => {
    it("should provide an id for a valid address with second address line", function () {
      const result = parseAddress("123 Main St Unit 101, Conway, SC 29526");
      expect(result.addressLine1).toBe("123 Main St");
      expect(result.addressLine2).toBe("Unit 101");
      expect(result.id).toBe("123-main-st-unit-101-conway-sc-29526");
    });

    it("should parse a street address ending in pass", function () {
      const result = parseAddress("15001 Strathaven Pass, Pflugerville, TX 78660");
      expect(result.streetNumber).toBe("15001");
      expect(result.streetName).toBe("Strathaven");
      expect(result.streetSuffix).toBe("Pass");
      expect(result.addressLine1).toBe("15001 Strathaven Pass");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Pflugerville");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBe("78660");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
  });

  describe("Formatted Address", () => {
    it("should return a formattedAddress field", function () {
      const result = parseAddress("12939 Texas Gold, San Antonio, TX 78253");
      expect(result.streetNumber).toBe("12939");
      expect(result.streetName).toBe("Texas Gold");
      expect(result.streetSuffix).toBeUndefined();
      expect(result.addressLine1).toBe("12939 Texas Gold");
      expect(result.addressLine2).toBeUndefined();
      expect(result.formattedAddress).toBe("12939 Texas Gold, San Antonio, TX 78253");
      expect(result.placeName).toBe("San Antonio");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBe("78253");
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it("should return a formattedAddress field when a second address line is provided", function () {
      const result = parseAddress("12939 Live Oak Street Unit 101, San Antonio, TX 78253");
      expect(result.streetNumber).toBe("12939");
      expect(result.streetName).toBe("Live Oak");
      expect(result.streetSuffix).toBe("St");
      expect(result.addressLine1).toBe("12939 Live Oak St");
      expect(result.addressLine2).toBe("Unit 101");
      expect(result.formattedAddress).toBe("12939 Live Oak St, Unit 101, San Antonio, TX 78253");
      expect(result.placeName).toBe("San Antonio");
      expect(result.stateAbbreviation).toBe("TX");
      expect(result.stateName).toBe("Texas");
      expect(result.zipCode).toBe("78253");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
  });

  describe("Canadian Addresses", () => {
    it("should parse a simple Canadian Address without zip Code", function () {
      const result = parseAddress("123 Main St, Toronto, ON");
      expect(result.streetNumber).toBe("123");
      expect(result.streetName).toBe("Main");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("123 Main St");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Toronto");
      expect(result.stateAbbreviation).toBe("ON");
      expect(result.stateName).toBe("Ontario");
      expect(result.zipCode).toBeUndefined();
      expect(result.zipCodePlusFour).toBeUndefined();
    });

    it("should parse a simple Canadian Address with zip Code", function () {
      const result = parseAddress("123 Main St, Toronto, ON M3K5K9");
      expect(result.streetNumber).toBe("123");
      expect(result.streetName).toBe("Main");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("123 Main St");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Toronto");
      expect(result.stateAbbreviation).toBe("ON");
      expect(result.stateName).toBe("Ontario");
      expect(result.zipCode).toBe("M3K5K9");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
    it("should parse a simple Canadian Address with Trailing Country", function () {
      const result = parseAddress("123 Main St, Toronto, ON M3K5K9, Canada");
      expect(result.streetNumber).toBe("123");
      expect(result.streetName).toBe("Main");
      expect(result.streetSuffix).toBe("St");
      expect(result.streetDirection).toBeUndefined();
      expect(result.addressLine1).toBe("123 Main St");
      expect(result.addressLine2).toBeUndefined();
      expect(result.placeName).toBe("Toronto");
      expect(result.stateAbbreviation).toBe("ON");
      expect(result.stateName).toBe("Ontario");
      expect(result.zipCode).toBe("M3K5K9");
      expect(result.zipCodePlusFour).toBeUndefined();
    });
  });
});
