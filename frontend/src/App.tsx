import './styling/App.css'
import Header from "./components/Header.tsx";
import {useEffect, useState} from "react";
import type {Color} from "./types/color.ts";
import type {Faction} from "./types/faction.ts";
import type {Scoring} from "./types/scoring.ts";
import {ExcludeColors} from "./components/ExcludeColors.tsx";
import {Options} from "./components/Options.tsx";
import type {Expansion} from "./types/expansion.ts";
import {Factions} from "./components/Factions.tsx";
import {Scores} from "./components/Scores.tsx";
import Footer from './components/Footer.tsx';
import {Results} from "./components/Results";

function App() {
    const [expansionStates, setExpansionStates] = useState<Map<string, boolean>>(new Map());
    const [expansions, setExpansions] = useState<Expansion[]>([])
    const [colors, setColors] = useState<Color[]>([])
    const [excludedColors, setExcludedColors] = useState<string[]>([])
    const [factions, setFactions] = useState<Faction[]>([])
    const [selectedFactions, setSelectedFactions] = useState<string[]>([])
    const [scoring, setScoring] = useState<Scoring[]>([])

    useEffect(() => {
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
    }, [])

    useEffect(() => {
        localStorage.setItem("scoring", JSON.stringify(scoring))
    }, [scoring]);

    return (
        <div className="flex flex-col h-full">
            <Header />
            <div className={"flex flex-col gap-2 ml-6 mr-6 grow"}>
                <Results
                    expansionStates={expansionStates}
                    excludedColors={excludedColors}
                    selectedFactions={selectedFactions}
                    scoring={scoring}
                />
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
                    setExcludedColors={setExcludedColors}
                />
                <Scores
                    expansionStates={expansionStates}
                    colors={colors}
                    factions={factions}
                    scoring={scoring}
                    setScoring={setScoring}
                />
            </div>
            <Footer />
        </div>
    )
}

export default App
