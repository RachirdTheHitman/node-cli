#!/usr/bin/env node

import chalk from "chalk";
import boxen, { BorderStyle } from "boxen";
import yargs from "yargs";


// set tax point for different range
enum taxBreakpoint {
    Low = 20000,
    Mid = 40000,
    High = 80000,
    Higher = 180000
}


// set rate point for different range
enum rateBreakpoint {
    Low = 0.1,
    Mid = 0.2,
    High = 0.3,
    Higher = 0.4
}

// helper function for calculating the tax
const exceedTaxCalculator = (total: taxBreakpoint, base: taxBreakpoint, rate: rateBreakpoint): number => {
    return (total - base) * rate
}

let grossMonthlyIncome = 0;
let noTaxbase = 0;
let netMonthlyIncome = 0;
let lowbase = exceedTaxCalculator(taxBreakpoint.Mid, taxBreakpoint.Low, rateBreakpoint.Low) + noTaxbase;
let midbase = exceedTaxCalculator(taxBreakpoint.High, taxBreakpoint.Mid, rateBreakpoint.Mid) + lowbase;
let highbase = exceedTaxCalculator(taxBreakpoint.Higher, taxBreakpoint.High, rateBreakpoint.High) + midbase;

// main function for generating monthly tax
const generateMontylyPayslip = (annualPay: number): number => {

    if (annualPay <= taxBreakpoint.Low) {
        return 0
    } else if (annualPay > taxBreakpoint.Low && annualPay <= taxBreakpoint.Mid) {
        return exceedTaxCalculator(annualPay, taxBreakpoint.Low, rateBreakpoint.Low) / 12
    }
    else if (annualPay > taxBreakpoint.Mid && annualPay <= taxBreakpoint.High) {
        return (exceedTaxCalculator(annualPay, taxBreakpoint.Mid, rateBreakpoint.Mid) + lowbase) / 12
    }
    else if (annualPay > taxBreakpoint.High && annualPay <= taxBreakpoint.Higher) {
        return (exceedTaxCalculator(annualPay, taxBreakpoint.High, rateBreakpoint.High) + midbase) / 12
    }
    else if (annualPay > taxBreakpoint.Higher) {
        return (exceedTaxCalculator(annualPay, taxBreakpoint.Higher, rateBreakpoint.Higher) + highbase) / 12
    }

    return -1;

}

const options = yargs
    .usage("Usage: -n <name> -p <pay>")
    .option("n", { alias: "name", describe: "Your Name", type: "string", demandOption: true })
    .option("p", { alias: "pay", describe: "Your Annual Pay", type: "number", demandOption: true })
    .argv;

grossMonthlyIncome = options.p / 12

const monthlyIncomeTax: number = generateMontylyPayslip(options.p)

netMonthlyIncome = grossMonthlyIncome - monthlyIncomeTax;

const greeting = chalk.white.bold(`Monthly Payslip for: ${options.name} \nGross Monthly Income: ${grossMonthlyIncome} \nMonthly Income Tax: ${monthlyIncomeTax} \nNet Monthly Income: ${netMonthlyIncome}`);

//console output box options
const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: BorderStyle.Round,
    borderColor: "green",
    backgroundColor: "#555555"
};

const msgBox = boxen(greeting, boxenOptions);

console.log(msgBox);
