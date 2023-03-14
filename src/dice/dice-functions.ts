import {SetOfDice} from "../app-types";

export function createDiceNumber() {
    return Math.floor(Math.random() * 6 + 1);
}

export function updateRethrowSelection(selectedDiceIds: number[], toggledDiceId: number): number[] {
    if (selectedDiceIds.includes(toggledDiceId)) {
        return selectedDiceIds.filter(item => item !== toggledDiceId);
    }
    return selectedDiceIds.concat([toggledDiceId]);
}

export function updateDiceNumbers(diceToRethrow: number[], currentDiceNumbers: SetOfDice): SetOfDice {
    const newDiceNumbers: number[] =
        currentDiceNumbers.map((diceNumber, index) => (
            (diceToRethrow.includes(index)) ? createDiceNumber() : diceNumber
        ))
    return newDiceNumbers as SetOfDice;
}