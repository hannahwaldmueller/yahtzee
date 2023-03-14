import {createDiceNumber, updateDiceNumbers, updateRethrowSelection} from "../src/dice/dice-functions";
import {SetOfDice} from "../src/app-types";

describe('dice-functions', () => {
    describe('createDiceNumber', () => {
        let testNumbers: number[] = [];
        for (let i = 1; i < 100; i++) {
            testNumbers.push(createDiceNumber());
        }
        test('returns number smaller than or equal to 6', () => {
            for (let number of testNumbers) {
                expect(number).toBeLessThanOrEqual(6);
            }
        })
        test('returns number bigger than or equal to 1', () => {
            for (let number of testNumbers) {
                expect(number).toBeGreaterThanOrEqual(1);
            }
        })
        test('returns int', () => {
            for (let number of testNumbers) {
                expect(Math.round(number)).toEqual(number);
            }
        })
    })
    describe('updateRethrowSelection', () => {
        const dice_0_2_3: number[] = [0, 2, 3];
        const die_1: number = 1;
        const dice_0_1_2_3: number[] = [0, 1, 2, 3];
        test('adds currently unselected dice to selection', () => {
            expect(updateRethrowSelection(dice_0_2_3, die_1).sort()).toEqual(dice_0_1_2_3);
        })
        test('removes currently selected dice from selection', () => {
            expect(updateRethrowSelection(dice_0_1_2_3, die_1)).toEqual(dice_0_2_3);
        })
    })
    describe('updateDiceNumbers', () => {
        const set_7_7_7_7_7: SetOfDice = [7, 7, 7, 7, 7];
        const dice_2_4: number[] = [2, 4];
        test('keeps unselected dice as they were', () => {
            const updated = updateDiceNumbers(dice_2_4, set_7_7_7_7_7);
            expect(updated[0]).toEqual(set_7_7_7_7_7[0]);
            expect(updated[1]).toEqual(set_7_7_7_7_7[1]);
            expect(updated[3]).toEqual(set_7_7_7_7_7[3]);
        })
        test('updates selected dice', () => {
            const updated = updateDiceNumbers(dice_2_4, set_7_7_7_7_7);
            expect(updated[2]).not.toEqual(7);
            expect(updated[4]).not.toEqual(7);
        })
    })
})