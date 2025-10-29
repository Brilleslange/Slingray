import * as React from "react";
import {Options} from "./Options.tsx";
import {ExcludeColors} from "./ExcludeColors.tsx";
import {Scores} from "./Scores.tsx";
import type {Expansion} from "../types/expansion.ts";
import type {Color} from "../types/color.ts";
import type {Scoring} from "../types/scoring.ts";
import type {Faction} from "../types/faction.ts";

type Props = {
    expansions: Expansion[];
    expansionStates: Map<string, boolean>;
    setExpansionStates: React.Dispatch<React.SetStateAction<Map<string, boolean>>>;
    firmamentObsidianTwoColors: boolean;
    setFirmamentObsidianTwoColors: React.Dispatch<React.SetStateAction<boolean>>;
    fractureColor: string;
    setFractureColor: React.Dispatch<React.SetStateAction<string>>;
    factions: Faction[]
    colors: Color[],
    setExcludedColors: React.Dispatch<React.SetStateAction<[Color, Color][]>>
    scoring: Scoring[],
    setScoring: React.Dispatch<React.SetStateAction<Scoring[]>>
    getResults: () => void
    factionsRef: React.RefObject<HTMLInputElement | null>
    resultsRef: React.RefObject<HTMLInputElement | null>
    configRef: React.RefObject<HTMLInputElement | null>
}

export const Config: React.FC<Props> = ({
                                            expansions, expansionStates, setExpansionStates,
                                            firmamentObsidianTwoColors, setFirmamentObsidianTwoColors,
                                            fractureColor, setFractureColor,
                                            factions,
                                            colors, setExcludedColors,
                                            scoring, setScoring,
                                            getResults,
                                            factionsRef, resultsRef, configRef
                                        }) => {
    return (
        <div className={"collapse collapse-arrow bg-base-300"}>
            <input type={"checkbox"} ref={configRef}/>
            <div className={"collapse-title"}>
                Configuration
            </div>
            <div className={"collapse-content flex flex-col gap-1"}>
                <Options
                    expansions={expansions}
                    expansionStates={expansionStates}
                    setExpansionStates={setExpansionStates}
                    firmamentObsidianTwoColors={firmamentObsidianTwoColors}
                    setFirmamentObsidianTwoColors={setFirmamentObsidianTwoColors}
                    fractureColor={fractureColor}
                    setFractureColor={setFractureColor}
                />
                <ExcludeColors
                    expansionStates={expansionStates}
                    colors={colors}
                    setExcludedColors={setExcludedColors}
                />
                <Scores
                    expansionStates={expansionStates}
                    colors={colors}
                    factions={factions}
                    firmamentObsidianTwoColors={firmamentObsidianTwoColors}
                    scoring={scoring}
                    setScoring={setScoring}
                />
                <div className={"hidden sm:grid grid-cols-1 md:grid-cols-3 items-center gap-2"}>
                    <div className={"justify-self-center md:justify-self-start"}>
                        <button
                            className={"btn btn-neutral"}
                            onClick={() => {
                                configRef.current!.checked = false;
                                factionsRef.current!.checked = true;
                            }}
                        >
                            Select factions
                        </button>
                    </div>
                    <div className={"justify-self-center"}>
                        <button
                            className={"btn btn-neutral"}
                            onClick={() => {
                                configRef.current!.checked = false;
                                resultsRef.current!.checked = true;
                                getResults();
                            }}
                        >
                            Assign colors
                        </button>
                    </div>
                    <div />
                </div>
            </div>
        </div>
    )
}