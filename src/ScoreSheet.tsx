import React, {useState} from "react";
import {calculateScoreForCategory, ScoreMap} from "./scoreCalculator";
import {SetOfDice} from "./diceFunctions";
import {ScoreCategories} from "./scoreCategories";

export function ScoreSheet(currentDiceNumbers: SetOfDice, score: Map<ScoreCategories, number | null>, updateScore: (newScore: ScoreMap) => void, gameOver: boolean) {

    const [selectedCategory, setSelectedCategory] = useState<ScoreCategories | null>();

    const scoreFields: any[] = [];

    for (let category = ScoreCategories.Aces; category <= ScoreCategories.Chance; category++) {
        scoreFields.push(
            <tr key={category}
                onClick={() => setSelectedCategory(category)}>
                <td>
                    {ScoreCategories[category]}
                </td>
                <td width={"100px"}>{score.get(category)}</td>
            </tr>
        )
    }

    function onConfirmButtonClick(categoryNumber: ScoreCategories) {
        let newScore: ScoreMap = new Map<ScoreCategories, number | null>(score);
        newScore.set(categoryNumber, calculateScoreForCategory(currentDiceNumbers, categoryNumber));
        updateScore(newScore);

        setSelectedCategory(null);
    }

    let scoreOption;

    if (selectedCategory && !gameOver) {
        if (score.has(selectedCategory)) {
            scoreOption =
                <div>Points for category {ScoreCategories[selectedCategory]} are already set. Please choose a different
                    category.</div>
        } else {
            let scoreForCategory = calculateScoreForCategory(currentDiceNumbers, selectedCategory);
            scoreOption = <button onClick={() => onConfirmButtonClick(selectedCategory)}
            >Click to confirm {scoreForCategory} points for category {ScoreCategories[selectedCategory]}</button>
        }
    }

    return (
        <div>
            <table>
                <tbody>
                {scoreFields}
                </tbody>
            </table>
            {scoreOption}
        </div>
    );
}
