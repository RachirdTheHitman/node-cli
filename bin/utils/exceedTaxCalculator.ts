import { rateBreakpoint, taxBreakpoint } from "bin/constants";

// helper function for calculating the tax
export const exceedTaxCalculator = (total: taxBreakpoint, base: taxBreakpoint, rate: rateBreakpoint): number => {
    return (total - base) * rate;
};
