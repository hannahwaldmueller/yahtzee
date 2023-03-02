import {calculateChance, calculateLargeStrait, calculateYahtzee} from "../src/scoreCalculator";
import {SetOfDice} from "../src/appFunctions";

const chance_of_15: SetOfDice = [1,3,4,5,2];
const _yahtzee: SetOfDice = [1,1,1,1,1];
const almost_yahtzee: SetOfDice = [1,1,1,1,2];
const large_strait: SetOfDice = [1,2,3,4,5];

describe('scoreCalculator', () => {
    describe('calculateChance', () => {
        test('sums up all dice', () => {
            expect(calculateChance(chance_of_15)).toEqual(15);
        })
    })
    describe('calculateYahtzee', () => {
        test('accepts correct yahtzee', () => {
            expect(calculateYahtzee(_yahtzee)).toEqual(50);
        })
        test('awards zero for incorrect', () => {
            expect(calculateYahtzee(almost_yahtzee)).toEqual(0);
        })
    })
    describe('calculateLargeStrait', () => {
        test('accepts 1-2-3-4-5', () => {
            expect(calculateLargeStrait(large_strait)).toEqual(40);
        })
    })
})