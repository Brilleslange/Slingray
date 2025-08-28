import './styling/App.css'
import Header from "./components/Header.tsx";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import type {Color} from "./types/color.ts";
import type {Faction} from "./types/faction.ts";
import type {Scoring} from "./types/scoring.ts";
import type {Expansion} from "./types/expansion.ts";
import {Factions} from "./components/Factions.tsx";
import Footer from './components/Footer.tsx';
import {Results} from "./components/Results";
import Help from "./components/Help";
import type {Assignment} from "./types/assignment";
import {Config} from "./components/Config";

function App() {
    const [expansionStates, setExpansionStates] = useState<Map<string, boolean>>(new Map());
    const [expansions, setExpansions] = useState<Expansion[]>([])
    const [colors, setColors] = useState<Color[]>([])
    const [excludedColors, setExcludedColors] = useState<string[]>([])
    const [factions, setFactions] = useState<Faction[]>([])
    const [selectedFactions, setSelectedFactions] = useState<string[]>([])
    const [scoring, setScoring] = useState<Scoring[]>([])
    const [loading, setLoading] = React.useState(false);
    const [results, setResults] = React.useState<Assignment[]>([]);
    const [resultsError, setResultsError] = React.useState("");

    const factionsRef = useRef<HTMLInputElement>(null)
    const resultsRef = useRef<HTMLInputElement>(null)
    const configRef = useRef<HTMLInputElement>(null)

    async function getResults() {
        setLoading(true);
        setResults([])
        setResultsError("");

        try {
            const payload = {
                expansionStates: Object.fromEntries(expansionStates),
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
                setResultsError(await res.text() ?? res.statusText);
            } else {
                setResults(await res.json());
            }
        } catch (e) {
            if (e instanceof Error) {
                setResultsError(e.message);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetch("/api/expansions").then(res => res.json()),
            fetch("/api/colors").then(res => res.json()),
            fetch("/api/factions").then(res => res.json()),
            fetch("/api/scoring").then(res => res.json()),
        ]).then(([retrievedExpansions, retrievedColors, retrievedFactions, defaultScoring]) => {
            setExpansions(retrievedExpansions)
            setExpansionStates(new Map(retrievedExpansions.map((e: Expansion) =>
                e.short === "base"
                    ? [e.short, true]
                    : [e.short, localStorage.getItem(`expansions.${e.short}`) !== "false"]
            )))
            setColors(retrievedColors)
            setFactions(retrievedFactions)

            function isValidScoring(retrievedScoring: Scoring[]): boolean {
                if (retrievedScoring.length !== retrievedFactions.length) return false;
                if (!retrievedScoring.every(s => Object.keys(s.scores).length === retrievedColors.length)) return false;
                if (!retrievedScoring.every(s => retrievedFactions.some((f: Faction) => f.short === s.faction))) return false;
                if (!retrievedScoring.every(s => Object.keys(s.scores).every(c => retrievedColors.some((col: Color) => col.color === c)))) return false;
                return true;
            }

            try {
                const scoringFromLocalStorage = localStorage.getItem("scoring");
                if (scoringFromLocalStorage) {
                    const parsedScoring = JSON.parse(scoringFromLocalStorage) as Scoring[];
                    if (isValidScoring(parsedScoring)) {
                        setScoring(parsedScoring);
                        return;
                    }
                }
                setScoring(defaultScoring);
            } catch {
                setScoring(defaultScoring);
            }
        })
        setLoading(false);
    }, [])

    useEffect(() => {
        localStorage.setItem("scoring", JSON.stringify(scoring))
    }, [scoring]);

    return (
        <div className="flex flex-col h-full">
            <Header />
            <div className={"flex flex-col gap-2 ml-6 mr-6 grow"}>
                <Help />
                <Factions
                    loading={loading}
                    expansionStates={expansionStates}
                    factions={factions}
                    selectedFactions={selectedFactions}
                    setSelectedFactions={setSelectedFactions}
                    getResults={getResults}
                    factionsRef={factionsRef}
                    resultsRef={resultsRef}
                    configRef={configRef}
                />
                <Results
                    getResults={getResults}
                    results={results}
                    loading={loading}
                    error={resultsError}
                    factionsRef={factionsRef}
                    resultsRef={resultsRef}
                    configRef={configRef}
                />
                <Config
                    expansions={expansions}
                    expansionStates={expansionStates}
                    setExpansionStates={setExpansionStates}
                    factions={factions}
                    colors={colors}
                    setExcludedColors={setExcludedColors}
                    scoring={scoring}
                    setScoring={setScoring}
                    loading={loading}
                    getResults={getResults}
                    factionsRef={factionsRef}
                    resultsRef={resultsRef}
                    configRef={configRef}
                />
            </div>
            <Footer />
        </div>
    )
}

export default App
