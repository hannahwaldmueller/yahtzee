import React, {useEffect, useState} from 'react';
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

    useEffect(() => {
        const dataFetch = async () => {
            const data: string | null = sessionStorage.getItem("score");
            const diceData: string | null = sessionStorage.getItem("currentDiceNumbers");
            const rethrowData: string | null = sessionStorage.getItem("remainingRethrows");

            if (data !== null) {
                let storedScore: ScoreMap = new Map(JSON.parse(data)) as ScoreMap;
                setScore(storedScore);
                // @ts-ignore
                const storedStatus: string = sessionStorage.getItem("gameOver");
                setGameOver(JSON.parse(storedStatus));
            }
        };

        dataFetch();
    }, [score]);

    function resetDice() {
        setCurrentDiceNumbers(() => updateDiceNumbers([0, 1, 2, 3, 4], currentDiceNumbers));
        setRemainingRethrows(YahtzeeConstants.NUMBER_OF_POSSIBLE_RETHROWS);
    }

    const updateScore = (newScore: ScoreMap) => {
        setScore(newScore);
        sessionStorage.setItem("score", JSON.stringify(Array.from(newScore.entries())));
        if (newScore.size === YahtzeeConstants.NUMBER_OF_SCORE_CATEGORIES) {
            setGameOver(true)
            sessionStorage.setItem("gameOver", "true");
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