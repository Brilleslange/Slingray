import {EXPANSIONS} from "./expansion.ts";

export const COLORS = {
    RED: { long: "Red", short: "Rd", expansion: EXPANSIONS.BASE },
    ORANGE: { long: "Orange", short: "Or", expansion: EXPANSIONS.POK },
    YELLOW: { long: "Yellow", short: "Yl", expansion: EXPANSIONS.BASE },
    GREEN: { long: "Green", short: "Gn", expansion: EXPANSIONS.BASE },
    BLUE: { long: "Blue", short: "Bl", expansion: EXPANSIONS.BASE },
    PURPLE: { long: "Purple", short: "Pr", expansion: EXPANSIONS.BASE },
    PINK: { long: "Pink", short: "Pk", expansion: EXPANSIONS.POK },
    BLACK: { long: "Black", short: "Bk", expansion: EXPANSIONS.BASE },
    GRAY: { long: "Gray", short: "Gy", expansion: EXPANSIONS.TE }
}

export type Color = typeof COLORS[keyof typeof COLORS]