import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NumPud from "../KeyBoard/KeyBoard.tsx";
import CustomInput from "../CustomInput/CustomInput.tsx";

const theme = createTheme({
    components: {
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    color: "black",
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: "48px",
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "#4E4E4E",
                },
            },
        },
    },
});

const Aside = () => {
    const [input, setInput] = useState("+7(___) ___-__-__");
    const [isValidNumber, setIsValidNumber] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true);
    const [isAllow, setIsAllow] = useState(false)

    const handleInputChange = (event) => {
        if(event.nativeEvent.inputType === 'deleteContentBackward') {
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
        } else{
            const inputValue = event.nativeEvent.data
            setInput((prevInput) => {

                const index = prevInput.indexOf("_");
                if(index === 16 && isAllow) {
                    setIsDisabled(false)
                }
                if (index !== -1) {
                    const newValue = prevInput.split("");

                    newValue[index] = inputValue;
                    console.log(newValue[index] = inputValue)
                    return newValue.join("");
                }else{
                    return prevInput
                }
            });
        }
        isPhoneNumberValid()
        isSendNumber()
    };

    const getAllow = (event) => {
        setIsAllow(event.target.checked)
        isPhoneNumberValid()
        if(event.target.checked && isValidNumber){
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }
    const isPhoneNumberValid = () => {
         setIsValidNumber(!input.includes("_"));
    }
    const isSendNumber = () => {
        isAllow && isValidNumber ?
            setIsDisabled(false)
        :
            setIsDisabled(true);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ background: "#86D3F4", width: "380px", height: "721px" }}>
                    <Typography>Введите ваш номер мобильного телефона</Typography>
                    <CustomInput value={input} onChange={handleInputChange} />
                    <Typography>и с Вами свяжется наш менеджер для дальнейшей консультации</Typography>
                    <NumPud sendNumber={isSendNumber} input={input} setInput={setInput} />
                    <FormControlLabel
                        sx={{ width: "284px" }}
                        control={<Checkbox onChange={(event)=> getAllow(event)} />}
                        label="Согласие на обработку персональных данных"
                    />
                    <Button
                        sx={{ color: "#4E4E4E", background: "#86D3F4", borderColor: "#4E4E4E" }}
                        variant="outlined"
                        disabled={isDisabled}
                    >
                        Подтвердить номер
                    </Button>
                </Box>
            </ThemeProvider>
        </>
    );
};

export default Aside;