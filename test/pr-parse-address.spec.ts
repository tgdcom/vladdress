import { expect } from 'chai';
import * as addresser from '../src';

describe('Puerto Rican Address Parser (parseAddress)', function () {
    describe('Puerto Rican Addresses', () => {
        it('should parse AVE prefix with apartment (Pub 28 §291 pattern 1)', function () {
            const result = addresser.parseAddress("1234 AVE ASHFORD APT 1A, SAN JUAN PR 00907-1021");
            expect(result.streetNumber).to.equal("1234");
            expect(result.streetSuffix).to.equal("Ave");
            expect(result.streetName).to.equal("Ashford");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("1234 Ave Ashford");
            expect(result.addressLine2).to.equal("APT 1A");
            expect(result.placeName).to.equal("San Juan");
            expect(result.stateAbbreviation).to.equal("PR");
            expect(result.stateName).to.equal("Puerto Rico");
            expect(result.zipCode).to.equal("00907");
            expect(result.zipCodePlusFour).to.equal("00907-1021");
        });

        it('should parse a simple CALLE street (Pub 28 §295)', function () {
            const result = addresser.parseAddress("24 CALLE MARTINEZ, MAYAGUEZ PR 00969");
            expect(result.streetNumber).to.equal("24");
            expect(result.streetSuffix).to.equal("Calle");
            expect(result.streetName).to.equal("Martinez");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("24 Calle Martinez");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Mayaguez");
            expect(result.stateAbbreviation).to.equal("PR");
            expect(result.stateName).to.equal("Puerto Rico");
            expect(result.zipCode).to.equal("00969");
        });

        it('should parse a numbered urbanization with no named street (Pub 28 §292)', function () {
            const result = addresser.parseAddress("1234 URB LOS OLMOS, PONCE PR 00731-1235");
            expect(result.streetNumber).to.equal("1234");
            expect(result.streetName).to.equal("Urb Los Olmos");
            expect(result.addressLine1).to.equal("1234 Urb Los Olmos");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Ponce");
            expect(result.stateAbbreviation).to.equal("PR");
            expect(result.stateName).to.equal("Puerto Rico");
            expect(result.zipCode).to.equal("00731");
            expect(result.zipCodePlusFour).to.equal("00731-1235");
        });

        it('should parse URB + CALLE as three-line format (Pub 28 §292)', function () {
            const result = addresser.parseAddress("URB LAS GLADIOLAS, 150 CALLE A, SAN JUAN PR 00926-0221");
            expect(result.addressLine1).to.equal("Urb Las Gladiolas");
            expect(result.addressLine2).to.equal("150 Calle A");
            expect(result.streetNumber).to.equal("150");
            expect(result.streetSuffix).to.equal("Calle");
            expect(result.streetName).to.equal("A");
            expect(result.streetDirection).to.be.undefined;
            expect(result.placeName).to.equal("San Juan");
            expect(result.stateAbbreviation).to.equal("PR");
            expect(result.stateName).to.equal("Puerto Rico");
            expect(result.zipCode).to.equal("00926");
            expect(result.zipCodePlusFour).to.equal("00926-0221");
        });

        it('should parse COND + CALLE + APT as three-line format (Pub 28 §291 pattern 2)', function () {
            const result = addresser.parseAddress("COND LAS AMAPOLAS, 1230 CALLE AMAPOLAS APT 103, CAROLINA PR 00979-1126");
            expect(result.addressLine1).to.equal("Cond Las Amapolas");
            expect(result.addressLine2).to.equal("1230 Calle Amapolas, APT 103");
            expect(result.streetNumber).to.equal("1230");
            expect(result.streetSuffix).to.equal("Calle");
            expect(result.streetName).to.equal("Amapolas");
            expect(result.streetDirection).to.be.undefined;
            expect(result.placeName).to.equal("Carolina");
            expect(result.stateAbbreviation).to.equal("PR");
            expect(result.stateName).to.equal("Puerto Rico");
            expect(result.zipCode).to.equal("00979");
            expect(result.zipCodePlusFour).to.equal("00979-1126");
        });
    });

    describe('PO Box', () => {
        it('should parse a PR PO Box address', function () {
            const result = addresser.parseAddress("PO BOX 1234, BAYAMON PR 00979");
            expect(result.addressLine1).to.equal("PO BOX 1234");
            expect(result.addressLine2).to.be.undefined;
            expect(result.streetNumber).to.be.undefined;
            expect(result.streetName).to.be.undefined;
            expect(result.placeName).to.equal("Bayamon");
            expect(result.stateAbbreviation).to.equal("PR");
            expect(result.stateName).to.equal("Puerto Rico");
            expect(result.zipCode).to.equal("00979");
        });

        it('should parse a PR PO Box address with dots and ZIP+4', function () {
            const result = addresser.parseAddress("P.O. BOX 1234, BAYAMON PR 00979-0001");
            expect(result.addressLine1).to.equal("P.O. BOX 1234");
            expect(result.addressLine2).to.be.undefined;
            expect(result.streetNumber).to.be.undefined;
            expect(result.streetName).to.be.undefined;
            expect(result.placeName).to.equal("Bayamon");
            expect(result.stateAbbreviation).to.equal("PR");
            expect(result.stateName).to.equal("Puerto Rico");
            expect(result.zipCode).to.equal("00979");
            expect(result.zipCodePlusFour).to.equal("00979-0001");
        });

        it('should provide an id', function () {
            const result = addresser.parseAddress("PO BOX 1234\nBAYAMON PR 00979-0001");
            expect(result.addressLine1).to.equal("PO BOX 1234");
            expect(result.id).to.equal('po-box-1234-bayamon-pr-00979');
        });
    });
});
