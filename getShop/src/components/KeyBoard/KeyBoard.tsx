import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './index.css';
import keyNavigation from "simple-keyboard-key-navigation";
import {useEffect, useRef, useState} from "react";


const NumPud = ({ input, setInput, sendNumber }) => {
    const keyboard = useRef(null);

    const onKeyPress = (button) => {
        if (button === "стереть") {
            setInput((prevInput) => {
                const lastIndex = prevInput.split("").reverse().findIndex((char, index) => {
                    return index <14 && !isNaN(parseInt(char, 14));
                });

                if (lastIndex !== -1) {
                    const lastNumber = prevInput.length - lastIndex - 1;
                    prevInput = prevInput.substring(0, lastNumber) + "_" + prevInput.substring(lastNumber + 1);
                }
                return prevInput;
            });
        } else {
            setInput((prevInput) => {
                const index = prevInput.split('').indexOf('_');
                if (index !== -1) {
                    const newValue = prevInput.split('');
                    newValue[index] = button;
                    return newValue.join('');
                } else {
                    return prevInput;
                }
            });
        }
    };


    return (
        <Keyboard
            layout={{ default: ["1 2 3", "4 5 6", "7 8 9", "стереть 0"] }}
            onKeyPress={onKeyPress}
            physicalKeyboardHighlight={true}
            keyboardRef={(r) => (keyboard.current = r)}

        />
    );
}

export default NumPud;