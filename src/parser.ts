import {ScoreMap, SetOfDice} from "./app-types";

export function writeToSessionStorage(score: ScoreMap, gameOver: boolean, currentDiceNumbers: SetOfDice, remainingRethrows: number) {
    const scoreData: string = JSON.stringify(Array.from(score.entries()));

    const scoreDataToStore = Array.from(scoreData,
        gameOver.toString);

    const diceDataToStore = Array.from(currentDiceNumbers as Array<number>,
        remainingRethrows.toString);

    sessionStorage.setItem("scoreData", JSON.stringify(scoreDataToStore));
}

export function retrieveScoreFromSession() {
    const storedScoreData = sessionStorage.getItem("scoreData");

    function scoreReviver() {
        console.log(storedScoreData);
    }

    if (storedScoreData !== null) {
        const storedScore = JSON.parse(storedScoreData, scoreReviver);
    }
};