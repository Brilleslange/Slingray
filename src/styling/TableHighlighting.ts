export const COLOR_CLASS_MAP_TRANSPARENT: Record<string, string> = {
    "Red": "bg-red-400/20",
    "Orange": "bg-orange-400/20",
    "Yellow": "bg-yellow-400/20",
    "Green": "bg-green-400/20",
    "Blue": "bg-blue-400/20",
    "Purple": "bg-purple-400/20",
    "Pink": "bg-pink-400/20",
    "Black": "bg-gray-600/20",
    "Gray": "bg-gray-400/20",
}

export const COLOR_CLASS_MAP_OPAQUE: Record<string, string> = {
    "Red": "bg-red-400",
    "Orange": "bg-orange-400",
    "Yellow": "bg-yellow-400",
    "Green": "bg-green-400",
    "Blue": "bg-blue-400",
    "Purple": "bg-purple-400",
    "Pink": "bg-pink-400",
    "Black": "bg-gray-600",
    "Gray": "bg-gray-400",
}

export const COLOR_CLASS_MAP_DARK: Record<string, string> = {
    "Red": "bg-red-950/50",
    "Orange": "bg-orange-950/50",
    "Yellow": "bg-yellow-950/50",
    "Green": "bg-green-950/50",
    "Blue": "bg-blue-950/50",
    "Purple": "bg-purple-950/50",
    "Pink": "bg-pink-950/50",
    "Black": "bg-gray-950/50",
    "Gray": "bg-gray-800/50"
}

export type Highlight = {
    row: number | null,
    col: number | null,
}