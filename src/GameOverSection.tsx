import React from "react";
import {calculateTotal} from "./totalScoreCalculator";
import {ScoreCategories} from "./scoreCategories";

export function GameOverSection(score: Map<ScoreCategories, number | null>, resetGame: () => void) {

    return <div>
        <div>Your score is {calculateTotal(score)}</div>
        <button onClick={resetGame}>Go again?</button>
    </div>
}