export const EXPANSIONS = {
    BASE: {long: "Twilight Imperium", short: "base", players: 6 },
    POK: {long: "Prophecy of Kings", short: "pok", players: 2 },
    TE: {long: "Thunder's Edge", short: "te", players: 0 }
}

export type Expansion = typeof EXPANSIONS[keyof typeof EXPANSIONS]