import type {Color} from "../types/color.ts";
import * as React from "react";
import {type ChangeEvent} from "react";
import {COLOR_CLASS_MAP_TRANSPARENT, type Highlight} from "../styling/TableHighlighting.ts"

type Props = {
    expansionStates: Map<string, boolean>,
    colors: Color[],
    setExcludedColors: React.Dispatch<React.SetStateAction<string[]>>
}

export const ExcludeColors: React.FC<Props> = ({expansionStates, colors, setExcludedColors}) => {
    const [highlight, setHighlight] = React.useState<Highlight>({row: null, col: null});

    const isAllowedColor = (color: Color) => expansionStates.get(color.expansion);

    const mirrorCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const oppositeId = id.split("-").reverse().join("-");

        if (id !== oppositeId) {
            const opposite = document.getElementById(oppositeId) as HTMLInputElement;
            opposite.checked = e.target.checked;
        }

        setExcludedColors(prev => {
            const next = prev.slice()
            const index = next.findIndex(f => f === id || f === oppositeId)
            if (e.target.checked && index === -1) {
                next.push(id)
            } else if (!e.target.checked && index !== -1) {
                next.splice(index, 1)
            } else {
                return prev
            }
            return next
        })
    }

    return <div className={"collapse collapse-arrow bg-base-300"}>
        <input type={"checkbox"}/>
        <div className={"collapse-title"}>
            Exclude colors
        </div>
        <div className={"collapse-content"}>
            { colors.length === 0
                ? <div className={"alert alert-error"}>Error: Colors could not be loaded.</div>
                : <div className={"flex justify-center"}>
                    <table className={"table table-auto w-auto"}>
                        <tbody>
                            <tr className={"border-0 vertical-header"}>
                                <th/>
                                {colors.map((color, colorIndex) => {
                                    const isHighlighted = highlight.col === colorIndex
                                    const highlightColor = COLOR_CLASS_MAP_TRANSPARENT[color.color] ?? ""

                                    return <th
                                        key={color.color}
                                        scope={"col"}
                                        className={`${isAllowedColor(color) ? "" : "hidden"} ${isHighlighted ? highlightColor : ""}`}
                                        onMouseEnter={() => setHighlight({row: null, col: colorIndex})}
                                        onMouseLeave={() => setHighlight({row: null, col: null})}
                                    >
                                        {color.color}
                                    </th>
                                })}
                            </tr>
                            {colors.map((rowColor, rowIndex) => {
                                const isRowHighlighted = highlight.row === rowIndex
                                const rowHighlightColor = COLOR_CLASS_MAP_TRANSPARENT[rowColor.color] ?? ""

                                return <tr
                                    key={rowColor.color}
                                    className={`border-0 ${isAllowedColor(rowColor) ? "" : " hidden"}`}
                                >
                                    <th
                                        scope={"row"}
                                        className={`${isRowHighlighted ? rowHighlightColor : ""}`}
                                        onMouseEnter={() => setHighlight({row: rowIndex, col: null})}
                                        onMouseLeave={() => setHighlight({row: null, col: null})}
                                    >
                                        {rowColor.color}
                                    </th>
                                    {colors.map((colColor, colIndex) => {
                                        const isColHighlighted = highlight.col === colIndex
                                        const colHighlightColor = COLOR_CLASS_MAP_TRANSPARENT[colColor.color] ?? ""

                                        return <td
                                            key={colColor.color}
                                            className={`p-3 relative ${isAllowedColor(colColor) ? "" : "hidden"} isolate`}
                                            onMouseEnter={() => setHighlight({row: rowIndex, col: colIndex})}
                                            onMouseLeave={() => setHighlight({row: null, col: null})}
                                        >
                                            {isRowHighlighted &&
                                                <div className={`absolute inset-0 z-0 ${rowHighlightColor} mix-blend-multiply`} />
                                            }
                                            {isColHighlighted &&
                                                <div className={`absolute inset-0 z-0 ${colHighlightColor} mix-blend-multiply`} />
                                            }
                                            <div className={"relative z-10"}>
                                                <input
                                                    type={"checkbox"}
                                                    className={"checkbox"}
                                                    name={"color_exclude"}
                                                    id={`${rowColor.color.toLowerCase()}-${colColor.color.toLowerCase()}`}
                                                    onChange={mirrorCheck}
                                                />
                                            </div>
                                        </td>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
            </div>
            }
        </div>
    </div>
}