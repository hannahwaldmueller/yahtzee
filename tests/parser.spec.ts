import {
    parseDiceNumbersFromSession,
    parseGameOverFromSession,
    parseRemainingRethrowsFromSession,
    parseScoreFromSession
} from "../src/parser";
import {ScoreMap} from "../src/app-types";
import {ScoreCategories} from "../src/score/score-categories";

describe("parser", () => {
    describe("parsers for scoreData", () => {
        const game_not_over_three_scores_JSON: string = '["[[9,25],[2,6],[6,12]]", "false"]';
        const revived_score: ScoreMap = new Map<ScoreCategories, number | null>([[2, 6], [6, 12], [9, 25]]) as ScoreMap;
        test("revives game over value", () => {
            expect(parseGameOverFromSession(game_not_over_three_scores_JSON)).toBe(false);
        })
        test("revives score map", () => {
            expect(parseScoreFromSession(game_not_over_three_scores_JSON)).toEqual(revived_score);
        })
    })
    describe("parsers for dice data", () => {
        const _3_3_1_5_2_oneRethrow_JSON: string = '["[3,3,1,5,2]","1"]';
        test("parse dice numbers", () => {
            expect(parseDiceNumbersFromSession(_3_3_1_5_2_oneRethrow_JSON)).toEqual([3, 3, 1, 5, 2]);
        })
        test("parse remaining rethrows counter", () => {
            expect(parseRemainingRethrowsFromSession(_3_3_1_5_2_oneRethrow_JSON)).toEqual(1);
        })
    })
})