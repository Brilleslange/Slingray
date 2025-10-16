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
import {FRACTURE_COLOR, FRACTURE_GRAY} from "./components/Options.tsx";
import InfoIcon from "./assets/info.svg?react";

function App() {
    const expansions: Expansion[] = Object.values(EXPANSIONS)
    const colors: Color[] = Object.values(COLORS)
    const factions: Faction[] = Object.values(FACTIONS).sort((a, b) => compareFactions(a, b))

    const [expansionStates, setExpansionStates] = useState<Map<string, boolean>>(new Map());
    const [firmamentObsidianTwoColors, setFirmamentObsidianTwoColors] = useState<boolean>(false);
    const [fractureColor, setFractureColor] = useState<string>(FRACTURE_GRAY);
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
            const assignment = await Promise.resolve(assign(
                selectedFactions,
                scoring,
                expansions,
                expansionStates,
                colors,
                excludedColors,
                firmamentObsidianTwoColors,
                fractureColor
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
                const newExpansionStates = new Map(expansions.map(expansion => {
                    const value = expansion.short === "base"
                        ? true
                        : localStorage.getItem(`expansions.${expansion.short}`) !== "false"
                    return [expansion.short, value]
                }))
                setExpansionStates(newExpansionStates);

                setFirmamentObsidianTwoColors(localStorage.getItem("firmament_obsidian_two_colors") === "true")
                setFractureColor(localStorage.getItem(FRACTURE_COLOR) ?? FRACTURE_GRAY)

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
                <div className={"alert alert-info mb-2"}>
                    <InfoIcon />
                    <div className={"flex flex-col gap-2"}>
                        <p>{
                            "Thunder's Edge functionality has been added, including 5 new factions and 1 new color, " +
                            "and some additional color assignment options! " +
                            "However, default color weights are not available yet (I am working on it!). "
                        }</p>
                        <p>{
                            "You can add your own color weights by going to Configuration > Color weighting and pressing the Edit button. " +
                            "Otherwise, Thunder's Edge factions will be assigned a random color that has not been assigned to another faction yet."
                        }</p>
                    </div>
                </div>
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
                    fractureColor={fractureColor}
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
                    firmamentObsidianTwoColors={firmamentObsidianTwoColors}
                    setFirmamentObsidianTwoColors={setFirmamentObsidianTwoColors}
                    fractureColor={fractureColor}
                    setFractureColor={setFractureColor}
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
