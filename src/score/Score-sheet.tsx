import React, {useState} from "react";
import {calculateScoreForCategory} from "./score-calculator";
import {ScoreCategories} from "./score-categories";
import {TestIds} from "../test-constants";
import {ScoreMap, SetOfDice} from "../app-types";

export function ScoreSheet(currentDiceNumbers: SetOfDice, score: Map<ScoreCategories, number | null>, updateScore: (newScore: ScoreMap) => void, gameOver: boolean) {

    const [selectedCategory, setSelectedCategory] = useState<ScoreCategories | null>();

    const scoreFields: any[] = [];

    for (let category = ScoreCategories.Aces; category <= ScoreCategories.Chance; category++) {
        scoreFields.push(
            <tr key={category}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "marked category-box" : "category-box"}
                data-testid={TestIds.categoryButtonPrefix.concat(String(category))}>
                <td>
                    {ScoreCategories[category]}
                </td>
                <td className="score-box">{score.get(category)}</td>
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
                <div data-testid={TestIds.categorySetMsg}>Points for
                    category {ScoreCategories[selectedCategory]} are
                    already set. Please choose a different
                    category.</div>
        } else {
            let scoreForCategory = calculateScoreForCategory(currentDiceNumbers, selectedCategory);
            scoreOption = <button onClick={() => onConfirmButtonClick(selectedCategory)}
                                  data-testid={TestIds.confirmButton}
            >Click to confirm {scoreForCategory} points for category {ScoreCategories[selectedCategory]}</button>
        }
    }

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <th>Category</th>
                    <th>Points</th>
                </tr>
                {scoreFields}
                </tbody>
            </table>
            {scoreOption}
        </div>
    );
}
