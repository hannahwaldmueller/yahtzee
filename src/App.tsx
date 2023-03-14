import React, {useState} from 'react';
import {createDiceNumber, updateDiceNumbers, updateRethrowSelection} from "./dice/dice-functions";
import {ScoreSheet} from "./score/Score-sheet";
import {Dice} from "./dice/Dice";
import {YahtzeeConstants} from "./app-constants";
import {GameOverSection} from "./score/Game-over-section";
import {DiceOption} from "./dice/Dice-option";
import {ScoreMap, SetOfDice} from "./app-types";
import {Heading} from "./heading/Heading";

export function App() {
    const [currentDiceNumbers, setCurrentDiceNumbers] = useState<SetOfDice>([createDiceNumber(), createDiceNumber(), createDiceNumber(), createDiceNumber(), createDiceNumber()]);
    const [diceMarkedForRethrow, setDiceForRethrow] = useState<number[]>([]);
    const [remainingRethrows, setRemainingRethrows] = useState<number>(2);
    const [score, setScore] = useState<ScoreMap>(new Map());
    const [gameOver, setGameOver] = useState<boolean>(false);

    function resetDice() {
        setCurrentDiceNumbers(() => updateDiceNumbers([0, 1, 2, 3, 4], currentDiceNumbers));
        setRemainingRethrows(YahtzeeConstants.NUMBER_OF_POSSIBLE_RETHROWS);
    }

    const updateScore = (newScore: ScoreMap) => {
        setScore(newScore);
        if (newScore.size === YahtzeeConstants.NUMBER_OF_SCORE_CATEGORIES) {
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
                {Heading(gameOver)}
                {Dice(currentDiceNumbers, diceMarkedForRethrow, toggleRethrowMarker)}
                {DiceOption(remainingRethrows, diceMarkedForRethrow, currentDiceNumbers, updateDiceAndRethrowCount)}
                {ScoreSheet(currentDiceNumbers, score, updateScore, gameOver)}
            </div>
        );
    }
    return (
        <div>
            {Heading(gameOver)}
            {ScoreSheet(currentDiceNumbers, score, updateScore, gameOver)}
            {GameOverSection(score, resetGame)}
        </div>
    );
}

export default App;