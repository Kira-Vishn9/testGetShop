import './App.css'
import Aside from "./components/Aside/Aside.tsx";
import {useEffect, useState} from "react";


function App() {
    const [isActive, setIsActive] = useState(false);

    const handleKeyDown = (e: KeyboardEvent) => {
        console.log(e.key)
        // if (e.key === "ArrowUp") keyboard.modules.keyNavigation.up();
        // else if (e.key === "ArrowDown") keyboard.modules.keyNavigation.down();
        // else if (e.key === "ArrowLeft") keyboard.modules.keyNavigation.left();
        // else if (e.key === "ArrowRight") keyboard.modules.keyNavigation.right();
        // else if (e.key === "Enter") keyboard.modules.keyNavigation.press();
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
  return (
    <>
     <Aside />
    </>
  )
}

export default App
