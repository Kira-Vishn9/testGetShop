import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../App';
import './index.css';

const NumPad = ({setInput}) => {
    let [currentRow, setCurrentRow] = useState(1)
    let [currentCol, setCurrentCol] = useState(1)
    const [activeButton, setActiveButton] = useState([currentRow, currentCol]);
    const { button, setButton } = useContext(ThemeContext);

    const buttonsMatrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['Cтереть', 0],
        [
            <div className={'close-button'}>
                <span className={"bar"}></span>
                <span className={"bar"}></span>
            </div>
        ]
    ];
    const moveDown = (array) => {
        if(currentRow === 1 && currentCol === 2){
            setCurrentRow(3);
            setCurrentCol(  1)
            setActiveButton([3, 1]);
        }else if(currentRow === 2 && currentCol === 2){
            setCurrentRow(3);
            setCurrentCol(  1)
            setActiveButton([3, 1]);}
        else if (currentRow < array.length - 1) {
            setCurrentRow(currentRow + 1);
            setActiveButton([currentRow + 1, currentCol]);
        }
    }
    const moveUp = () => {
        if(currentRow === 3 && currentCol === 1){
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
    const moveRight = (array) => {
        if (currentCol < array[currentRow].length - 1) {
            setCurrentCol(currentCol + 1);
            setActiveButton([currentRow, currentCol + 1]);
        }
    }
    const onEnter = () => {
        const inputValue = buttonsMatrix[currentRow][currentCol]
        if(inputValue == 'Cтереть') {
            onBackspace()
        } else{
            onChangeInputValue(inputValue)
        }}
    const onChangeInputValue = (button) => {
        setInput((prevInput) => {
            const index = prevInput.indexOf("_");
            // if(index === 16 && isAllow) {
            //     setIsDisabled(false)
            // }
            if (index !== -1) {
                const newValue = prevInput.split("");

                newValue[index] = button;
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
        setButton('')
    }
    const onChageActive = (row, col, button?: string | number) => {
        setCurrentRow(row);
        setCurrentCol(col)
        setActiveButton([row, col]);
        if(button){
        onChangeInputValue(button)
        }
    }
    const onNavigaionNumber = (button) =>{
        switch (button){
            case '1':
                console.log(1)
                onChageActive(0, 0, button)
                break;
            case '2':
                console.log(2)
                onChageActive(0, 1, button)
                break;
            case '3':
                console.log(3)
                onChageActive(0, 2, button)
                break;
            case '4':
                console.log(4)
                onChageActive(1, 0, button)
                break;
            case '5':
                console.log(5)
                onChageActive(1, 1, button)
                break;
            case '6':
                console.log(6)
                onChageActive(1, 2, button)
                break;
            case '7':
                console.log(7)
                onChageActive(2, 0, button)
                break;
            case '8':
                console.log(8)
                onChageActive(2, 1, button)
                break;
            case '9':
                console.log(9)
                onChageActive(2, 2, button)
                break;
            case '0':
                console.log(0)
                onChageActive(3, 1, button)
                break;
            case 'Backspace':
                console.log('Backspace')
                onChageActive(3, 0)
                onBackspace()
                break;
            case 'Стереть':
                console.log('Стереть')
                onChageActive(3, 0)
                onBackspace()
                break;
            default:
                console.log(JSON.stringify(button))
        }
        setButton('')
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
        onNavigaionNumber(button)
        setButton('')
    }

    useEffect(() => {
        handleKeyPress();
    }, [button]);

    const handleButtonClick = (value) => {
        if (value === 'Cтереть') {
            onBackspace()
            onChageActive(3, 0)
            }else{
            onNavigaionNumber(value.toString())
            setButton('')
        }
    };

    const renderButtons = () => {
        const buttonElements = [];

        for (let i = 0; i < buttonsMatrix.length; i++) {
            for (let j = 0; j < buttonsMatrix[i].length; j++) {
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

        return buttonElements;
    };

    return (
        <div className={'keyboard'}>
            {renderButtons()}
        </div>
    );
};

export default NumPad;
