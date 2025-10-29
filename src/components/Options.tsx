import type {ChangeEvent} from "react";
import * as React from "react";
import {type Expansion, EXPANSIONS} from "../types/expansion.ts";
import InfoIcon from "../assets/info.svg?react";

export const FRACTURE_COLOR = "fracture_color"
export const FRACTURE_GRAY = "fracture_gray"
export const FRACTURE_RANDOM = "fracture_random"
export const FRACTURE_NONE = "fracture_none"

type Props = {
    expansions: Expansion[];
    expansionStates: Map<string, boolean>;
    setExpansionStates: React.Dispatch<React.SetStateAction<Map<string, boolean>>>;
    firmamentObsidianTwoColors: boolean;
    setFirmamentObsidianTwoColors: React.Dispatch<React.SetStateAction<boolean>>;
    fractureColor: string;
    setFractureColor: React.Dispatch<React.SetStateAction<string>>;
}

export const Options: React.FC<Props> = ({
                                             expansions, expansionStates, setExpansionStates,
                                             firmamentObsidianTwoColors, setFirmamentObsidianTwoColors,
                                             fractureColor, setFractureColor,
                                         }) => {
    const toggleExpansion = (e: ChangeEvent<HTMLInputElement>, expansion: Expansion) => {
        setExpansionStates(prev => {
            const next = new Map(prev)
            next.set(expansion.short, e.target.checked)
            localStorage.setItem(`expansions.${expansion.short}`, e.target.checked.toString())
            return next
        })
    }

    const toggleTwoColors = (e: ChangeEvent<HTMLInputElement>) => {
        setFirmamentObsidianTwoColors(e.target.checked)
        localStorage.setItem("firmament_obsidian_two_colors", e.target.checked.toString())
    }

    const toggleFractureColor = (e: ChangeEvent<HTMLInputElement>) => {
        setFractureColor(e.target.id)
        localStorage.setItem(FRACTURE_COLOR, e.target.id)
    }

    return (<div className={"collapse collapse-plus border"}>
        <input type={"checkbox"}/>
        <div className={"collapse-title"}>
            Options
        </div>
        <div className={"collapse-content"}>
            <div className={"alert mb-2"}>
                <InfoIcon />
                <div className={"flex flex-col gap-2"}>
                    <p>{
                        "Looking for more options? Let me know by opening an issue on GitHub or sending me an email (see footer)!"
                    }</p>
                </div>
            </div>
            <div className={"flex flex-wrap gap-2 flex-col items-center sm:flex-row sm:items-stretch"}>
                <div className={"card bg-base-200 max-w-xs sm:w-xs"}>
                    <div className={"card-body"}>
                        <h3 className={"card-title"}>Expansions</h3>
                        Select which expansions you are playing with.
                        <div className={"card-actions"}>
                            <ul>
                                {expansions
                                    .filter((e) => e.short !== "base")
                                    .map(expansion =>
                                        <li key={expansion.short}>
                                            <label className={"label"}>
                                                <input
                                                    type={"checkbox"}
                                                    className={"checkbox"}
                                                    name={"expansions"}
                                                    id={expansion.short}
                                                    checked={expansionStates.get(expansion.short) ?? true}
                                                    onChange={e => toggleExpansion(e, expansion)}
                                                />
                                                {expansion.long}
                                            </label>
                                        </li>
                                    )}
                            </ul>
                        </div>
                    </div>
                </div>
                {expansionStates.get(EXPANSIONS.TE.short) == true &&
                    <div className={"card bg-base-200 max-w-xs sm:w-xs"}>
                        <div className={"card-body"}>
                            <h3 className={"card-title"}>The Firmament / The Obsidian</h3>
                            Assign two colors to The&nbsp;Firmament / The&nbsp;Obsidian.
                            Start with one color for The&nbsp;Firmament,
                            then switch to the other color when flipping to The&nbsp;Obsidian.
                            <div className={"card-actions"}>
                                <label className={"label text-wrap"}>
                                    <input
                                        type={"checkbox"}
                                        className={"checkbox"}
                                        name={"firmobs"}
                                        id={"firmobs"}
                                        checked={firmamentObsidianTwoColors}
                                        onChange={e => toggleTwoColors(e)}
                                    />
                                    Assign two colors
                                </label>
                            </div>
                        </div>
                    </div>
                }
                {expansionStates.get(EXPANSIONS.TE.short) == true &&
                    <div className={"card bg-base-200 max-w-xs sm:w-xs"}>
                        <div className={"card-body"}>
                            <h3 className={"card-title"}>The Fracture</h3>
                            Select how to assign a color to The&nbsp;Fracture's neutral units:
                            Always assign gray;
                            assign a random color that has not been assigned to a player;
                            or do not assign a color.
                            <div className={"card-actions"}>
                                <ul>
                                    <li>
                                        <label className={"label text-wrap"}>
                                            <input
                                                type={"radio"}
                                                className={"radio"}
                                                name={FRACTURE_COLOR}
                                                id={FRACTURE_GRAY}
                                                checked={fractureColor === FRACTURE_GRAY}
                                                onChange={e => toggleFractureColor(e)}
                                            />
                                            Assign gray
                                        </label>
                                    </li>
                                    <li>
                                        <label className={"label text-wrap"}>
                                            <input
                                                type={"radio"}
                                                className={"radio"}
                                                name={FRACTURE_COLOR}
                                                id={FRACTURE_RANDOM}
                                                checked={fractureColor === FRACTURE_RANDOM}
                                                onChange={e => toggleFractureColor(e)}
                                            />
                                            Assign random color
                                        </label>
                                    </li>
                                    <li>
                                        <label className={"label text-wrap"}>
                                            <input
                                                type={"radio"}
                                                className={"radio"}
                                                name={FRACTURE_COLOR}
                                                id={FRACTURE_NONE}
                                                checked={fractureColor === FRACTURE_NONE}
                                                onChange={e => toggleFractureColor(e)}
                                            />
                                            Do not assign color
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>)
}
