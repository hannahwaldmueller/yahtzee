import {SetOfDice} from "./appFunctions";

export type ScoreMap = Map<ScoreCategories, number|null>
export enum ScoreCategories {
    Aces=1,
    Twos,
    Threes,
    Fours,
    Fives,
    Sixes,
    Three_Of_A_Kind,
    Four_Of_A_Kind,
    Full_House,
    Small_Strait,
    Large_Strait,
    Yahtzee,
    Chance
}
export function calculateScoreForCategory(dice: SetOfDice, category: ScoreCategories): number {
    switch (category) {
        case ScoreCategories.Large_Strait:
            return calculateLargeStrait(dice);
        case ScoreCategories.Chance:
            return calculateChance(dice);
        case ScoreCategories.Yahtzee:
            return calculateYahtzee(dice);
        default:
            return 0;
    }
}
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