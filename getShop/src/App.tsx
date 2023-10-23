import './App.css'
import {useEffect, useState, createContext} from "react";
import Main from "./page/Main.tsx";

export const ThemeContext = createContext(null);
function App() {
    const [button, setButton] = useState("");

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
            e.preventDefault();
        }else{setButton(e.key)}

    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
  return (
    <>
        <ThemeContext.Provider value={{button, setButton}}>
            <Main />
        </ThemeContext.Provider>
    </>
  )
}

export default App
