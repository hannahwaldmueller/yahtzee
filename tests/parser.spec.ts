import {parseGameOverFromSession, parseScoreFromSession} from "../src/parser";
import {ScoreMap} from "../src/app-types";
import {ScoreCategories} from "../src/score/score-categories";

describe("parser", () => {
    describe("revivers", () => {
        const game_not_over_three_scores_JSON: string = '["[[9,25],[2,6],[6,12]]", "false"]';
        const revived_score: ScoreMap = new Map<ScoreCategories, number | null>([[2, 6], [6, 12], [9, 25]]) as ScoreMap;
        test("revives game over value", () => {
            expect(parseGameOverFromSession(game_not_over_three_scores_JSON)).toBe(false);
        })
        test("revives score map", () => {
            expect(parseScoreFromSession(game_not_over_three_scores_JSON)).toEqual(revived_score);
        })
    })
})