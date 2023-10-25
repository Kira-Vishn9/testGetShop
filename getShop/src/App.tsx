import './App.css'
import React, {useEffect, useState, createContext} from "react";
import Main from "./page/Main.tsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Video from "./components/Video/Video.tsx";

export const ThemeContext = createContext(null);
function App() {
    const [button, setButton] = useState("");

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
            e.preventDefault();
        }else{
            setButton(e.key)}

    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
  return (
    <>
    <BrowserRouter>
        <ThemeContext.Provider value={{button, setButton}}>
                <Routes>
                    <Route element ={<Video />} path={'*'}/>
                    <Route element ={<Main />} path={'/main'}/>
                </Routes>
        </ThemeContext.Provider>
    </BrowserRouter>
    </>
  )
}

export default App
