import './styling/App.css'
import Header from "./components/Header.tsx";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {type Color, COLORS} from "./types/color.ts";
import {compareFactions, type Faction, FACTIONS} from "./types/faction.ts";
import {DEFAULT_SCORING, type Scoring} from "./types/scoring.ts";
import {type Expansion, EXPANSIONS} from "./types/expansion.ts";
import {Factions} from "./components/Factions.tsx";
import Footer from './components/Footer.tsx';
import {Results} from "./components/Results.tsx";
import Help from "./components/Help.tsx";
import type {Assignment} from "./types/assignment.ts";
import {Config} from "./components/Config.tsx";
import {assign} from "./utils/calculate.ts";

function App() {
    const expansions: Expansion[] = Object.values(EXPANSIONS)
    const colors: Color[] = Object.values(COLORS)
    const factions: Faction[] = Object.values(FACTIONS).sort((a, b) => compareFactions(a, b))

    const [expansionStates, setExpansionStates] = useState<Map<Expansion, boolean>>(new Map());
    const [excludedColors, setExcludedColors] = useState<[Color, Color][]>([])
    const [selectedFactions, setSelectedFactions] = useState<Faction[]>([])
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
            console.log(`Selected factions: ${selectedFactions.sort((a, b) => compareFactions(a, b)).map(f => f.long)}`)
            const assignment = await Promise.resolve(assign(
                scoring.filter(s =>
                    selectedFactions.filter(f =>
                        expansionStates.get(f.expansion) ?? false
                    ).includes(s.faction)
                ),
                expansionStates,
                colors,
                excludedColors
            ))
            setResults(assignment);
        } catch (e) {
            if (e instanceof Error && e.name === "AssignmentError") {
                setResultsError(e.message);
            } else {
                setResultsError("An error occurred while calculating the results.");
                console.error(e);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function initializeApp() {
            try {
                console.log(`Expansions: ${expansions.map(e => e.long).join(", ")}`)
                const newExpansionStates = new Map(expansions.map((expansion: Expansion) => {
                    if (expansion.short === "base") {
                        return [expansion, true]
                    } else {
                        return [expansion, localStorage.getItem(`expansions.${expansion.short}`) !== "false"]
                    }
                }))
                console.log(`Expansion states: ${JSON.stringify(newExpansionStates)}`)
                setExpansionStates(newExpansionStates);

                const scoringFromLocalStorage = localStorage.getItem("scoring");
                if (scoringFromLocalStorage) {
                    const parsedScoring = JSON.parse(scoringFromLocalStorage) as Scoring[];
                    if (isValidScoring(parsedScoring)) {
                        setScoring(parsedScoring);
                        return
                    }
                }
                setScoring(DEFAULT_SCORING)
            } catch {
                setScoring(DEFAULT_SCORING);
            }
        }

        function isValidScoring(retrievedScoring: Scoring[]): boolean {
            if (retrievedScoring.length !== factions.length) return false;
            if (!retrievedScoring.every(s => Object.keys(s.scores).length === colors.length)) return false;
            if (!retrievedScoring.every(s => factions.some((f: Faction) => f.short === s.faction.short))) return false;
            if (!retrievedScoring.every(s => Object.keys(s.scores).every(c => colors.some((col: Color) => col.color === c)))) return false;
            return true;
        }

        setLoading(true);
        initializeApp().finally(() => setLoading(false));
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
