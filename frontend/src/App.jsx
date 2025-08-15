import './css/App.css'
import defaultscores from "./assets/defaultscores.json"
import Header from "./Header.jsx";
import ColorExclude from "./ColorExclude.jsx";
import {useEffect, useState} from "react";

function App() {
    const [expansions, setExpansions] = useState({pok: localStorage.getItem("expansions.pok") === "true"})
    const [colors, setColors] = useState([])
    const [factions, setFactions] = useState([])
    const [scores, setScores] = useState([])

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
        const scoresFromLocalStorage = localStorage.getItem("scores")
        if (scoresFromLocalStorage === null) {
            JSON.parse(defaultscores)
        } else {
            setScores(JSON.parse(scoresFromLocalStorage))
        }
    }, [])

    return (
        <>
            <Header/>
            <ColorExclude expansions={expansions}/>
        </>
    )
}

export default App
