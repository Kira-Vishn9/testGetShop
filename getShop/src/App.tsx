import './App.css'
import Aside from "./components/Aside/Aside.tsx";
import {useEffect, useState, useContext, createContext} from "react";

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
            <Aside />
        </ThemeContext.Provider>
    </>
  )
}

export default App
