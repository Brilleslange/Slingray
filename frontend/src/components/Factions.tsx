import * as React from "react";
import type {Faction} from "../types/faction.ts";
import type {ChangeEvent} from "react";

type Props = {
    expansionStates: Map<string, boolean>,
    factions: Faction[]
    selectedFactions: string[]
    setSelectedFactions: React.Dispatch<React.SetStateAction<string[]>>
}

export const Factions: React.FC<Props> = ({expansionStates, factions, selectedFactions, setSelectedFactions}) => {
    const toggleFaction = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id
        setSelectedFactions(prev => {
            const next = prev.slice()
            const index = next.findIndex(f => f === id)
            if (e.target.checked && index === -1) {
                next.push(id)
            } else if (!e.target.checked && index !== -1) {
                next.splice(index, 1)
            }
            else {
                return prev
            }
            return next
        })
    }

    return (<div className={"collapse collapse-arrow"}>
        <input type={"checkbox"}/>
        <div className={"collapse-title"}>
            Factions
        </div>
        <div className={"collapse-content"}>
            <div className={"grid w-full gap-2 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]"}>
                {factions.map(faction =>
                    <label
                        className={`label ${expansionStates.get(faction.expansion) ? "" : "hidden"}`}
                        key={faction.short}
                    >
                        <input
                            type={"checkbox"}
                            className={"checkbox"}
                            name={"factions"}
                            id={faction.short}
                            checked={selectedFactions.includes(faction.short)}
                            onChange={toggleFaction}
                        />
                        <span className={"whitespace-nowrap"}>{faction.long}</span>
                    </label>
                )}
            </div>
        </div>
    </div>)
}