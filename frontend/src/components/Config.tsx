import * as React from "react";
import {Options} from "./Options";
import {ExcludeColors} from "./ExcludeColors";
import {Scores} from "./Scores";
import type {Expansion} from "../types/expansion";
import type {Color} from "../types/color";
import type {Scoring} from "../types/scoring";
import type {Faction} from "../types/faction";

type Props = {
    expansions: Expansion[];
    expansionStates: Map<string, boolean>;
    setExpansionStates: React.Dispatch<React.SetStateAction<Map<string, boolean>>>;
    factions: Faction[]
    colors: Color[],
    setExcludedColors: React.Dispatch<React.SetStateAction<string[]>>
    scoring: Scoring[],
    setScoring: React.Dispatch<React.SetStateAction<Scoring[]>>
    loading: boolean
    getResults: () => Promise<void>
    factionsRef: React.RefObject<HTMLInputElement | null>
    resultsRef: React.RefObject<HTMLInputElement | null>
    configRef: React.RefObject<HTMLInputElement | null>
}

export const Config: React.FC<Props> = ({expansions, expansionStates, setExpansionStates, factions, colors, setExcludedColors, scoring, setScoring, loading, getResults, factionsRef, resultsRef, configRef}) => {
    return (
        <div className={"collapse collapse-arrow bg-base-300"}>
            <input type={"checkbox"} ref={configRef}/>
            <div className={"collapse-title"}>
                Configuration
            </div>
            <div className={"collapse-content flex flex-col gap-1"}>
                <Options
                    loading={loading}
                    expansions={expansions}
                    expansionStates={expansionStates}
                    setExpansionStates={setExpansionStates}
                />
                <ExcludeColors
                    loading={loading}
                    expansionStates={expansionStates}
                    colors={colors}
                    setExcludedColors={setExcludedColors}
                />
                <Scores
                    loading={loading}
                    expansionStates={expansionStates}
                    colors={colors}
                    factions={factions}
                    scoring={scoring}
                    setScoring={setScoring}
                />
                <div className={"flex"}>
                    <div className={"flex flex-1 justify-start"}>
                        <button
                            className={"btn btn-neutral"}
                            onClick={_ => {
                                configRef.current!.checked = false;
                                factionsRef.current!.checked = true;
                            }}
                        >
                            Select factions
                        </button>
                    </div>
                    <button
                        className={"btn btn-neutral"}
                        onClick={_ => {
                            configRef.current!.checked = false;
                            resultsRef.current!.checked = true;
                            getResults();
                        }}
                    >
                        Assign colors
                    </button>
                    <div className={"flex flex-1 justify-end"}>
                    </div>
                </div>
            </div>
        </div>
    )
}