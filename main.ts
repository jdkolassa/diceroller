// * Main calls to the program will go here

import { number } from "mathjs";
import { ActionTypes } from "./src/interfaces/ActionTypes";
import Dice from "./src/Dice";

/**
 * Checks input values to see if this is a regular numeric die or a special die
 * @param {any} times - How many times the dice should be rolled
 * @param {any} type - The kind of dice
 * @param {any} bonus - Whatever post-roll modifications are made
 * @return {boolean} - Whether or not this is a numeric or non-numeric die
 */

function validateNumbers(times: any, type: any, bonus: any): boolean {
    const isTimesNum = isNaN(Number(times));
    const isTypeNum = isNaN(Number(type));
    const isBonusNum = isNaN(Number(bonus));

    // If they are all numbers we can proceed
    // In the future this will be changed so we can accept special die
    if (isTimesNum && isTypeNum && isBonusNum) {
        return true;
    } else {
        return false;
    }
}

const rollCall = (roll: string): number => {
    let parsed = roll.split("/d{1,4}");
    if (parsed[1] !== "d") {
        throw new Error("Incorrect syntax, please use XdY+Z format when rolling.")
    }
    // Validate our numbers first
    const isValid = validateNumbers(parsed[0], parsed[2], parsed[4]);
    if (isValid == false) {
        throw new Error("Unable to accept non-numeric dice at this time.");
    } else {
        // How many times are we rolling this?
        const times: number = Number(parsed[0]);
        const type: number = Number(parsed[2]);
        const action = parsed[3];
        const bonus: number = Number(parsed[4]);
        const die = new Dice(type, false);

        let result: number = die.roll(times);
        if (bonus) {
            switch (action) {
                case ActionTypes.ADD:
                    result = result + bonus;
                case ActionTypes.SUBTRACT:
                    result = result - bonus;
                case ActionTypes.MULT:
                    result = result * bonus;
                default:
                    break;
            }
        }

        return result;
    }

}