import { rateBreakpoint, taxBreakpoint } from "../constants";
import { exceedTaxCalculator } from "./exceedTaxCalculator";

// main function for generating monthly tax

export const generateMonthlyPayslip = (annualPay: number): number => {
    if (annualPay < 0) {
        return -1;
    }
    if (annualPay === 0) {
        return 0;
    }
    const noTaxbase = 0;
    const lowbase = exceedTaxCalculator(taxBreakpoint.Mid, taxBreakpoint.Low, rateBreakpoint.Low) + noTaxbase;
    const midbase = exceedTaxCalculator(taxBreakpoint.High, taxBreakpoint.Mid, rateBreakpoint.Mid) + lowbase;
    const highbase = exceedTaxCalculator(taxBreakpoint.Higher, taxBreakpoint.High, rateBreakpoint.High) + midbase;

    const lookupArray = [
        { rangeStart: 0, rangeEnd: taxBreakpoint.Low, rate: 0, base: 0 },
        { rangeStart: taxBreakpoint.Low, rangeEnd: taxBreakpoint.Mid, rate: rateBreakpoint.Low, base: 0 },
        { rangeStart: taxBreakpoint.Mid, rangeEnd: taxBreakpoint.High, rate: rateBreakpoint.Mid, base: lowbase },
        { rangeStart: taxBreakpoint.High, rangeEnd: taxBreakpoint.Higher, rate: rateBreakpoint.High, base: midbase },
        { rangeStart: taxBreakpoint.Higher, rate: rateBreakpoint.Higher, base: highbase }
    ];

    let monthlyTax = 0;
    lookupArray.forEach(infoObj => {

        if (annualPay > infoObj.rangeStart && infoObj.rangeEnd === undefined) {
            // return Math.round((exceedTaxCalculator(annualPay, infoObj.rangeStart, infoObj.rate) + infoObj.base) / 12)
            monthlyTax = Math.round((exceedTaxCalculator(annualPay, infoObj.rangeStart, infoObj.rate) + infoObj.base) / 12);
        }

        if (annualPay > infoObj.rangeStart && annualPay <= infoObj.rangeEnd!) {

            monthlyTax = Math.round((exceedTaxCalculator(annualPay, infoObj.rangeStart, infoObj.rate) + infoObj.base) / 12);
        }

    });

    return monthlyTax;

};
