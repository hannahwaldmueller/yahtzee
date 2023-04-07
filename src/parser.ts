import {ScoreMap} from "./app-types";

export function writeToSessionStorage(score: ScoreMap, gameOver: boolean) {
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