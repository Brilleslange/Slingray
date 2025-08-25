import type {ChangeEvent} from "react";
import * as React from "react";
import type {Expansion} from "../types/expansion.ts";

type Props = {
    expansions: Expansion[];
    expansionStates: Map<string, boolean>;
    setExpansionStates: React.Dispatch<React.SetStateAction<Map<string, boolean>>>;
}

export const Options: React.FC<Props> = ({expansions, expansionStates, setExpansionStates}) => {
    const toggleExpansion = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id
        setExpansionStates(prev => {
            const next = new Map(prev)
            next.set(id, e.target.checked)
            localStorage.setItem(`expansions.${id}`, e.target.checked.toString())
            return next
        })
    }

    return (<div className={"collapse collapse-arrow"}>
        <input type={"checkbox"}/>
        <div className={"collapse-title"}>
            Options
        </div>
        <div className={"collapse-content"}>
            { expansions.length === 0 && <div className={"alert alert-error"}>Error: Expansions could not be loaded.</div> }
            <div className={"flex"}>
                { expansions.length > 0 && <div className={"card"}>
                    <div className={"card-body"}>
                        <h3 className={"card-title"}>Expansions</h3>
                        <div className={"card-body"}>
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
                                                    onChange={toggleExpansion}
                                                />
                                                {expansion.long}
                                            </label>
                                        </li>
                                    )}
                            </ul>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    </div>)
}
