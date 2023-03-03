import React, {useState} from 'react';
import './App.css';
import {createDiceNumber, SetOfDice, updateDiceNumbers, updateRethrowSelection} from "./appFunctions";
import {calculateScoreForCategory, ScoreCategories, ScoreMap} from "./scoreCalculator";

export function App() {

    const [currentDiceNumbers, setCurrentDiceNumbers] = useState<SetOfDice>([createDiceNumber(),createDiceNumber(),createDiceNumber(),createDiceNumber(), createDiceNumber()]);
    const [diceMarkedForRethrow, setDiceForRethrow] = useState<number[]>([]);
    const [score, setScore] = useState<ScoreMap>(new Map());

    function toggleRethrowMarker(index: number) {
        setDiceForRethrow(updateRethrowSelection(diceMarkedForRethrow, index));
    }

    function rollSelectedDice(selectedDices: number[]) {
        setDiceForRethrow([]);
        setCurrentDiceNumbers(()=>updateDiceNumbers(selectedDices,currentDiceNumbers));
    }

    const scoreFields: any[] = [];

    function setScoreForCategory (categoryNumber: ScoreCategories) {
        let newScore: ScoreMap = new Map<ScoreCategories, number | null>(score);
        newScore.set(categoryNumber,calculateScoreForCategory(currentDiceNumbers,categoryNumber));
        setScore(newScore);
    }

    function getScoreForCategory(categoryNumber: ScoreCategories) {

    }

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

    return (
        <div>
            <div>
                {currentDiceNumbers.map((numberOfDice, index)=>(
                    <button
                        onClick={() => toggleRethrowMarker(index)}
                        key={index}
                        className={diceMarkedForRethrow.includes(index)? "marked" :""}>
                        {numberOfDice}
                    </button>
                ))}
                <button onClick={() => rollSelectedDice(diceMarkedForRethrow)}>Roll selected dice</button>
            </div>
            <table>
                <tbody>
                    {scoreFields}
                </tbody>
            </table>
        </div>
  );
}

export default App;