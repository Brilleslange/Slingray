import './App.css'
import Header from "./Header.jsx";
import ColorExclude from "./ColorExclude.jsx";

function App() {
    const expansions = {pok: true}

    return (
        <>
            <Header/>
            <ColorExclude expansions={expansions}/>
        </>
    )
}

export default App
