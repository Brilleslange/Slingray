import * as React from "react";
import type {Assignment} from "../types/assignment.ts";
import {COLOR_CLASS_MAP_OPAQUE} from "../styling/TableHighlighting.ts";
import Cog from "../assets/cog.svg?react";
import {FACTIONS} from "../types/faction.ts";
import {FRACTURE_RANDOM} from "./Options.tsx";

type Props = {
    getResults: () => void,
    results: Assignment[],
    fractureColor: string,
    loading: boolean,
    error: string,
    factionsRef: React.RefObject<HTMLInputElement | null>
    resultsRef: React.RefObject<HTMLInputElement | null>
    configRef: React.RefObject<HTMLInputElement | null>
}

export const Results: React.FC<Props> = ({getResults, results, fractureColor, loading, error, factionsRef, resultsRef, configRef}) => {
    return (<div className={"collapse collapse-arrow bg-base-300"}>
        <input type={"checkbox"} ref={resultsRef}/>
        <div className={"collapse-title"}>
            Results
        </div>
        <div className={"collapse-content"}>
            <div className={"flex flex-col gap-4 p-4"}>
                { error.length > 0 && <div className={"alert alert-error"}>{error}</div> }
                { loading && <span className={"loading loading-spinner loading-xl self-center"}/> }
                { results.length > 0 &&
                    <div className={"grid grid-cols-[max-content_auto_max-content] justify-center gap-4 w-full"}>
                        { results.map(assignment => {
                            if (assignment.faction.short === FACTIONS.FRACTURE.short && fractureColor !== FRACTURE_RANDOM) {
                                return <></>
                            } else {
                                const colorClass = COLOR_CLASS_MAP_OPAQUE[assignment.color.color] ?? ""

                                return <>
                                    <div>{assignment.faction.long}</div>
                                    <div className={"badge " + colorClass}></div>
                                    <div>{assignment.color.color}</div>
                                </>
                            }
                        })}
                    </div>
                }
                <div className={"grid grid-cols-1 md:grid-cols-3 items-center gap-2"}>
                    <div className={"hidden sm:block " +
                        "justify-self-center md:justify-self-start"}>
                        <button
                            className={"btn btn-neutral"}
                            onClick={() => {
                                resultsRef.current!.checked = false;
                                factionsRef.current!.checked = true;
                            }}
                        >
                            Select factions
                        </button>
                    </div>
                    <div className={"justify-self-center"}>
                        <button
                            className={"btn btn-neutral"}
                            onClick={getResults}
                            disabled={loading}
                        >
                            Assign colors
                        </button>
                    </div>
                    <div className={"hidden sm:block " +
                        "justify-self-center md:justify-self-end"}>
                        <button
                            className={"btn btn-neutral"}
                            onClick={() => {
                                resultsRef.current!.checked = false;
                                configRef.current!.checked = true;
                            }}
                        >
                            <Cog/> Configure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}