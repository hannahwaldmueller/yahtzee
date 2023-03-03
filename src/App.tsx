import React, {useState} from 'react';
import './App.css';
import {createDiceNumber, SetOfDice, updateDiceNumbers, updateRethrowSelection} from "./appFunctions";
import {ScoreCategories, ScoreMap} from "./scoreCalculator";

export function App() {

    const [currentDiceNumbers, setCurrentDiceNumbers] = useState<SetOfDice>([createDiceNumber(),createDiceNumber(),createDiceNumber(),createDiceNumber(), createDiceNumber()]);
    const [diceMarkedForRethrow, setDiceForRethrow] = useState<number[]>([]);
    const [score, setScore] = useState<ScoreMap>(new Map());

    function toggleRethrowMarker(index: number) {
        setDiceForRethrow(updateRethrowSelection(diceMarkedForRethrow, index));
    }

    function rollSelectedDice(selectedDices: number[]) {
        setDiceForRethrow([]);
        setCurrentDiceNumbers(updateDiceNumbers(selectedDices,currentDiceNumbers));
    }

    const scoreFields: any[] = [];

    function setScoreForCategory (categoryNumber: ScoreCategories) {
        let newScore: ScoreMap = new Map<ScoreCategories, number | null>(score);
        newScore.set(categoryNumber,7);
        setScore(newScore);
    }

    for (let i = ScoreCategories.Aces; i < ScoreCategories.Yahtzee; i++) {
        scoreFields.push(
            <button
                onClick={() => setScoreForCategory(i)}
                key={i}>
                {ScoreCategories[i]}{score.get(i)}
            </button>
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
            <div>
                {scoreFields}
            </div>
        </div>

  );
}

export default App;