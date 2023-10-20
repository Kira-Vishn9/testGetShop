import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './index.css';

const NumPud = ({ input, setInput, handleInputChange }) => {
    const onChange = (input) => {
        console.log("Input changed", input);
        setInput(input);
        handleInputChange(input)
    }

    const onKeyPress = (button) => {
        if (button === "{bksp}") {
            // Handle backspace
            setInput((prevInput) => prevInput.slice(0, -1));
        }
    }

    return (
        <Keyboard
            layout={{ default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0"] }}
            onChange={onChange}
            onKeyPress={onKeyPress}
        />
    );
}

export default NumPud;