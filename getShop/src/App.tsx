import './App.css'
import { useEffect, useState, createContext } from "react";
import Main from "./page/Main.tsx";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Video from "./components/Video/Video.tsx";
import FinalyPage from "./page/FinalyPage.tsx";

export const ThemeContext = createContext(null);

function App() {
    const [button, setButton] = useState("");
    const [videoTimer, setVideoTimer] = useState(0);
    const navigate = useNavigate();

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
            e.preventDefault();
        } else {
            setButton(e.key);
        }
    };

    const handleUserActivity = () => {
        setVideoTimer(0);
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousemove", handleUserActivity);

        const activityTimer = setInterval(() => {
            setVideoTimer((prevTimer) => prevTimer + 1);
            if (videoTimer >= 10) {
                navigate('/');
            }
        }, 1000);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousemove", handleUserActivity);
            clearInterval(activityTimer);
        };
    }, [navigate, videoTimer]);

    return (
        <ThemeContext.Provider value={{ button, setButton, videoTimer, setVideoTimer }}>
            <Routes>
                <Route element={<Video />} path={'*'} />
                <Route element={<Main />} path={'/main'} />
                <Route element={<FinalyPage />} path={'/successfully'} />
            </Routes>
        </ThemeContext.Provider>
    );
}

function AppWithRouter() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default AppWithRouter;
