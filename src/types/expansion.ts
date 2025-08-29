export const EXPANSIONS = {
    BASE: {long: "Twilight Imperium", short: "base"},
    POK: {long: "Prophecy of Kings", short: "pok"}
}

export type Expansion = typeof EXPANSIONS[keyof typeof EXPANSIONS]