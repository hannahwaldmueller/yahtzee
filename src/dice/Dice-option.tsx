import React from "react";
import {updateDiceNumbers} from "./dice-functions";
import {TestIds} from "../test-constants";
import {SetOfDice} from "../app-types";

export function DiceOption(remainingRethrows: number, diceMarkedForRethrow: number[], currentDiceNumbers: [number, number, number, number, number], updateDiceAndRethrowCount: (newRemainingRethrows: number, newDiceNumbers: SetOfDice) => void) {
    function onRollDiceButtonClick() {
        if (diceMarkedForRethrow.length > 0) {
            const newRemainingRethrows = remainingRethrows - 1;
            const newDiceNumbers = updateDiceNumbers(diceMarkedForRethrow, currentDiceNumbers);
            updateDiceAndRethrowCount(newRemainingRethrows, newDiceNumbers);
        }
    }

    if (remainingRethrows) {
        return <button onClick={() => onRollDiceButtonClick()}
                       data-testid={TestIds.rollDiceBtn}>Roll selected dice</button>;
    }
    return <div data-testid={TestIds.noRethrowsMsg}>No rethrows remain. Please select a category from the score
        sheet.</div>;
}