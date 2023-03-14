import {ScoreCategories} from "./score-categories";
import {ScoreConstants} from "../app-constants";
import {ScoreMap} from "../app-types";

export function calculateTotal(score: ScoreMap) {
    let total: number = 0;
    let upperSectionTotal: number = 0;
    for (let category = ScoreCategories.Aces; category <= ScoreCategories.Sixes; ++category) {
        // @ts-ignore
        upperSectionTotal += score.get(category);
    }
    if (upperSectionTotal >= ScoreConstants.UPPER_SECTION_TOTAL_REQUIRED_FOR_BONUS) {
        upperSectionTotal += ScoreConstants.BONUS;
    }
    total += upperSectionTotal;
    for (let category = ScoreCategories.Three_Of_A_Kind; category <= ScoreCategories.Chance; ++category) {
        // @ts-ignore
        total += score.get(category);
    }
    return total;
}