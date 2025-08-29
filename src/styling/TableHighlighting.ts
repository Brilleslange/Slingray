export const COLOR_CLASS_MAP_TRANSPARENT: Record<string, string> = {
    "Red": "bg-red-400/20",
    "Orange": "bg-orange-400/20",
    "Yellow": "bg-yellow-400/20",
    "Green": "bg-green-400/20",
    "Blue": "bg-blue-400/20",
    "Purple": "bg-purple-400/20",
    "Pink": "bg-pink-400/20",
    "Black": "bg-gray-400/20",
}

export const COLOR_CLASS_MAP_OPAQUE: Record<string, string> = {
    "Red": "bg-red-400",
    "Orange": "bg-orange-400",
    "Yellow": "bg-yellow-400",
    "Green": "bg-green-400",
    "Blue": "bg-blue-400",
    "Purple": "bg-purple-400",
    "Pink": "bg-pink-400",
    "Black": "bg-gray-400",
}

export type Highlight = {
    row: number | null,
    col: number | null,
}