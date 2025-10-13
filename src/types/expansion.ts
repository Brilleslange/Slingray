export const EXPANSIONS = {
    BASE: {long: "Twilight Imperium", short: "base"},
    POK: {long: "Prophecy of Kings", short: "pok"},
    TE: {long: "Thunder's Edge", short: "te"}
}

export type Expansion = typeof EXPANSIONS[keyof typeof EXPANSIONS]