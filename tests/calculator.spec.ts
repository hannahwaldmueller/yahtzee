import {
    calculateChance,
    calculateFourOfAKind,
    calculateFullHouse,
    calculateLargeStrait,
    calculateSmallStrait,
    calculateThreeOfAKind,
    calculateUpperSectionCategory,
    calculateYahtzee,
} from "../src/score/score-calculator";
import {ScoreConstants} from "../src/app-constants";
import {ScoreCategories} from "../src/score/score-categories";
import {calculateTotal} from "../src/score/total-score-calculator";
import {ScoreMap, SetOfDice} from "../src/app-types";

const full_house: SetOfDice = [1, 3, 3, 3, 1];
const three_of_a_kind: SetOfDice = [1, 4, 2, 4, 4];
const four_of_a_kind: SetOfDice = [5, 5, 5, 5, 6];
const chance_of_15: SetOfDice = [1, 3, 4, 5, 2];
const _yahtzee: SetOfDice = [1, 1, 1, 1, 1];
const almost_yahtzee: SetOfDice = [1, 1, 1, 1, 2];
const large_strait_1: SetOfDice = [1, 2, 3, 4, 5];
const large_strait_2: SetOfDice = [2, 3, 4, 5, 6];
const small_strait_1: SetOfDice = [1, 2, 3, 4, 6];
const small_strait_2: SetOfDice = [1, 1, 2, 3, 4];
const small_strait_3: SetOfDice = [1, 3, 4, 5, 6];
const no_strait: SetOfDice = [1, 2, 3, 5, 6];
const total_no_bonus: ScoreMap = new Map<ScoreCategories, number | null>([[1, 2], [2, 6], [3, 9], [4, 12], [5, 15], [6, 18], [7, 26], [8, 24], [9, 0], [10, 30], [11, 0], [12, 50], [13, 18]]);
const total_bonus: ScoreMap = new Map<ScoreCategories, number | null>([[1, 3], [2, 6], [3, 9], [4, 12], [5, 15], [6, 18], [7, 26], [8, 24], [9, 0], [10, 30], [11, 0], [12, 50], [13, 18]]);

describe('scoreCalculator', () => {

    describe('calculateUpperSectionCategory', () => {
        test('sums up all aces', () => {
            expect(calculateUpperSectionCategory(almost_yahtzee, ScoreCategories.Aces)).toEqual(4);
        })
        test('sums up all twos', () => {
            expect(calculateUpperSectionCategory(almost_yahtzee, ScoreCategories.Twos)).toEqual(2);
        })
        test('sums up all threes', () => {
            expect(calculateUpperSectionCategory(full_house, ScoreCategories.Threes)).toEqual(9);
        })
        test('sums up all fours', () => {
            expect(calculateUpperSectionCategory(chance_of_15, ScoreCategories.Fours)).toEqual(4);
        })
        test('sums up all fives', () => {
            expect(calculateUpperSectionCategory(four_of_a_kind, ScoreCategories.Fives)).toEqual(20);
        })
        test('sums up all sixes', () => {
            expect(calculateUpperSectionCategory(four_of_a_kind, ScoreCategories.Sixes)).toEqual(6);
        })
    })
    describe('calculateThreeOfAKind', () => {
        test('accepts full house', () => {
            expect(calculateThreeOfAKind(full_house)).toEqual(11);
        })
        test('accepts three of a kind and two singles', () => {
            expect(calculateThreeOfAKind(three_of_a_kind)).toEqual(15);
        })
        test('accepts four of a kind', () => {
            expect(calculateThreeOfAKind(four_of_a_kind)).toEqual(26);
        })
        test('awards zero for small strait', () => {
            expect(calculateThreeOfAKind(small_strait_1)).toEqual(0);
        })
    })
    describe('calculateFourOfAKind', () => {
        test('accepts four 5s', () => {
            expect(calculateFourOfAKind(four_of_a_kind)).toEqual(26);
        })
    })
    describe('calculateFourOfAKind', () => {
        test('awards zero for full house', () => {
            expect(calculateFourOfAKind(full_house)).toEqual(0);
        })
    })
    describe('calculateFullHouse', () => {
        test('accepts full house', () => {
            expect((calculateFullHouse(full_house))).toEqual(ScoreConstants.FULL_HOUSE);
        })
    })
    describe('calculateSmallStrait', () => {
        test('accepts 1-2-3-4-6', () => {
            expect(calculateSmallStrait(small_strait_1)).toEqual(ScoreConstants.SMALL_STRAIT);
        })
        test('accepts 1-1-2-3-4', () => {
            expect(calculateSmallStrait(small_strait_2)).toEqual(ScoreConstants.SMALL_STRAIT);
        })
        test('accepts 1-3-4-5-6', () => {
            expect(calculateSmallStrait(small_strait_3)).toEqual(ScoreConstants.SMALL_STRAIT);
        })
        test('awards 0 for 1-2-3-5-6', () => {
            expect(calculateSmallStrait(no_strait)).toEqual(0);
        })
    })
    describe('calculateLargeStrait', () => {
        test('accepts 1-2-3-4-5', () => {
            expect(calculateLargeStrait(large_strait_1)).toEqual(ScoreConstants.LARGE_STRAIT);
        })
        test('accepts 2-3-4-5-6', () => {
            expect(calculateLargeStrait(large_strait_2)).toEqual(ScoreConstants.LARGE_STRAIT);
        })
        test('awards 0 for 1-2-3-4-6', () => {
            expect(calculateLargeStrait(small_strait_1)).toEqual(0);
        })
    })
    describe('calculateYahtzee', () => {
        test('accepts correct yahtzee', () => {
            expect(calculateYahtzee(_yahtzee)).toEqual(ScoreConstants.YAHTZEE);
        })
        test('awards zero for incorrect', () => {
            expect(calculateYahtzee(almost_yahtzee)).toEqual(0);
        })
    })
    describe('calculateChance', () => {
        test('sums up all dice', () => {
            expect(calculateChance(chance_of_15)).toEqual(15);
        })
    })
    describe('calculateTotal', () => {
        test('awards Bonus if upper section score is at least 63', () => {
            expect(calculateTotal(total_bonus)).toEqual(246);
        })
        test('refuses Bonus if upper section score is below 63', () => {
            expect(calculateTotal(total_no_bonus)).toEqual(210);
        })
    })
})