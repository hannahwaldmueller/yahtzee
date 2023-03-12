import React, {useState} from 'react';
import './App.css';
import {createDiceNumber, SetOfDice, updateDiceNumbers, updateRethrowSelection} from "./diceFunctions";
import {ScoreSheet} from "./ScoreSheet";
import {Dice} from "./Dice";
import {ScoreMap} from "./scoreCalculator";
import {ScoreConstants} from "./constants";
import {GameOverSection} from "./GameOverSection";
import {DiceOption} from "./DiceOption";

export function App() {
    const [currentDiceNumbers, setCurrentDiceNumbers] = useState<SetOfDice>([createDiceNumber(), createDiceNumber(), createDiceNumber(), createDiceNumber(), createDiceNumber()]);
    const [diceMarkedForRethrow, setDiceForRethrow] = useState<number[]>([]);
    const [remainingRethrows, setRemainingRethrows] = useState<number>(2);
    const [score, setScore] = useState<ScoreMap>(new Map());
    const [gameOver, setGameOver] = useState<boolean>(false);

    function resetDice() {
        setCurrentDiceNumbers(() => updateDiceNumbers([0, 1, 2, 3, 4], currentDiceNumbers));
        setRemainingRethrows(ScoreConstants.NUMBER_OF_POSSIBLE_RETHROWS);
    }

    const updateScore = (newScore: ScoreMap) => {
        setScore(newScore);
        if (newScore.size === ScoreConstants.NUMBER_OF_SCORE_CATEGORIES) {
            setGameOver(true)
        } else {
            resetDice();
        }
    }
    const toggleRethrowMarker = (index: number) => {
        setDiceForRethrow(updateRethrowSelection(diceMarkedForRethrow, index));
    }

    const resetGame = () => {
        setScore(new Map());
        resetDice();
        setGameOver(false);
    }
    const updateDiceAndRethrowCount = (newRemainingRethrows: number, newDiceNumbers: SetOfDice) => {
        setRemainingRethrows(newRemainingRethrows);
        setCurrentDiceNumbers(newDiceNumbers);
        setDiceForRethrow([]);
    };

    if (!gameOver) {
        return (
            <div>
                {Dice(currentDiceNumbers, diceMarkedForRethrow, toggleRethrowMarker)}
                {DiceOption(remainingRethrows, diceMarkedForRethrow, currentDiceNumbers, updateDiceAndRethrowCount)}
                {ScoreSheet(currentDiceNumbers, score, updateScore, gameOver)}
            </div>);
    }
    return (
        <div>
            {ScoreSheet(currentDiceNumbers, score, updateScore, gameOver)}
            {GameOverSection(score, resetGame)}
        </div>
    );
}

export default App;