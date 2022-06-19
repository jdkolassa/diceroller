import Dice from "../Dice";

export default interface IDice {
    sides: number; // Actual number of sides on the die
    range: number[] | string[]; // The actual values on the die's faces
    special?: boolean; // Is this a special, non-numerical die?
    explodes?: boolean; // Does this die roll extra times on a max result?
    explosion?: () => void; // Function for exploding die
    roll: (times: number) => number; // Function for actually rolling the die
}