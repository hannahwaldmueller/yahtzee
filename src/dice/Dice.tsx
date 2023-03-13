import React from "react";

export function Dice(currentDiceNumbers: [number, number, number, number, number], diceMarkedForRethrow: number[], toggleRethrowMarker: (index: number) => void) {

    return (
        <div><p>Click on dice to select which to roll again. To choose a scoring category for current round, click on a
            category
            in the score sheet below.</p>
            {currentDiceNumbers.map((numberOfDice, index) => (
                <button
                    onClick={() => toggleRethrowMarker(index)}
                    key={index}
                    className={diceMarkedForRethrow.includes(index) ? "marked" : ""}
                    data-testid={"diceButton_".concat(String(index))}>
                    {numberOfDice}
                </button>
            ))}
        </div>
    );
}