import * as React from "react";
import {type ChangeEvent, useState} from "react";
import type {Faction} from "../types/faction.ts";
import Cog from "../assets/cog.svg?react";

type Props = {
    expansionStates: Map<string, boolean>,
    factions: Faction[]
    selectedFactions: Faction[]
    setSelectedFactions: React.Dispatch<React.SetStateAction<Faction[]>>,
    getResults: () => void,
    factionsRef: React.RefObject<HTMLInputElement | null>
    resultsRef: React.RefObject<HTMLInputElement | null>
    configRef: React.RefObject<HTMLInputElement | null>
}


export const Factions: React.FC<Props> = ({expansionStates, factions, selectedFactions, setSelectedFactions, getResults, factionsRef, resultsRef, configRef}) => {
    const [randomCount, setRandomCount] = useState(0)
    const availableFactions = factions.filter(faction => expansionStates.get(faction.expansion.short))

    const RandomizeFactionsInput = (() => {
        return <input
            type={"number"}
            inputMode={"numeric"}
            className={"input w-20 bg-base-200"}
            name={"random-count"}
            min={0}
            max={availableFactions.length}
            step={1}
            value={randomCount}
            onChange={(e) => setRandomCount(Number(e.target.value))}
            required={true}
        />;
    })

    const toggleFaction = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id
        setSelectedFactions(prev => {
            const next = prev.slice()
            const faction = factions.find(f => f.short === id)!
            const index = next.findIndex(f => f.short === faction.short)
            if (e.target.checked && index === -1) {
                next.push(faction)
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
        const count = Math.max(0, Math.min(Math.trunc(randomCount), availableFactions.length));

        const randomizedFactions = availableFactions
        for (let i = randomizedFactions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomizedFactions[i], randomizedFactions[j]] = [randomizedFactions[j], randomizedFactions[i]];
        }

        setSelectedFactions(randomizedFactions.slice(0, count))
    }

    return (<div className={"collapse collapse-arrow bg-base-300"}>
        <input type={"checkbox"} defaultChecked={true} ref={factionsRef}/>
        <div className={"collapse-title"}>
            Factions
        </div>
        <div className={"collapse-content"}>
            <div className={"flex flex-col gap-4 p-4"}>
                <div className={"sm:hidden"}>
                    <div
                        className={"tooltip tooltip-warning tooltip-open"}
                        data-tip={"Warning: Any selected factions may be deselected."}
                    >
                        <form
                            className={"flex gap-1 justify-start"}
                            onSubmit={(e) => {
                                e.preventDefault()
                                randomizeFactions()
                            }}
                        >
                            <RandomizeFactionsInput />
                            <input
                                type={"submit"}
                                className={"btn btn-neutral"}
                                value={"Randomize factions"}
                            />
                        </form>
                    </div>
                </div>
                <div className={"grid w-full gap-3 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]"}>
                    {factions.map(faction =>
                        <label
                            className={`label ${expansionStates.get(faction.expansion.short) ? "" : "hidden"}`}
                            key={faction.short}
                        >
                            <input
                                type={"checkbox"}
                                className={"checkbox"}
                                name={"factions"}
                                id={faction.short}
                                checked={selectedFactions.map(f => f.short).includes(faction.short)}
                                onChange={toggleFaction}
                            />
                            <span className={"whitespace-nowrap"}>{faction.long}</span>
                        </label>
                    )}
                </div>
                <div className={"grid grid-cols-1 md:grid-cols-3 items-center gap-2"}>
                    <form
                        className={"justify-self-center md:justify-self-start " +
                            "hidden sm:block " +
                            "flex gap-1 justify-start"}
                        onSubmit={(e) => {
                            e.preventDefault()
                            randomizeFactions()
                        }}
                    >
                        <RandomizeFactionsInput />
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
                    <div className={"justify-self-center"}>
                        <button
                            className={"btn btn-neutral"}
                            onClick={() => {
                                factionsRef.current!.checked = false;
                                resultsRef.current!.checked = true;
                                getResults();
                            }}
                        >
                            Assign colors
                        </button>
                    </div>
                    <div className={"hidden sm:block " +
                        "justify-self-center md:justify-self-end"}>
                        <button
                            className={"btn btn-neutral"}
                            onClick={() => {
                                factionsRef.current!.checked = false;
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