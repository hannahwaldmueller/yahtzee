import React, {useState} from "react";
import {calculateScoreForCategory, ScoreCategories, ScoreMap} from "./scoreCalculator";
import {SetOfDice} from "./appFunctions";

export function ScoreSheet(currentDiceNumbers: SetOfDice) {

    const [score, setScore] = useState<ScoreMap>(new Map());
    function setScoreForCategory (categoryNumber: ScoreCategories) {
        let newScore: ScoreMap = new Map<ScoreCategories, number | null>(score);
        newScore.set(categoryNumber,calculateScoreForCategory(currentDiceNumbers,categoryNumber));
        setScore(newScore);
    }

    const scoreFields: any[] = [];

    for (let category = ScoreCategories.Aces; category <= ScoreCategories.Chance; category++) {
        scoreFields.push(
            <tr key={category}
                onClick={() => setScoreForCategory(category)}>
                <td>
                    {ScoreCategories[category]}
                </td>
                <td width={"100px"}>{score.get(category)}</td>
            </tr>
        )
    }

     return  <table>
         <tbody>
         {scoreFields}
         </tbody>
     </table>;
}
