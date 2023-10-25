import './App.css'
import {useEffect, useState, createContext} from "react";
import Main from "./page/Main.tsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Video from "./components/Video/Video.tsx";
import FinalyPage from "./page/FinalyPage.tsx";

export const ThemeContext = createContext(null);
function App() {
    const [button, setButton] = useState("");
    const [videoTimer, setVideotimer] = useState(0)

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
            e.preventDefault();
        }else{
            setButton(e.key)}
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        // document.addEventListener("mousemove", () => {console.log('hi')})
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
  return (
    <>
    <BrowserRouter>
        <ThemeContext.Provider value={{button, setButton, videoTimer, setVideotimer}}>
                <Routes>
                    <Route element ={<Video />} path={'*'}/>
                    <Route element ={<Main />} path={'/main'}/>
                    <Route element ={<FinalyPage />} path={'/successfully'}/>
                </Routes>
        </ThemeContext.Provider>
    </BrowserRouter>
    </>
  )
}

export default App
