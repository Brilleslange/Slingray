import type {ChangeEvent} from "react";
import * as React from "react";
import {type Expansion, EXPANSIONS} from "../types/expansion.ts";
import InfoIcon from "../assets/info.svg?react";

type Props = {
    expansions: Expansion[];
    expansionStates: Map<string, boolean>;
    setExpansionStates: React.Dispatch<React.SetStateAction<Map<string, boolean>>>;
    firmamentObsidianTwoColors: boolean;
    setFirmamentObsidianTwoColors: React.Dispatch<React.SetStateAction<boolean>>;
    assignToFracture: boolean;
    setAssignToFracture: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Options: React.FC<Props> = ({
                                             expansions, expansionStates, setExpansionStates,
                                             firmamentObsidianTwoColors, setFirmamentObsidianTwoColors,
                                             assignToFracture, setAssignToFracture,
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

    const toggleAssignToFracture = (e: ChangeEvent<HTMLInputElement>) => {
        setAssignToFracture(e.target.checked)
        localStorage.setItem("assign_to_fracture", e.target.checked.toString())
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
            <div className={"flex flex-wrap gap-2"}>
                <div className={"card bg-base-200 w-xs"}>
                    <div className={"card-body"}>
                        <h3 className={"card-title"}>Expansions</h3>
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
                    <div className={"card bg-base-200 w-xs"}>
                        <div className={"card-body"}>
                            <h3 className={"card-title"}>The Firmament / The Obsidian</h3>
                            <p>
                                Assign two colors to The&nbsp;Firmament / The&nbsp;Obsidian.
                                Start with one color for The&nbsp;Firmament,
                                then switch to the other color when flipping to The&nbsp;Obsidian.
                            </p>
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
                    <div className={"card bg-base-200 w-xs"}>
                        <div className={"card-body"}>
                            <h3 className={"card-title"}>The Fracture</h3>
                            <p>
                                Assign a color to The&nbsp;Fracture, i.e. neutral units.
                                A random color will be selected among those that have not been assigned to a faction.
                            </p>
                            <div className={"card-actions"}>
                                <label className={"label text-wrap"}>
                                    <input
                                        type={"checkbox"}
                                        className={"checkbox"}
                                        name={"assigntofracture"}
                                        id={"assigntofracture"}
                                        checked={assignToFracture}
                                        onChange={e => toggleAssignToFracture(e)}
                                    />
                                    Assign color to The&nbsp;Fracture
                                </label>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>)
}
