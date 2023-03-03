import {calculateChance, calculateLargeStrait, calculateSmallStrait, calculateYahtzee} from "../src/scoreCalculator";
import {SetOfDice} from "../src/appFunctions";
import {ScoreConstants} from "../src/constants";

const chance_of_15: SetOfDice = [1,3,4,5,2];
const _yahtzee: SetOfDice = [1,1,1,1,1];
const almost_yahtzee: SetOfDice = [1,1,1,1,2];
const large_strait_1: SetOfDice = [1,2,3,4,5];
const large_strait_2: SetOfDice = [2,3,4,5,6];
const small_strait: SetOfDice = [1,2,3,4,6];

describe('scoreCalculator', () => {
    describe('calculateChance', () => {
        test('sums up all dice', () => {
            expect(calculateChance(chance_of_15)).toEqual(15);
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
})