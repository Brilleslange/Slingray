import * as React from "react";
import {type ChangeEvent, useRef} from "react";
import type {Faction} from "../types/faction.ts";

type Props = {
    expansionStates: Map<string, boolean>,
    factions: Faction[]
    selectedFactions: string[]
    setSelectedFactions: React.Dispatch<React.SetStateAction<string[]>>
}

export const Factions: React.FC<Props> = ({expansionStates, factions, selectedFactions, setSelectedFactions}) => {
    const randomCountRef = useRef<HTMLInputElement>(null)
    const availableFactions = factions.filter(faction => expansionStates.get(faction.expansion))

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

    function randomizeFactions() {
        let value = Number(randomCountRef.current?.valueAsNumber);
        if (!Number.isFinite(value)) value = 0;
        value = Math.trunc(value);
        const count = Math.max(0, Math.min(value, availableFactions.length));

        const randomizedFactions = availableFactions.map(faction => faction.short)
        for (let i = randomizedFactions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomizedFactions[i], randomizedFactions[j]] = [randomizedFactions[j], randomizedFactions[i]];
        }

        setSelectedFactions(randomizedFactions.slice(0, count))
    }

    return (<div className={"collapse collapse-arrow bg-base-300"}>
        <input type={"checkbox"}/>
        <div className={"collapse-title"}>
            Factions
        </div>
        <div className={"collapse-content"}>
            {factions.length === 0
                ? <div className={"alert alert-error"}>Error: Factions could not be loaded.</div>
                : <div className={"flex flex-col gap-4 p-4"}>
                    <div className={"grid w-full gap-3 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]"}>
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
                    <form
                        className={"flex gap-1"}
                        onSubmit={(e) => {
                            e.preventDefault()
                            randomizeFactions()
                        }}
                    >
                        <input
                            type={"number"}
                            className={"input w-20 bg-base-200"}
                            name={"random-count"}
                            min={0}
                            max={availableFactions.length}
                            defaultValue={0}
                            step={1}
                            inputMode={"numeric"}
                            ref={randomCountRef}
                            required={true}
                        />
                        <div
                            className={"tooltip tooltip-right tooltip-warning"}
                            data-tip={"Warning: Any selected factions may be deselected."}
                        >
                            <input
                                type={"submit"}
                                className={"btn btn-neutral"}
                                value={"Randomize factions"}
                            />
                        </div>
                    </form>
                </div>
            }
        </div>
    </div>)
}