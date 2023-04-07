import React, {useEffect, useState} from 'react';
import {createDiceNumber, updateDiceNumbers, updateRethrowSelection} from "./dice/dice-functions";
import {ScoreSheet} from "./score/Score-sheet";
import {Dice} from "./dice/Dice";
import {YahtzeeConstants} from "./app-constants";
import {GameOverSection} from "./score/Game-over-section";
import {DiceOption} from "./dice/Dice-option";
import {ScoreMap, SetOfDice} from "./app-types";
import {Heading} from "./heading/Heading";
import {
    parseDiceNumbersFromSession,
    parseGameOverFromSession,
    parseRemainingRethrowsFromSession,
    parseScoreFromSession,
    writeDiceDataToSessionStorage,
    writeScoreDataToSessionStorage
} from "./parser";

export function App() {
    const [currentDiceNumbers, setCurrentDiceNumbers] = useState<SetOfDice>([createDiceNumber(), createDiceNumber(), createDiceNumber(), createDiceNumber(), createDiceNumber()]);
    const [diceMarkedForRethrow, setDiceForRethrow] = useState<number[]>([]);
    const [remainingRethrows, setRemainingRethrows] = useState<number>(2);
    const [score, setScore] = useState<ScoreMap>(new Map());
    const [gameOver, setGameOver] = useState<boolean>(false);

    useEffect(() => {
        const dataFetch = async () => {
            const scoreData: string | null = sessionStorage.getItem("scoreData");
            const diceData: string | null = sessionStorage.getItem("diceData");

            if (scoreData !== null) {
                setScore(parseScoreFromSession(scoreData));
                setGameOver(parseGameOverFromSession(scoreData));
            }
            if (diceData !== null) {
                setCurrentDiceNumbers(parseDiceNumbersFromSession(diceData));
                setRemainingRethrows(parseRemainingRethrowsFromSession(diceData));
            }
        };
        dataFetch();
    }, []);

    useEffect(() => {
        const removeRethrowSelectionMarkup = () => {
            setDiceForRethrow([]);
        };
        removeRethrowSelectionMarkup();
    }, [currentDiceNumbers]);

    function resetDice() {
        const newDiceNumbers: SetOfDice = updateDiceNumbers([0, 1, 2, 3, 4], currentDiceNumbers);
        setCurrentDiceNumbers(() => newDiceNumbers);
        setRemainingRethrows(YahtzeeConstants.NUMBER_OF_POSSIBLE_RETHROWS);
        writeDiceDataToSessionStorage(newDiceNumbers, YahtzeeConstants.NUMBER_OF_POSSIBLE_RETHROWS);
    }

    const updateScore = (newScore: ScoreMap) => {
        setScore(newScore);
        writeScoreDataToSessionStorage(newScore, gameOver);
        if (newScore.size === YahtzeeConstants.NUMBER_OF_SCORE_CATEGORIES) {
            setGameOver(true)
            writeScoreDataToSessionStorage(newScore, true);
        } else {
            resetDice();
        }
    }
    const toggleRethrowMarker = (index: number) => {
        setDiceForRethrow(updateRethrowSelection(diceMarkedForRethrow, index));
    }

    const resetGame = () => {
        sessionStorage.clear();
        setScore(new Map());
        resetDice();
        setGameOver(false);
    }
    const updateDiceAndRethrowCount = (newRemainingRethrows: number, newDiceNumbers: SetOfDice) => {
        setRemainingRethrows(newRemainingRethrows);
        setCurrentDiceNumbers(newDiceNumbers);
        writeDiceDataToSessionStorage(newDiceNumbers, newRemainingRethrows);
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