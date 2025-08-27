import * as React from "react";
import type {Color} from "../types/color";
import type {Faction} from "../types/faction";
import type {Scoring} from "../types/scoring";
import type {Assignment} from "../types/assignment";
import {COLOR_CLASS_MAP} from "../styling/TableHighlighting";

type Props = {
    expansionStates: Map<string, boolean>,
    colors: Color[],
    excludedColors: string[],
    factions: Faction[],
    selectedFactions: string[],
    scoring: Scoring[]
}

export const Results: React.FC<Props> = ({expansionStates, colors, excludedColors, factions, selectedFactions, scoring}) => {
    const [results, setResults] = React.useState<Assignment[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    async function getResults() {
        setResults([])
        setLoading(true);
        setError("");

        try {
            const payload = {
                expansionStates: expansionStates,
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
                setError(await res.text());
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
                            const colorClass = COLOR_CLASS_MAP[assignment.color].substring(0, COLOR_CLASS_MAP[assignment.color].length - 3) ?? ""

                            return <>
                                <div>{assignment.faction.long}</div>
                                <div className={colorClass}></div>
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