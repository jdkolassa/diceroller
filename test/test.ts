import assert = require("assert")
import { describe } from 'mocha';

import Dice from '../src/Dice';

describe("Roll within boundaries", function () {
    it("Should not return a number lower than 1 or higher than 20", function () {
        const die = new Dice(20, false);
        const roll = die.roll(1);
        assert.equal(1 <= roll && roll <= 20, "Dice roll malfunctioned");
    });
});