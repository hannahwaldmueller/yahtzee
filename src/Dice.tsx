import React from "react";

export function Dice(currentDiceNumbers: [number, number, number, number, number], diceMarkedForRethrow: number[], toggleRethrowMarker: (index: number) => void) {
    return (
        <div>
            {currentDiceNumbers.map((numberOfDice, index)=>(
                <button
                    onClick={() => toggleRethrowMarker(index)}
                    key={index}
                    className={diceMarkedForRethrow.includes(index)? "marked" :""}>
                    {numberOfDice}
                </button>
            ))}
        </div>
    );
}