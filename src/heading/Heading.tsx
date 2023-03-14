import React from "react";

export function Heading(gameOver: boolean) {
    
    return (
        <div>
            <h2>Yahtzee</h2>
            {!gameOver &&
                <p>Click on dice to select which to roll again. To choose a scoring category for current round, click on
                    a
                    category
                    in the score sheet below.</p>}
        </div>
    );
}