import './css/App.css'
import Header from "./components/Header.tsx";
import {useEffect, useState} from "react";
import type {Color} from "./types/color.ts";
import type {Faction} from "./types/faction.ts";
import type {Scoring} from "./types/scoring.ts";
import defaultScoring from "./assets/defaultscoring.json";
import {ExcludeColors} from "./components/ExcludeColors.tsx";

function App() {
    const [expansionStates, setExpansionStates] = useState<Map<string, boolean>>(new Map()
        .set("base", true)
        .set("pok", localStorage.getItem("expansions.pok") !== "false")
    );
    const [colors, setColors] = useState<Color[]>([])
    const [factions, setFactions] = useState<Faction[]>([])
    const [scoring, setScoring] = useState<Scoring[]>([])

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
            <ExcludeColors expansionStates={expansionStates} colors={colors} />
        </>
    )
}

export default App
