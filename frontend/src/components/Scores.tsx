import * as React from "react";
import type {Scoring} from "../types/scoring.ts";
import type {Color} from "../types/color.ts";
import type {Faction} from "../types/faction.ts";
import defaultScoring from "../assets/defaultscoring.json";

type Props = {
    expansionStates: Map<string, boolean>,
    colors: Color[],
    factions: Faction[],
    scoring: Scoring[],
    setScoring: React.Dispatch<React.SetStateAction<Scoring[]>>
}

export const Scores: React.FC<Props> = ({expansionStates, colors, factions, scoring, setScoring}) => {
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
                faction: faction.short,
                scores
            };
        })

        setScoring(newScoring)
        setEditing(false)
    }

    return (<div className={"collapse collapse-arrow bg-base-300"}>
        <input type={"checkbox"}/>
        <div className={"collapse-title"}>
            Scoring
        </div>
        <div className={"collapse-content"}>
            { (scoring.length === 0 || factions.length === 0 || colors.length === 0)
                ? <div className={"alert alert-error"}>Error: Scores could not be loaded.</div>
                : <>
                    <table className={"table"}>
                        <thead className={"vertical-header"}>
                            <tr>
                                <th></th>
                                {colors.map(color =>
                                    <th
                                        key={color.color.toLowerCase()}
                                        scope={"col"}
                                        className={isAllowedColor(color) ? undefined : "hidden"}
                                    >
                                        {color.color}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {factions.map(faction =>
                                <tr className={isAllowedFaction(faction) ? undefined : "hidden"} key={faction.short}>
                                    <th>{faction.long}</th>
                                    {colors.map(color =>
                                        <td className={isAllowedColor(color) ? undefined : "hidden"} key={color.color.toLowerCase()}>
                                            {editing
                                                ? (<input
                                                    type={"number"}
                                                    id={`${faction.short}-${color.color.toLowerCase()}`}
                                                    className={"input"}
                                                    min={0}
                                                    defaultValue={scoring.find(s => s.faction === faction.short)?.scores[color.color]}
                                                />)
                                                : <p>{scoring.find(s => s.faction === faction.short)?.scores[color.color]}</p>
                                            }
                                        </td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div>
                        {editing
                            ? (<>
                                <button
                                    className={"btn btn-primary"}
                                    onClick={_ => saveScoring()}
                                >
                                    Save
                                </button>
                                <button
                                    className={"btn btn-secondary"}
                                    onClick={_ => setEditing(false)}
                                >
                                    Cancel
                                </button>
                            </>)
                            : (<>
                                <button
                                    className={"btn btn-primary"}
                                    onClick={_ => setEditing(true)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={"btn btn-secondary"}
                                    onClick={_ => setScoring(defaultScoring as Scoring[])}
                                >
                                    Restore default
                                </button>
                            </>)
                        }
                    </div>
                </>
            }
        </div>
    </div>)
}