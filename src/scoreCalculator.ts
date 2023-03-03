import {SetOfDice} from "./appFunctions";
import {ScoreConstants} from "./constants";

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

export function calculateSmallStrait(dice: SetOfDice): number {
    let numbersWithoutDuplicates = new Set(dice);
    let countOfDifferentNumbers = numbersWithoutDuplicates.size;
    if (countOfDifferentNumbers === dice.length) {
        return ScoreConstants.SMALL_STRAIT;
    }
    if (countOfDifferentNumbers === 4) {
        let sortedDice = dice.sort();
        if (sortedDice[3]-sortedDice[0] === 3) {
            return ScoreConstants.SMALL_STRAIT;
        }
    }
    return 0;
}
export function calculateLargeStrait(dice: SetOfDice): number {
    let numbersWithoutDuplicates = new Set(dice);
    if (numbersWithoutDuplicates.size !== dice.length) {
        return 0;
    }
    let sortedDice = dice.sort();
    if (sortedDice[4]-sortedDice[0] === 4) {
        return ScoreConstants.LARGE_STRAIT;
    }
    return 0;
}

export function calculateYahtzee(dice: SetOfDice): number {
    if (dice.every((die) => die === dice[0])) {
        return 50;
    }
    return 0;
}

export function calculateChance(dice: SetOfDice): number {
    let sum: number = 0;
    for (let die of dice) {
        sum += die;
    }
    return sum;
}