import React, {useState} from "react";
import {calculateScoreForCategory, calculateTotal, ScoreMap} from "./scoreCalculator";
import {SetOfDice} from "./diceFunctions";
import {ScoreCategories} from "./scoreCategories";
import {ScoreConstants} from "./constants";

export function ScoreSheet(currentDiceNumbers: SetOfDice, score: Map<ScoreCategories, number | null>, updateScore: (newScore: ScoreMap) => void) {

    const [selectedCategory, setSelectedCategory] = useState<ScoreCategories|null>();
    function onConfirmButtonClick (categoryNumber: ScoreCategories) {
        let newScore: ScoreMap = new Map<ScoreCategories, number | null>(score);
        newScore.set(categoryNumber, calculateScoreForCategory(currentDiceNumbers, categoryNumber));
        updateScore(newScore);

        setSelectedCategory(null);
    }

    const scoreFields: any[] = [];

    for (let category = ScoreCategories.Aces; category <= ScoreCategories.Chance; category++) {
        scoreFields.push(
            <tr key={category}
                onClick={()=>setSelectedCategory(category)}>
                <td>
                    {ScoreCategories[category]}
                </td>
                <td width={"100px"}>{score.get(category)}</td>
            </tr>
        )
    }

    let totalScore;

    if (score.size === ScoreConstants.NUMBER_OF_SCORE_CATEGORIES) {
        totalScore = calculateTotal(score);
    }

    let setScoreButton;

    if (selectedCategory) {
        let scoreForCategory = calculateScoreForCategory(currentDiceNumbers, selectedCategory);
        setScoreButton = <button onClick={() => onConfirmButtonClick(selectedCategory)}
        >Click to confirm {scoreForCategory} points for category {ScoreCategories[selectedCategory]}</button>
    }

     return  (
         <div>
             <table>
                 <tbody>
                 {scoreFields}
                 </tbody>
             </table>
             {totalScore}
             {setScoreButton}
         </div>
     );
}
