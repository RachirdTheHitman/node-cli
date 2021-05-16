import { generateMonthlyPayslip } from '../bin/utils/generateMonthlyPayslip'

describe("test generateMonthlyPayslip function", () => {
    it("should return -1 for generateMonthlyPayslip(-8345)", () => {
        expect(generateMonthlyPayslip(-8345)).toBe(-1);
    });
    it("should return 0 for generateMonthlyPayslip(0)", () => {
        expect(generateMonthlyPayslip(0)).toBe(0);
    });
    it("should return 0 for generateMonthlyPayslip(19999)", () => {
        expect(generateMonthlyPayslip(19999)).toBe(0);
    });
    it("should return 83 for generateMonthlyPayslip(30000)", () => {
        expect(generateMonthlyPayslip(30000)).toBe(83);
    });
    it("should return 500 for generateMonthlyPayslip(60000)", () => {
        expect(generateMonthlyPayslip(60000)).toBe(500);
    });

    it("should return 1083 for generateMonthlyPayslip(90000)", () => {
        expect(generateMonthlyPayslip(90000)).toBe(1083);
    });
    it("should return 1083 for generateMonthlyPayslip(90000)", () => {
        expect(generateMonthlyPayslip(90000)).toBe(1083);
    });
    it("should return 3667 for generateMonthlyPayslip(190000)", () => {
        expect(generateMonthlyPayslip(190000)).toBe(3667);
    });

});