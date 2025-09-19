import type {ChangeEvent} from "react";
import * as React from "react";
import type {Expansion} from "../types/expansion.ts";
import InfoIcon from "../assets/info.svg?react";

type Props = {
    expansions: Expansion[];
    expansionStates: Map<Expansion, boolean>;
    setExpansionStates: React.Dispatch<React.SetStateAction<Map<Expansion, boolean>>>;
}

export const Options: React.FC<Props> = ({expansions, expansionStates, setExpansionStates}) => {
    const toggleExpansion = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id
        setExpansionStates(prev => {
            const next = new Map(prev)
            const expansion = expansions.find(e => e.short === id)!
            next.set(expansion, e.target.checked)
            localStorage.setItem(`expansions.${id}`, e.target.checked.toString())
            return next
        })
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
            <div className={"flex"}>
                <div className={"card bg-base-200"}>
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
                                                    checked={expansionStates.get(expansion) ?? true}
                                                    onChange={toggleExpansion}
                                                />
                                                {expansion.long}
                                            </label>
                                        </li>
                                    )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
