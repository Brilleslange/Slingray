import * as React from "react";
import type {Assignment} from "../types/assignment";
import {COLOR_CLASS_MAP_OPAQUE} from "../styling/TableHighlighting";
import Cog from "../assets/cog.svg?react";

type Props = {
    getResults: () => Promise<void>,
    results: Assignment[],
    loading: boolean,
    error: string,
    factionsRef: React.RefObject<HTMLInputElement | null>
    resultsRef: React.RefObject<HTMLInputElement | null>
    configRef: React.RefObject<HTMLInputElement | null>
}

export const Results: React.FC<Props> = ({getResults, results, loading, error, factionsRef, resultsRef, configRef}) => {
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
                        {results.map(assignment => {
                            const colorClass = COLOR_CLASS_MAP_OPAQUE[assignment.color] ?? ""

                            return <>
                                <div>{assignment.faction.long}</div>
                                <div className={"badge " + colorClass}></div>
                                <div>{assignment.color}</div>
                            </>
                        })}
                    </div>
                }
                <div className={"flex"}>
                    <div className={"flex flex-1 justify-start"}>
                        <button
                            className={"btn btn-neutral"}
                            onClick={_ => {
                                resultsRef.current!.checked = false;
                                factionsRef.current!.checked = true;
                            }}
                        >
                            Select factions
                        </button>
                    </div>
                    <div className={"flex flex-1 justify-center"}>
                        <button
                            className={"btn btn-neutral"}
                            onClick={getResults}
                            disabled={loading}
                        >
                            Assign colors
                        </button>
                    </div>
                    <div className={"flex flex-1 justify-end"}>
                        <button
                            className={"btn btn-neutral"}
                            onClick={_ => {
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