import React from "react";
import {SetOfDice, updateDiceNumbers} from "./diceFunctions";

export function DiceOption(remainingRethrows: number, diceMarkedForRethrow: number[], currentDiceNumbers: [number, number, number, number, number], updateDiceAndRethrowCount: (newRemainingRethrows: number, newDiceNumbers: SetOfDice) => void) {
    function onRollDiceButtonClick() {
        const newRemainingRethrows = remainingRethrows - 1;
        const newDiceNumbers = updateDiceNumbers(diceMarkedForRethrow, currentDiceNumbers);
        updateDiceAndRethrowCount(newRemainingRethrows, newDiceNumbers);
    }

    if (remainingRethrows) {
        return <button onClick={() => onRollDiceButtonClick()}>Roll selected dice</button>;
    }
    return <div>No rethrows remain. Please select a category from the score sheet.</div>;
}