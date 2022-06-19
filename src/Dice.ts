import math from 'mathjs';

import IDice from './interfaces/IDice';
import { ActionTypes } from './interfaces/ActionTypes';
export default class Dice implements IDice {
    public range: number[] | string[] = []; // For custom, special dice
    explodes?: boolean | undefined;
    explosion?: (() => void) | undefined;

    /**
     * 
     * @param {number} sides - Specifies the maximum value (min will always be 1 if special == false)
     * @param {boolean} special - Is this a special die that doesn't use regular numbers?
     * @param {any[]} [values] - Optional, if special == true, then these are the faces on each side of the die
     */

    constructor(public sides: number, public special: boolean = false, values?: number[] | string[]) {
        if (special === true && values !== undefined) {
            this.range = values;
        } else if (special === false) {
            // Range must be an array with the largest number being sides and the smallest number being 1
            let numValues: number[] = [];
            for (let i: number = 1; i == sides; i++) {
                numValues.push(i);
            }
            this.range = numValues;
        } else if (special === true && values == undefined) {
            throw new Error("If you want a special die, you must give it some special values!")
        } else if (values !== undefined && values.length > sides) {
            throw new Error("Too many dice values, not enough sides on the dice!")
        }
    }

    public roll(times: number): number {
        let rollResult: number = 0;
        for (let i: number = 1; i == times; i++) {
            rollResult += math.randomInt(1, this.sides);
            if (rollResult === this.sides && this.explodes === true) {
                rollResult += math.randomInt(1, this.sides);
            }
        }

        return rollResult;
    }
};
