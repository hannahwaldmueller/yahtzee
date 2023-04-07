import {ScoreMap, SetOfDice} from "./app-types";

export function writeScoreDataToSessionStorage(score: ScoreMap, gameOver: boolean) {
    const scoreData: string = JSON.stringify(Array.from(score.entries()));
    const gameOverData: string = JSON.stringify(gameOver);

    let scoreDataToStore: [string, string] = [scoreData, gameOverData];

    sessionStorage.setItem("scoreData", JSON.stringify(scoreDataToStore));
}

export function parseScoreFromSession(storedScoreData: string) {
    const unwrappedData: string[] = JSON.parse(storedScoreData);
    return new Map(JSON.parse(unwrappedData[0])) as ScoreMap;
};

export function parseGameOverFromSession(storedScoreData: string) {
    const unwrappedData: string[] = JSON.parse(storedScoreData);
    return JSON.parse(unwrappedData[1]);
}

export function writeDiceDataToSessionStorage(dice: SetOfDice, numberOfRethrows: number) {
    const diceNumbersToStore: string = JSON.stringify(dice);
    const rethrowCountToStore: string = JSON.stringify(numberOfRethrows);

    let diceDataToStore: [string, string] = [diceNumbersToStore, rethrowCountToStore];

    sessionStorage.setItem("diceData", JSON.stringify(diceDataToStore));
}

export function parseDiceNumbersFromSession(diceData: string) {
    const unwrappedData: string[] = JSON.parse(diceData);

    return JSON.parse(unwrappedData[0]);
}

export function parseRemainingRethrowsFromSession(diceData: string) {
    const unwrappedData: string[] = JSON.parse(diceData);

    return JSON.parse(unwrappedData[1]);
}
