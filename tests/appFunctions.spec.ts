import {createDiceNumber} from "../src/appFunctions";

describe('App', () => {
    describe('createDiceNumber', () => {
        test('returns int smaller than or equal to 6', () => {
            expect(createDiceNumber()).toBeLessThanOrEqual(6);
        })
        test('returns int bigger than or equal to 1', () => {
            expect(createDiceNumber()).toBeGreaterThanOrEqual(1);
        })
    })
})