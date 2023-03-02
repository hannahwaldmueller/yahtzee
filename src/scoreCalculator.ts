import {SetOfDice} from "./appFunctions";

export function calculateChance(dices: SetOfDice): number {
    let sum: number = 0;
    for (let dice of dices) {
        sum += dice;
    }
    return sum;
}
export function calculateYahtzee(dices: SetOfDice): number {
    if (dices.every((die) => die === dices[0])) {
        return 50;
    }
    return 0;
}

export function calculateLargeStrait(dices: SetOfDice): number {
    let numbersWithoutDuplicates = new Set(dices);
    if (numbersWithoutDuplicates.size !== dices.length) {
        return 0;
    }
    let sortedDice = dices.sort();
    if (sortedDice[4]-sortedDice[0] === 4) {
        return 40;
    }
    return 0;
}