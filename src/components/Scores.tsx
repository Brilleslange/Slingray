import * as React from "react";
import type {Scoring} from "../types/scoring.ts";
import type {Color} from "../types/color.ts";
import type {Faction} from "../types/faction.ts";
import {COLOR_CLASS_MAP_DARK, COLOR_CLASS_MAP_TRANSPARENT, type Highlight} from "../styling/TableHighlighting.ts";
import InfoIcon from "../assets/info.svg?react";
import type {Expansion} from "../types/expansion.ts";

type Props = {
    expansionStates: Map<Expansion, boolean>,
    colors: Color[],
    factions: Faction[],
    scoring: Scoring[],
    setScoring: React.Dispatch<React.SetStateAction<Scoring[]>>
}

export const Scores: React.FC<Props> = ({expansionStates, colors, factions, scoring, setScoring}) => {
    const [highlight, setHighlight] = React.useState<Highlight>({row: null, col: null});

    const isAllowedColor = (color: Color) => expansionStates.get(color.expansion);
    const isAllowedFaction = (faction: Faction) => expansionStates.get(faction.expansion);

    const [editing, setEditing] = React.useState(false);

    function saveScoring() {
        const newScoring: Scoring[] = factions.map((faction) => {
            const scores: Record<string, number> = {}

            colors.forEach(({ color }) => {
                const id = `${faction.short}-${color.toLowerCase()}`;
                const element = document.getElementById(id) as HTMLInputElement;

                let value = Number(element?.valueAsNumber);
                if (!Number.isFinite(value)) value = 0;
                value = Math.trunc(value);
                scores[color] = value;
            });

            return {
                faction: faction,
                scores
            };
        })

        setScoring(newScoring)
        setEditing(false)
    }

    function resetScoring() {
        fetch("/api/scoring").then(res => res.json()).then(defaultScoring => {
            setScoring(defaultScoring as Scoring[])
        })
    }

    return (<div className={"collapse collapse-plus border"}>
        <input type={"checkbox"}/>
        <div className={"collapse-title"}>
            Color weighting
        </div>
        <div className={"collapse-content"}>
            <div className={"alert"}>
                <InfoIcon />{
                    "The higher the score, the more likely the color is to be assigned to that faction. " +
                    "Press the edit button at the bottom to change the scores."
                }
            </div>
            { scoring.length === 0
                ? <div className={"alert alert-error"}>Error: Scores could not be loaded.</div>
                : <div className={"flex flex-col items-center"}>
                    <table className={"table table-auto w-auto"}>
                        <tbody>
                            <tr className={"vertical-header"}>
                                <th></th>
                                {colors.map((color, colorIndex) => {
                                    const isHighlighted = highlight.col === colorIndex
                                    const highlightColor = COLOR_CLASS_MAP_TRANSPARENT[color.color] ?? ""

                                    return <th
                                        key={color.color.toLowerCase()}
                                        scope={"col"}
                                        className={`${isAllowedColor(color) ? "" : "hidden"} ${isHighlighted ? highlightColor : ""}`}
                                        onMouseEnter={() => setHighlight({row: null, col: colorIndex})}
                                        onMouseLeave={() => setHighlight({row: null, col: null})}
                                    >
                                        {color.color}
                                    </th>
                                })}
                            </tr>
                            {factions.map((faction, rowIndex) => {
                                const isRowHighlighted = highlight.row === rowIndex
                                const rowHighlightColor = "bg-base-content/20"

                                return <tr
                                    key={faction.short}
                                    className={isAllowedFaction(faction) ? undefined : "hidden"}
                                >
                                    <th
                                        scope={"row"}
                                        className={`${isRowHighlighted ? rowHighlightColor : ""}`}
                                        onMouseEnter={() => setHighlight({row: rowIndex, col: null})}
                                        onMouseLeave={() => setHighlight({row: null, col: null})}
                                    >
                                        {faction.long}
                                    </th>
                                    {colors.map((color, colIndex) => {
                                        const isColHighlighted = highlight.col === colIndex
                                        const colHighlightColor = COLOR_CLASS_MAP_TRANSPARENT[color.color] ?? ""
                                        const inputColor = COLOR_CLASS_MAP_DARK[color.color] ?? ""

                                        return <td
                                            key={color.color.toLowerCase()}
                                            className={`relative ${isAllowedColor(color) ? "" : "hidden"} isolate`}
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
                                                {editing
                                                    ? (<input
                                                        type={"number"}
                                                        id={`${faction.short}-${color.color.toLowerCase()}`}
                                                        className={`input w-20 ${inputColor}`}
                                                        min={0}
                                                        defaultValue={scoring.find(s => s.faction.short === faction.short)?.scores[color.color]}
                                                    />)
                                                    : (<p className={"text-right"}>
                                                        {scoring.find(s => s.faction.short === faction.short)?.scores[color.color]}
                                                    </p>)
                                                }
                                            </div>
                                        </td>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div className={"flex gap-4 m-4"}>
                        {editing
                            ? (<>
                                <button
                                    className={"btn btn-neutral"}
                                    onClick={() => saveScoring()}
                                >
                                    Save
                                </button>
                                <button
                                    className={"btn"}
                                    onClick={() => setEditing(false)}
                                >
                                    Cancel
                                </button>
                            </>)
                            : (<>
                                <button
                                    className={"btn btn-neutral"}
                                    onClick={() => setEditing(true)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={"btn"}
                                    onClick={() => resetScoring()}
                                >
                                    Restore default
                                </button>
                            </>)
                        }
                    </div>
                </div>
            }
        </div>
    </div>)
}