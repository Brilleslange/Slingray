import type {Scoring} from "../types/scoring.ts";
import type {Assignment} from "../types/assignment.ts";
import {type Color} from "../types/color.ts";
import type {Score} from "../types/score.ts";
import {compareFactions, type Faction, FACTIONS} from "../types/faction.ts";
import {type Expansion, EXPANSIONS} from "../types/expansion.ts";

export async function assign(
    selectedFactions: Faction[],
    scoring: Scoring[],
    expansions: Expansion[],
    expansionStates: Map<string, boolean>,
    colors: Color[],
    excludedColorPairs: [Color, Color][],
    firmamentObsidianTwoColors: boolean,
): Promise<Assignment[]> {
    const factions = selectedFactions.filter(faction => expansionStates.get(faction.expansion.short))
    if (factions.length < 3) {
        throw new AssignmentError("Must select at least 3 factions")
    }

    const firmamentObsidianSelected = factions.some(faction => faction.short === FACTIONS.FIRM_OBS.short)

    let maxPlayerCount = 0
    expansions.forEach(expansion => {
        if (expansionStates.get(expansion.short) === true) {
            maxPlayerCount += expansion.players
        }
    })

    if (factions.length > maxPlayerCount) {
        throw new AssignmentError(`Cannot select more than ${maxPlayerCount} factions`)
    } else if (
        firmamentObsidianSelected &&
        firmamentObsidianTwoColors &&
        factions.length == maxPlayerCount
    ) {
        throw new AssignmentError(`Cannot assign two colors to The Firmament / The Obsidian with ${maxPlayerCount} players`)
    }

    if (firmamentObsidianSelected && firmamentObsidianTwoColors) {
        const firmamentObsidianIndex = factions.findIndex(faction => faction.short === FACTIONS.FIRM_OBS.short)
        factions.splice(firmamentObsidianIndex, 1)
        factions.push(FACTIONS.FIRMAMENT)
        factions.push(FACTIONS.OBSIDIAN)
        factions.sort(compareFactions)
    }
    if (expansionStates.get(EXPANSIONS.TE.short)) {
        factions.push(FACTIONS.FRACTURE)
    }

    const allowedColors = colors.filter(c => expansionStates.get(c.expansion.short) ?? false)
    const excludedColors = excludedColorPairs.filter(c => c[0].color === c[1].color)
    if (factions.length > (allowedColors.length - excludedColors.length)) {
        throw new AssignmentError("Too many colors excluded")
    }

    const allPermutations = permutations(allowedColors, factions.length)
    const possiblePermutations = allPermutations.filter(permutation =>
        !excludedColorPairs.some(pair =>
            permutation.includes(pair[0]) && permutation.includes(pair[1])
        )
    )
    if (possiblePermutations.length === 0) {
        throw new AssignmentError("Too many color pairs excluded")
    }

    const maxScoringPermutations = findMaxScoringPermutations(possiblePermutations, factions, scoring)
    const assignments: Assignment[][] = maxScoringPermutations.map(permutation =>
        permutation.map((color, index) => {
            return {
                faction: factions[index],
                color: color
            }
        })
    )

    if (assignments.length === 0) {
        throw new AssignmentError("No valid assignments found")
    } else {
        const selectedAssignment = assignments[Math.floor(Math.random() * assignments.length)]
        return selectedAssignment.sort((a, b) => compareFactions(a.faction, b.faction))
    }
}

function permutations(colors: Color[], size: number): Color[][] {
    if (size === 0) {
        return [[]]
    } else if (size === 1) {
        return colors.map(c => [c])
    } else if (size > colors.length) {
        throw new AssignmentError("Cannot generate permutations of a list of size " + colors.length + " with size " + size)
    }

    return colors.flatMap((color, index) => {
        const rest = colors.slice(0, index).concat(colors.slice(index + 1));
        return permutations(rest, size - 1).map(p => [color, ...p]);
    });
}

function findMaxScoringPermutations(permutations: Color[][], factions: Faction[], scoring: Scoring[]): Color[][] {
    const scores: Score[] = permutations.map(permutation => {
        const score = factions.map((f, index) => {
            const color = permutation[index]
            const scoringForFaction = scoring.find(s => s.faction.short === f.short)!!
            return scoringForFaction.scores[color.color]
        })
        return {
            permutation: permutation,
            score: score.reduce((a, b) => a + b, 0)
        }
    })

    const maxScore = Math.max(...scores.map(s => s.score))

    return scores.filter(s => s.score === maxScore).map(s => s.permutation)
}

export class AssignmentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AssignmentError";
    }
}