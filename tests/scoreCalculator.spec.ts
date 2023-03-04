import {
    calculateChance, calculateFourOfAKind, calculateFullHouse,
    calculateLargeStrait,
    calculateSmallStrait, calculateThreeOfAKind,
    calculateUpperSectionCategory,
    calculateYahtzee,
} from "../src/scoreCalculator";
import {SetOfDice} from "../src/diceFunctions";
import {ScoreConstants} from "../src/constants";
import {ScoreCategories} from "../src/scoreCategories";

const full_house: SetOfDice = [1,3,3,3,1];
const three_of_a_kind: SetOfDice = [1,4,2,4,4];
const four_of_a_kind: SetOfDice = [5,5,5,5,6];
const chance_of_15: SetOfDice = [1,3,4,5,2];
const _yahtzee: SetOfDice = [1,1,1,1,1];
const almost_yahtzee: SetOfDice = [1,1,1,1,2];
const large_strait_1: SetOfDice = [1,2,3,4,5];
const large_strait_2: SetOfDice = [2,3,4,5,6];
const small_strait: SetOfDice = [1,2,3,4,6];

describe('scoreCalculator', () => {

    describe('calculateUpperSectionCategory', () => {
        test('sums up all aces', () => {
            expect(calculateUpperSectionCategory(almost_yahtzee,ScoreCategories.Aces)).toEqual(4);
        })
    })
    describe('calculateThreeOfAKind', () => {
        test('accepts full house', () => {
            expect(calculateThreeOfAKind(full_house)).toEqual(11);
        })
        test('accepts three of a kind and two singles', () => {
            expect(calculateThreeOfAKind(three_of_a_kind)).toEqual(15);
        })
        test ('accepts four of a kind', () => {
            expect(calculateThreeOfAKind(four_of_a_kind)).toEqual(26);
        })
        test('awards zero for small strait', () => {
            expect(calculateThreeOfAKind(small_strait)).toEqual(0);
        })
    })
    describe('calculateFourOfAKind', () => {
        test('accepts four 5s', () => {
            expect(calculateFourOfAKind(four_of_a_kind)).toEqual(26);
        })
    })
    describe('calculateFullHouse', () => {
        test('accepts full house', () => {
            expect((calculateFullHouse(full_house))).toEqual(ScoreConstants.FULL_HOUSE);
        })
    })
    describe('calculateSmallStrait', () => {
        test('accepts 1-2-3-4', () => {
            expect(calculateSmallStrait(small_strait)).toEqual(ScoreConstants.SMALL_STRAIT);
        })
    })
    describe('calculateLargeStrait', () => {
        test('accepts 1-2-3-4-5', () => {
            expect(calculateLargeStrait(large_strait_1)).toEqual(ScoreConstants.LARGE_STRAIT);
        })
        test('accepts 2-3-4-5-6', () => {
            expect(calculateLargeStrait(large_strait_2)).toEqual(ScoreConstants.LARGE_STRAIT);
        })
        test ('awards 0 for 1-2-3-4-6', () => {
            expect(calculateLargeStrait(small_strait)).toEqual(0);
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
})