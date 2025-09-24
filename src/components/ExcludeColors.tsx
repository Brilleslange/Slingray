import type {Color} from "../types/color.ts";
import * as React from "react";
import {type ChangeEvent, useEffect} from "react";
import {COLOR_CLASS_MAP_TRANSPARENT, type Highlight} from "../styling/TableHighlighting.ts"
import InfoIcon from "../assets/info.svg?react";

type Props = {
    expansionStates: Map<string, boolean>,
    colors: Color[],
    setExcludedColors: React.Dispatch<React.SetStateAction<[Color, Color][]>>
}

export const ExcludeColors: React.FC<Props> = ({expansionStates, colors, setExcludedColors}) => {
    const [highlight, setHighlight] = React.useState<Highlight>({row: null, col: null});
    const [checked, setChecked] = React.useState<boolean[][]>([])

    const isAllowedColor = (color: Color) => expansionStates.get(color.expansion.short) ?? false;

    const mirrorCheck = (e: ChangeEvent<HTMLInputElement>, row: number, col: number) => {
        const newValue = e.target.checked

        setChecked(prev => {
            const newChecked = prev.map(r => [...r])

            newChecked[row][col] = newValue
            newChecked[col][row] = newValue

            localStorage.setItem("exclude_colors", JSON.stringify(newChecked))
            return newChecked
        })

        setExcludedColors(prev => {
            const firstColor = colors[Math.min(row, col)]
            const secondColor = colors[Math.max(row, col)]
            const colorPair: [Color, Color] = [firstColor, secondColor]

            const newExcludedColors = [...prev]
            const index = newExcludedColors.findIndex(pair =>
                (pair[0] === firstColor && pair[1] === secondColor)
                || (pair[1] === firstColor && pair[0] === secondColor)
            )

            if (newValue && index === -1) {
                newExcludedColors.push(colorPair)
            } else if (!newValue && index !== -1) {
                newExcludedColors.splice(index, 1)
            }

            return newExcludedColors
        })
    }

    useEffect(() => {
        const defaultChecked = Array.from(
            {length: colors.length},
            () => Array(colors.length).fill(false)
        )
        const checkedFromLocalStorage = localStorage.getItem("exclude_colors")

        if (!checkedFromLocalStorage) {
            setChecked(defaultChecked)
            return
        }

        const checkedParsed: boolean[][] = JSON.parse(checkedFromLocalStorage)
        if (checkedParsed.length !== colors.length) {
            setChecked(defaultChecked)
            return
        }

        setChecked(checkedParsed)

        const checkedColors: [Color, Color][] = []

        checkedParsed.forEach((row, rowIndex) =>
            row.forEach((value, columnIndex) => {
                if (value) {
                    const firstColor = colors[Math.min(rowIndex, columnIndex)]
                    const secondColor = colors[Math.max(rowIndex, columnIndex)]

                    if (!checkedColors.some(colorPair =>
                        colorPair[0] === firstColor && colorPair[1] === secondColor ||
                        colorPair[1] === firstColor && colorPair[0] === secondColor
                    )) {
                        checkedColors.push([firstColor, secondColor])
                    }
                }
            })
        )

        setExcludedColors(checkedColors)
    }, []);

    return <div className={"collapse collapse-plus border"}>
        <input type={"checkbox"}/>
        <div className={"collapse-title"}>
            Exclude colors
        </div>
        <div className={"collapse-content"}>
            <div className={"alert"}>
                <InfoIcon />
                <div className={"flex flex-col gap-2"}>
                    <p>{
                        "If you check a color combination, " +
                        "those two colors will never appear together in the results. " +
                        "For example, if you check the checkbox in the red row and the green column " +
                        "(which will also check the checkbox in the green row and the red column), " +
                        "the result may contain either red or green, but never both."
                    }</p>
                    <p>{
                        "If you want to exclude a color altogether, you can check the checkbox in that " +
                        "color's row and column. For example, if you want to exclude blue, " +
                        "you can check the checkbox in the blue row and the blue column."
                    }</p>
                </div>
            </div>
            {checked.length > 0 && <div className={"flex justify-center"}>
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
                                                checked={checked[rowIndex][colIndex]}
                                                onChange={e => mirrorCheck(e, rowIndex, colIndex)}
                                            />
                                        </div>
                                    </td>
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>}
        </div>
    </div>
}