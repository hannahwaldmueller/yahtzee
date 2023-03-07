import React, {useState} from 'react';
import './App.css';
import {createDiceNumber, SetOfDice, updateDiceNumbers, updateRethrowSelection} from "./diceFunctions";
import {ScoreSheet} from "./ScoreSheet";
import {Dice} from "./Dice";
import {ScoreMap} from "./scoreCalculator";

export function App() {
    const [currentDiceNumbers, setCurrentDiceNumbers] = useState<SetOfDice>([createDiceNumber(),createDiceNumber(),createDiceNumber(),createDiceNumber(), createDiceNumber()]);
    const [diceMarkedForRethrow, setDiceForRethrow] = useState<number[]>([]);
    const [remainingRethrows, setRemainingRethrows] = useState<number>(2);
    const [score, setScore] = useState<ScoreMap>(new Map());

    function resetDice() {
        setCurrentDiceNumbers(()=>updateDiceNumbers([0,1,2,3,4], currentDiceNumbers));
        setRemainingRethrows(2);
    }

    const updateScore = (newScore: ScoreMap) => {
        setScore(newScore);
        resetDice();
    }
    const toggleRethrowMarker = (index: number)  => {
        setDiceForRethrow(updateRethrowSelection(diceMarkedForRethrow, index));
    }

    function rollSelectedDice(selectedDices: number[]) {
        setDiceForRethrow([]);
        setCurrentDiceNumbers(()=>updateDiceNumbers(selectedDices,currentDiceNumbers));
        setRemainingRethrows((current: number) => current -1 );
    }

    let options;

    if (remainingRethrows) {
        options = <button onClick={() => rollSelectedDice(diceMarkedForRethrow)}>Roll selected dice</button>
    } else {
        options = <div>No rethrows remain. Please select a category from the score sheet.</div>
    }

    return (
        <div>
            {Dice(currentDiceNumbers, diceMarkedForRethrow, toggleRethrowMarker)}
            {options}
            {ScoreSheet(currentDiceNumbers, score, updateScore)}
        </div>
  );
}

export default App;