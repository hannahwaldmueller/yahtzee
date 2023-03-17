import {ScoreConstants} from "../app-constants";
import {ScoreCategories} from "./score-categories";
import {SetOfDice} from "../app-types";

export function calculateScoreForCategory(dice: SetOfDice, category: ScoreCategories): number {
    switch (category) {
        case ScoreCategories.Aces:
            return calculateUpperSectionCategory(dice, ScoreCategories.Aces);
        case ScoreCategories.Twos:
            return calculateUpperSectionCategory(dice, ScoreCategories.Twos);
        case ScoreCategories.Threes:
            return calculateUpperSectionCategory(dice, ScoreCategories.Threes);
        case ScoreCategories.Fours:
            return calculateUpperSectionCategory(dice, ScoreCategories.Fours);
        case ScoreCategories.Fives:
            return calculateUpperSectionCategory(dice, ScoreCategories.Fives);
        case ScoreCategories.Sixes:
            return calculateUpperSectionCategory(dice, ScoreCategories.Sixes);
        case ScoreCategories.Three_Of_A_Kind:
            return calculateThreeOfAKind(dice);
        case ScoreCategories.Four_Of_A_Kind:
            return calculateFourOfAKind(dice);
        case ScoreCategories.Full_House:
            return calculateFullHouse(dice);
        case ScoreCategories.Small_Strait:
            return calculateSmallStrait(dice);
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

export function calculateUpperSectionCategory(dice: SetOfDice, category: ScoreCategories): number {
    const diceToSumUp: number[] = dice.filter((die: number) => die === category);
    return sumUpDice(diceToSumUp);
}

export function calculateFullHouse(dice: SetOfDice): number {
    let numbersWithoutDuplicates = new Set(dice);
    if (numbersWithoutDuplicates.size === 2) {
        const allDiceOfOneKind: number[] = dice.filter((die) => die === dice[0]);
        if (allDiceOfOneKind.length === 2 || allDiceOfOneKind.length === 3) {
            return ScoreConstants.FULL_HOUSE;
        }
    }
    return 0;
}

export function calculateThreeOfAKind(dice: SetOfDice): number {
    const instancesOfFirstDie = dice.filter((die) => die === dice[0]);
    const instancesOfSecondDie = dice.filter((die) => die === dice[1]);
    const instancesOfThirdDie = dice.filter((die) => die === dice[2]);
    if (instancesOfFirstDie.length >= 3 || instancesOfSecondDie.length >= 3 || instancesOfThirdDie.length >= 3) {
        return sumUpDice(dice);
    }
    return 0;
}

export function calculateFourOfAKind(dice: SetOfDice): number {
    const instancesOfFirstDie = dice.filter((die) => die === dice[0]);
    const instancesOfSecondDie = dice.filter((die) => die === dice[1]);
    if (instancesOfFirstDie.length >= 4 || instancesOfSecondDie.length >= 4) {
        return sumUpDice(dice);
    }
    return 0;
}

export function calculateSmallStrait(dice: SetOfDice): number {
    const sortedDice = dice.sort();
    if (countMembersOfStrait(sortedDice[0], dice) >= 4 || countMembersOfStrait(sortedDice[1], dice) >= 4) {
        return ScoreConstants.SMALL_STRAIT;
    }
    return 0;

    function countMembersOfStrait(firstNumber: number, straitCandidate: number[]) {
        let count: number = 0;
        for (let i = 0; i < 4; ++i) {
            if (straitCandidate.includes(firstNumber + i)) {
                count += 1;
            }
        }
        return count;
    }
}

export function calculateLargeStrait(dice: SetOfDice): number {
    let numbersWithoutDuplicates = new Set(dice);
    if (numbersWithoutDuplicates.size !== dice.length) {
        return 0;
    }
    let sortedDice = dice.sort();
    if (sortedDice[4] - sortedDice[0] === 4) {
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
    return sumUpDice(dice);
}

function sumUpDice(dice: number[]) {
    let sum: number = 0;
    for (let die of dice) {
        sum += die;
    }
    return sum;
}