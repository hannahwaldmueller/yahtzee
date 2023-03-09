import React, {useState} from 'react';
import './App.css';
import {createDiceNumber, SetOfDice, updateDiceNumbers, updateRethrowSelection} from "./diceFunctions";
import {ScoreSheet} from "./ScoreSheet";
import {Dice} from "./Dice";
import {ScoreMap} from "./scoreCalculator";
import {ScoreConstants} from "./constants";
import {calculateTotal} from "./totalScoreCalculator";

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
        if (score.size !== ScoreConstants.NUMBER_OF_SCORE_CATEGORIES) {
            resetDice();
        }
    }
    const toggleRethrowMarker = (index: number)  => {
        setDiceForRethrow(updateRethrowSelection(diceMarkedForRethrow, index));
    }

    const resetGame = () => {
        setScore(new Map());
        resetDice();
    }
    function rollSelectedDice(selectedDices: number[]) {
        setDiceForRethrow([]);
        setCurrentDiceNumbers(()=>updateDiceNumbers(selectedDices,currentDiceNumbers));
        setRemainingRethrows((current: number) => current -1 );
    }

    let diceOptions;
    let gameOverSection;

    if (score.size !== ScoreConstants.NUMBER_OF_SCORE_CATEGORIES) {
        if (remainingRethrows) {
            diceOptions = <button onClick={() => rollSelectedDice(diceMarkedForRethrow)}>Roll selected dice</button>
        } else {
            diceOptions = <div>No rethrows remain. Please select a category from the score sheet.</div>
        }
    } else {
       gameOverSection =
           <div>
               <div>Your score is {calculateTotal(score)}</div>
               <button onClick={resetGame}>Go again?</button>
           </div>
    }

    return (
        <div>
            {Dice(currentDiceNumbers, diceMarkedForRethrow, toggleRethrowMarker)}
            {diceOptions}
            {ScoreSheet(currentDiceNumbers, score, updateScore)}
            {gameOverSection}
        </div>
  );
}

export default App;