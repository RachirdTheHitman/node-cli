#!/usr/bin/env node
import yargs from "yargs";
import { generateMonthlyPayslip } from "./utils/generateMonthlyPayslip";
import { styledOutput } from "./utils/styledOutput";

const options = yargs
    .usage("Usage: -n <name> -p <pay>")
    .option("n", { alias: "name", describe: "Your Name", type: "string", demandOption: true })
    .option("p", { alias: "pay", describe: "Your Annual Pay", type: "number", demandOption: true })
    .check((argv) => {
        if (argv.p < 0) {
            throw new Error("negative number is not accepted!")
        } else {
            return true
        }
    })
    .argv;

export const grossMonthlyIncome = Math.round(options.p / 12)

export const monthlyIncomeTax: number = generateMonthlyPayslip(options.p)

export const netMonthlyIncome = Math.round(grossMonthlyIncome - monthlyIncomeTax);

styledOutput(options.n, grossMonthlyIncome, monthlyIncomeTax, netMonthlyIncome);
