import './css/App.css'
import Header from "./components/Header.tsx";
import {useEffect, useState} from "react";
import type {Color} from "./types/color.ts";
import type {Faction} from "./types/faction.ts";
import type {Scoring} from "./types/scoring.ts";
import defaultScoring from "./assets/defaultscoring.json";
import {ExcludeColors} from "./components/ExcludeColors.tsx";
import {Options} from "./components/Options.tsx";
import type {Expansion} from "./types/expansion.ts";

function App() {
    const [expansionStates, setExpansionStates] = useState<Map<string, boolean>>(new Map());
    const [expansions, setExpansions] = useState<Expansion[]>([])
    const [colors, setColors] = useState<Color[]>([])
    const [factions, setFactions] = useState<Faction[]>([])
    const [scoring, setScoring] = useState<Scoring[]>([])

    useEffect(() => {
        fetch("/api/expansions")
            .then(res => res.json())
            .then(data => {
                setExpansions(data)
                setExpansionStates(new Map(data.map((e: Expansion) =>
                    e.short === "base"
                        ? [e.short, true]
                        : [e.short, localStorage.getItem(`expansions.${e.short}`) !== "false"]
                )))
            })
    }, [])
    useEffect(() => {
        fetch("/api/colors")
            .then(res => res.json())
            .then(data => setColors(data))
    }, [])
    useEffect(() => {
        fetch("/api/factions")
            .then(res => res.json())
            .then(data => setFactions(data))
    }, [])
    useEffect(() => {
        const scoringFromLocalStorage = localStorage.getItem("scoring")
        if (scoringFromLocalStorage === null) {
            console.log("Scoring from defaultScoring: " + defaultScoring)
            setScoring(defaultScoring as Scoring[])
        } else {
            console.log("Scoring from local storage: " + scoringFromLocalStorage)
            setScoring(JSON.parse(scoringFromLocalStorage))
        }
    }, [])

    return (
        <>
            <Header />
            <Options
                expansions={expansions}
                expansionStates={expansionStates}
                setExpansionStates={setExpansionStates}
            />
            <ExcludeColors
                expansionStates={expansionStates}
                colors={colors}
            />
        </>
    )
}

export default App
