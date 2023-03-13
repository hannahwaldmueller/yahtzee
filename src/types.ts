import {ScoreCategories} from "./score/score-categories";

export type ScoreMap = Map<ScoreCategories, number | null>

export type SetOfDice = [number, number, number, number, number]