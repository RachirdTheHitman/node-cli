#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const boxen_1 = __importStar(require("boxen"));
const yargs_1 = __importDefault(require("yargs"));
var taxBreakpoint;
(function (taxBreakpoint) {
    taxBreakpoint[taxBreakpoint["Low"] = 20000] = "Low";
    taxBreakpoint[taxBreakpoint["Mid"] = 40000] = "Mid";
    taxBreakpoint[taxBreakpoint["High"] = 80000] = "High";
    taxBreakpoint[taxBreakpoint["Higher"] = 180000] = "Higher";
})(taxBreakpoint || (taxBreakpoint = {}));
var rateBreakpoint;
(function (rateBreakpoint) {
    rateBreakpoint[rateBreakpoint["Low"] = 0.1] = "Low";
    rateBreakpoint[rateBreakpoint["Mid"] = 0.2] = "Mid";
    rateBreakpoint[rateBreakpoint["High"] = 0.3] = "High";
    rateBreakpoint[rateBreakpoint["Higher"] = 0.4] = "Higher";
})(rateBreakpoint || (rateBreakpoint = {}));
const exceedTaxCalculator = (total, base, rate) => {
    return (total - base) * rate;
};
let grossMonthlyIncome = 0;
let noTaxbase = 0;
let netMonthlyIncome = 0;
let lowbase = exceedTaxCalculator(taxBreakpoint.Mid, taxBreakpoint.Low, rateBreakpoint.Low) + noTaxbase;
let midbase = exceedTaxCalculator(taxBreakpoint.High, taxBreakpoint.Mid, rateBreakpoint.Mid) + lowbase;
let highbase = exceedTaxCalculator(taxBreakpoint.Higher, taxBreakpoint.High, rateBreakpoint.High) + midbase;
const generateMontylyPayslip = (annualPay) => {
    if (annualPay <= taxBreakpoint.Low) {
        return 0;
    }
    else if (annualPay > taxBreakpoint.Low && annualPay <= taxBreakpoint.Mid) {
        return exceedTaxCalculator(annualPay, taxBreakpoint.Low, rateBreakpoint.Low) / 12;
    }
    else if (annualPay > taxBreakpoint.Mid && annualPay <= taxBreakpoint.High) {
        return (exceedTaxCalculator(annualPay, taxBreakpoint.Mid, rateBreakpoint.Mid) + lowbase) / 12;
    }
    else if (annualPay > taxBreakpoint.High && annualPay <= taxBreakpoint.Higher) {
        return (exceedTaxCalculator(annualPay, taxBreakpoint.High, rateBreakpoint.High) + midbase) / 12;
    }
    else if (annualPay > taxBreakpoint.Higher) {
        return (exceedTaxCalculator(annualPay, taxBreakpoint.Higher, rateBreakpoint.Higher) + highbase) / 12;
    }
    return -1;
};
const options = yargs_1.default
    .usage("Usage: -n <name> -p <pay>")
    .option("n", { alias: "name", describe: "Your Name", type: "string", demandOption: true })
    .option("p", { alias: "pay", describe: "Your Annual Pay", type: "number", demandOption: true })
    .argv;
grossMonthlyIncome = options.p / 12;
console.log("grossMonthlyIncome", grossMonthlyIncome);
const monthlyIncomeTax = generateMontylyPayslip(options.p);
netMonthlyIncome = grossMonthlyIncome - monthlyIncomeTax;
const greeting = chalk_1.default.white.bold(`Monthly Payslip for: ${options.name} \nGross Monthly Income: ${grossMonthlyIncome} \nMonthly Income Tax: ${monthlyIncomeTax} \nNet Monthly Income: ${netMonthlyIncome}`);
const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555"
};
const msgBox = boxen_1.default(greeting, boxenOptions);
console.log(msgBox);
//# sourceMappingURL=index.js.map