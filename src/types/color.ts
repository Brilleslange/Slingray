import {EXPANSIONS} from "./expansion.ts";

export const COLORS = {
    RED: { color: "Red", expansion: EXPANSIONS.BASE },
    ORANGE: { color: "Orange", expansion: EXPANSIONS.POK },
    YELLOW: { color: "Yellow", expansion: EXPANSIONS.BASE },
    GREEN: { color: "Green", expansion: EXPANSIONS.BASE },
    BLUE: { color: "Blue", expansion: EXPANSIONS.BASE },
    PURPLE: { color: "Purple", expansion: EXPANSIONS.BASE },
    PINK: { color: "Pink", expansion: EXPANSIONS.POK },
    BLACK: { color: "Black", expansion: EXPANSIONS.BASE },
    GRAY: { color: "Gray", expansion: EXPANSIONS.TE }
}

export type Color = typeof COLORS[keyof typeof COLORS]