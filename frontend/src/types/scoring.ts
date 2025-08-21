import type {Faction} from "./faction.ts";

export type Scoring = {
    faction: Faction;
    scores: { [color: string]: number };
};