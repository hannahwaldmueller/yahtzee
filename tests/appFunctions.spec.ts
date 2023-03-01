import {createDiceNumber} from "../src/appFunctions";

describe('appFunctions', () => {
    describe('createDiceNumber', () => {
        test('returns number smaller than or equal to 6', () => {
            expect(createDiceNumber()).toBeLessThanOrEqual(6);
        })
        test('returns number bigger than or equal to 1', () => {
            expect(createDiceNumber()).toBeGreaterThanOrEqual(1);
        })
        test('returns int', () => {
            const testNumber = createDiceNumber();
            expect(Math.round(testNumber)).toEqual(testNumber);
        })
    })
})