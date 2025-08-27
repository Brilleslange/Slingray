import * as React from "react";
import type {Scoring} from "../types/scoring";
import type {Assignment} from "../types/assignment";
import {COLOR_CLASS_MAP_OPAQUE} from "../styling/TableHighlighting";

type Props = {
    expansionStates: Map<string, boolean>,
    excludedColors: string[],
    selectedFactions: string[],
    scoring: Scoring[]
}

export const Results: React.FC<Props> = ({expansionStates, excludedColors, selectedFactions, scoring}) => {
    const [results, setResults] = React.useState<Assignment[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    async function getResults() {
        setResults([])
        setLoading(true);
        setError("");

        try {
            const payload = {
                expansionStates: Object.fromEntries(expansionStates),
                factions: selectedFactions,
                excludedColors: excludedColors,
                scoring: scoring
            }

            const res = await fetch("/api/assign", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            if (!res.ok) {
                setError(await res.text() ?? res.statusText);
            } else {
                setResults(await res.json());
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (<div className={"collapse collapse-arrow bg-base-300"}>
        <input type={"checkbox"}/>
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
                <button
                    className={"btn btn-neutral self-center"}
                    onClick={getResults}
                    disabled={loading}
                >
                    Assign colors
                </button>
            </div>
        </div>
    </div>)
}