import boxen, { BorderStyle } from "boxen";
import chalk from "chalk";

export const styledOutput = (name: string, grossMonthlyIncome: number, monthlyIncomeTax: number, netMonthlyIncome: number) => {
    const result =
        chalk.white.bold(`Monthly Payslip for: ${name} \nGross Monthly Income: ${grossMonthlyIncome} \nMonthly Income Tax: ${monthlyIncomeTax} \nNet Monthly Income: ${netMonthlyIncome}`);
    //console output box options
    const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: BorderStyle.Round,
        borderColor: "green",
        backgroundColor: "#555555"
    };
    const msgBox = boxen(result, boxenOptions);
    console.log(msgBox);
}