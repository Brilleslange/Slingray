import type {Scoring} from "../types/scoring";
import type {Assignment} from "../types/assignment";
import {type Color} from "../types/color";
import {type Expansion} from "../types/expansion";
import type {Score} from "../types/score";

export async function assign(
    scoring: Scoring[],
    expansionStates: Map<Expansion, boolean>,
    colors: Color[],
    excludedColorPairs: [Color, Color][]
): Promise<Assignment[]> {
    const factions = scoring.map(s => s.faction)
    if (factions.length < 3) {
        throw new AssignmentError("Must select at least 3 factions")
    }

    const allowedColors = colors.filter(c => expansionStates.get(c.expansion) ?? false)
    if (factions.length > allowedColors.length) {
        throw new AssignmentError(`Cannot select more than ${allowedColors.length} factions`)
    }

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

    const maxScoringPermutations = findMaxScoringPermutations(possiblePermutations, scoring)
    const assignments: Assignment[][] = maxScoringPermutations.map(permutation =>
        permutation.map((color, index) => {
            return {
                faction: scoring[index].faction,
                color: color
            }
        })
    )

    if (assignments.length === 0) {
        throw new AssignmentError("No valid assignments found")
    } else {
        return assignments[Math.floor(Math.random() * assignments.length)]
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

function findMaxScoringPermutations(permutations: Color[][], scoring: Scoring[]): Color[][] {
    const scores: Score[] = permutations.map(permutation => {
        const score = scoring.map((s, index) =>
            s.scores[permutation[index].color]
        )
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