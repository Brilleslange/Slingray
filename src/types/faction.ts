import {EXPANSIONS} from "./expansion.ts";

export const FACTIONS = {
    ARBOREC: { long: "The Arborec", short: "arborec", expansion: EXPANSIONS.BASE },
    ARGENT: { long: "The Argent Flight", short: "argent", expansion: EXPANSIONS.POK },
    BARONY: { long: "The Barony of Letnev", short: "barony", expansion: EXPANSIONS.BASE },
    SAAR: { long: "The Clan of Saar", short: "saar", expansion: EXPANSIONS.BASE },
    COUNCIL: { long: "The Council Keleres", short: "council", expansion: EXPANSIONS.TE },
    CRIMSON: { long: "The Crimson Rebellion", short: "crimson", expansion: EXPANSIONS.TE },
    DEEPWROUGHT: { long: "The Deepwrought Scholarate", short: "deepwrought", expansion: EXPANSIONS.TE },
    MUAAT: { long: "The Embers of Muaat", short: "muaat", expansion: EXPANSIONS.BASE },
    HACAN: { long: "The Emirates of Hacan", short: "hacan", expansion: EXPANSIONS.BASE },
    EMPYREAN: { long: "The Empyrean", short: "empyrean", expansion: EXPANSIONS.POK },
    SOL: { long: "The Federation of Sol", short: "sol", expansion: EXPANSIONS.BASE },
    FIRM_OBS: { long: "The Firmament / The Obsidian", short: "firm-obs", expansion: EXPANSIONS.TE },
    FIRMAMENT: { long: "The Firmament", short: "firmament", expansion: EXPANSIONS.TE },
    FRACTURE: { long: "The Fracture", short: "fracture", expansion: EXPANSIONS.TE },
    GHOSTS: { long: "The Ghosts of Creuss", short: "ghosts", expansion: EXPANSIONS.BASE },
    L1Z1X: { long: "The L1Z1X Mindnet", short: "l1z1x", expansion: EXPANSIONS.BASE },
    BASTION: { long: "Last Bastion", short: "bastion", expansion: EXPANSIONS.TE },
    MAHACT: { long: "The Mahact Gene-Sorcerers", short: "mahact", expansion: EXPANSIONS.POK },
    MENTAK: { long: "The Mentak Coalition", short: "mentak", expansion: EXPANSIONS.BASE },
    NAALU: { long: "The Naalu Collective", short: "naalu", expansion: EXPANSIONS.BASE },
    NAAZ_ROKHA: { long: "The Naaz-Rokha Alliance", short: "naaz-rokha", expansion: EXPANSIONS.POK },
    NEKRO: { long: "The Nekro Virus", short: "nekro", expansion: EXPANSIONS.BASE },
    NOMAD: { long: "The Nomad", short: "nomad", expansion: EXPANSIONS.POK },
    OBSIDIAN: { long: "The Obsidian", short: "obsidian", expansion: EXPANSIONS.TE },
    RAL_NEL: { long: "The Ral Nel Consortium", short: "ral-nel", expansion: EXPANSIONS.TE },
    SARDAKK: { long: "Sardakk N'orr", short: "sardakk", expansion: EXPANSIONS.BASE },
    TITANS: { long: "The Titans of Ul", short: "titans", expansion: EXPANSIONS.POK },
    JOL_NAR: { long: "The Universities of Jol-Nar", short: "jol-nar", expansion: EXPANSIONS.BASE },
    VUIL_RAITH: { long: "The Vuil'Raith Cabal", short: "vuil'raith", expansion: EXPANSIONS.POK },
    WINNU: { long: "The Winnu", short: "winnu", expansion: EXPANSIONS.BASE },
    XXCHA: { long: "The Xxcha Kingdom", short: "xxcha", expansion: EXPANSIONS.BASE },
    YIN: { long: "The Yin Brotherhood", short: "yin", expansion: EXPANSIONS.BASE },
    YSSARIL: { long: "The Yssaril Tribes", short: "yssaril", expansion: EXPANSIONS.BASE },
}

export type Faction = typeof FACTIONS[keyof typeof FACTIONS];

export function compareFactions(a: Faction, b: Faction) {
    const normalize = (s: string) =>
        s.startsWith("The ") ? s.slice(4) : s

    return normalize(a.long).localeCompare(normalize(b.long))
}