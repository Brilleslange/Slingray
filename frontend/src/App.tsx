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
import {Factions} from "./components/Factions.tsx";
import {Scores} from "./components/Scores.tsx";

function App() {
    const [expansionStates, setExpansionStates] = useState<Map<string, boolean>>(new Map());
    const [expansions, setExpansions] = useState<Expansion[]>([])
    const [colors, setColors] = useState<Color[]>([])
    const [factions, setFactions] = useState<Faction[]>([])
    const [selectedFactions, setSelectedFactions] = useState<string[]>([])
    const [scoring, setScoring] = useState<Scoring[]>([])
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        Promise.all([
            fetch("/api/expansions").then(res => res.json()),
            fetch("/api/colors").then(res => res.json()),
            fetch("/api/factions").then(res => res.json())
        ]).then(([expansions, colors, factions]) => {
            setExpansions(expansions)
            setExpansionStates(new Map(expansions.map((e: Expansion) =>
                e.short === "base"
                    ? [e.short, true]
                    : [e.short, localStorage.getItem(`expansions.${e.short}`) !== "false"]
            )))
            setColors(colors)
            setFactions(factions)
        })

        try {
            const scoringFromLocalStorage = localStorage.getItem("scoring");
            setScoring(scoringFromLocalStorage
                ? JSON.parse(scoringFromLocalStorage)
                : defaultScoring
            );
        } catch {
            setScoring(defaultScoring);
        }

        setInitialized(true)
    }, [])

    useEffect(() => {
        if (initialized) {
            localStorage.setItem("scoring", JSON.stringify(scoring))
        }
    }, [initialized, scoring]);

    return (
        <>
            <Header />
            <Options
                expansions={expansions}
                expansionStates={expansionStates}
                setExpansionStates={setExpansionStates}
            />
            <Factions
                expansionStates={expansionStates}
                factions={factions}
                selectedFactions={selectedFactions}
                setSelectedFactions={setSelectedFactions}
            />
            <ExcludeColors
                expansionStates={expansionStates}
                colors={colors}
            />
            <Scores
                expansionStates={expansionStates}
                colors={colors}
                factions={factions}
                scoring={scoring}
                setScoring={setScoring}
            />
        </>
    )
}

export default App
