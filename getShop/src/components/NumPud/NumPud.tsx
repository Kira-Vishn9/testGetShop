import { useContext, useEffect, useState } from 'react';
import { ThemeContext, ThemeContextProps } from '../../App';
import Button from "@mui/material/Button";
import './index.css';
import {useNavigate} from "react-router-dom";

interface NumPadProps {
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    isDisabled: boolean
}

const NumPad: React.FC<NumPadProps> = ({ setIsDisabled, setInput, isDisabled }) => {
    const [currentRow, setCurrentRow] = useState<number>(1);
    const [currentCol, setCurrentCol] = useState<number>(1);
    const [activeButton, setActiveButton] = useState<[string | number, string | number]>([currentRow, currentCol]);
    const { button, setButton } = useContext<ThemeContextProps>(ThemeContext);

    const navigate = useNavigate();

    const buttonsMatrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['Cтереть', 0],
        ['Подтвердить номер'],
        ['X']
    ];
    const onChengeRouter = () => {
        navigate('/');
    }
    const moveDown = (array: (string | number)[][]) => {
        if (currentRow === 1 && currentCol === 2) {
            setCurrentRow(3);
            setCurrentCol(1);
            setActiveButton([3, 1]);
        } else if ((currentCol === 0 && currentRow === 3 && !isDisabled)  || (currentCol === 1 && currentRow === 3 && !isDisabled) ) {
            setCurrentRow(4);
            setCurrentCol(0);
            setActiveButton([4, 0]);
        }else if((currentCol === 0 && currentRow === 3 && isDisabled)  || (currentCol === 1 && currentRow === 3 && isDisabled )){
            setCurrentRow(5);
            setCurrentCol(0);
            setActiveButton([5, 0]);
        } else if (currentRow === 2 && currentCol === 2) {
            setCurrentRow(3);
            setCurrentCol(1);
            setActiveButton([3, 1]);
        } else if (currentRow< array.length - 1) {
            setCurrentRow(currentRow + 1);
            setActiveButton([currentRow + 1, currentCol]);
        }
    }

    const moveUp = () => {
        if(currentCol === 0 && currentRow === 5 && isDisabled){
            setCurrentRow(3);
            setCurrentCol(  0)
            setActiveButton([3, 0])

        } else if(currentRow === 3 && currentCol === 1){
            setCurrentRow(2);
            setCurrentCol(  2)
            setActiveButton([2, 2]);
        }else if (currentRow > 0) {
            setCurrentRow(currentRow - 1);
            setActiveButton([currentRow - 1, currentCol]);
        }
    }
    const moveLeft = () => {
        if (currentCol > 0) {
            setCurrentCol(currentCol - 1);
            setActiveButton([currentRow, currentCol - 1]);
        }
    }
    const moveRight = (array: (string | number)[][]) => {
        if (currentCol < array[currentRow].length - 1) {
            setCurrentCol(currentCol + 1);
            setActiveButton([currentRow, currentCol + 1]);
        }
    }
    const onEnter = () => {
        const inputValue: string | number = buttonsMatrix[currentRow][currentCol]
        if(inputValue === 'Cтереть') {
            onBackspace()
        }else if (inputValue === 'X') {
            onChengeRouter()
        }else if(inputValue === 'Подтвердить номер'){
            navigate('/successfully')
        }else{
            onChangeInputValue(inputValue)
        }}
    const onChangeInputValue = (button: string | number) => {
        setInput((prevInput) => {
            const index = prevInput.indexOf("_");
            if (index !== -1) {
                const newValue: string[] = prevInput.split("");
                newValue[index] = button.toString();
                return newValue.join("");
            }else{
                return prevInput
            }
        });
    }
    const onBackspace = () => {
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
        setIsDisabled(true)
        if (setButton) {
            setButton(' ')
        }
    }
    const onChageActive = (row: number, col: number, button?: string | number) => {
        setCurrentRow(row);
        setCurrentCol(col)
        setActiveButton([row, col]);
        if(button){
        onChangeInputValue(button)
        }
    }
    const onNavigaionNumber = (button: string | number) =>{
        switch (button){
            case '1':
                onChageActive(0, 0, button)
                break;
            case '2':
                onChageActive(0, 1, button)
                break;
            case '3':
                onChageActive(0, 2, button)
                break;
            case '4':
                onChageActive(1, 0, button)
                break;
            case '5':
                onChageActive(1, 1, button)
                break;
            case '6':
                onChageActive(1, 2, button)
                break;
            case '7':
                onChageActive(2, 0, button)
                break;
            case '8':
                onChageActive(2, 1, button)
                break;
            case '9':
                onChageActive(2, 2, button)
                break;
            case '0':
                onChageActive(3, 1, button)
                break;
            case 'Backspace':
                onChageActive(3, 0)
                onBackspace()
                break;
            case 'Стереть':
                onChageActive(3, 0)
                onBackspace()
                break;
            case 'Подтвердить номер':
                onChageActive(4, 0)
                navigate('/successfully')
                break;
            case 'X':
                onChageActive(5, 0)
                onChengeRouter()
                break;
            default:
                console.log(JSON.stringify(button))
        }
        if (setButton) {
            setButton('')
        }
    }
    const handleKeyPress = () => {
        if(button === 'ArrowLeft'){
            moveLeft()
        }
        if(button === 'ArrowRight'){
            moveRight(buttonsMatrix)
        }
        if(button === 'ArrowUp'){
            moveUp()
        }
        if(button === 'ArrowDown'){
            moveDown(buttonsMatrix)
        }
        if(button === 'Enter'){
            onEnter()
        }
        if(button === 'Escape'){
            onChengeRouter()
        }
        onNavigaionNumber(button)
        if (setButton) {
            setButton('')
        }
    }

    useEffect(() => {
        handleKeyPress();
    }, [button]);

    const handleButtonClick = (value: string | number) => {
        console.log(value)
        if (value === 'Cтереть') {
            onBackspace()
            onChageActive(3, 0)
            setIsDisabled(true)
            } else if(value === 'X'){
            onChengeRouter()
        }else if(value === 'Подтвердить номер'){
            navigate('/successfully')
        }else{
            onNavigaionNumber(value.toString())
            if (setButton) {
                setButton('')
            }
        }
    };

    const renderButtons = () => {
        const buttonElements = [];

        for (let i = 0; i < buttonsMatrix.length; i++) {
            for (let j = 0; j < buttonsMatrix[i].length; j++) {
                if(i === 4 && j ===0) {
                    buttonElements.push(
                    <Button
                        disabled={isDisabled}
                        variant="outlined"
                        sx={{ color: "#4E4E4E", background: "#86D3F4", borderColor: "#4E4E4E", borderRadius: '0', width: '284px', height: '52px', fontSize: '15px',
                            fontWeight: '900', letterSpacing: '0px', position: 'absolute', bottom: '72px'
                        }}
                        key={buttonsMatrix[i][j]}
                        className={` ${activeButton[0] === i && activeButton[1] === j && !isDisabled ? 'active' : ''}`}
                        onClick={() => handleButtonClick(buttonsMatrix[i][j])}
                    >
                        {buttonsMatrix[i][j]}
                    </Button>)
                }else if(i === 5 && j ===0) {
                    buttonElements.push(
                        <div
                            key={buttonsMatrix[i][j]}
                            className={`keyboard-button closeButton ${activeButton[0] === i && activeButton[1] === j ? 'active' : ''}`}
                            onClick={() => handleButtonClick(buttonsMatrix[i][j])}
                        >
                            {buttonsMatrix[i][j]}
                        </div>
                    );
                } else{
                    buttonElements.push(
                        <div
                            key={buttonsMatrix[i][j]}
                            className={`keyboard-button ${activeButton[0] === i && activeButton[1] === j ? 'active' : ''}`}
                            onClick={() => handleButtonClick(buttonsMatrix[i][j])}
                        >
                            {buttonsMatrix[i][j]}
                        </div>
                    );
                }
                }
        }

        return buttonElements;
    };

    return (
        <div className={'keyboard'}>
            {renderButtons()}
        </div>
    );
};

export default NumPad;
