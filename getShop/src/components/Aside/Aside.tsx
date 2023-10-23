import {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NumPud from "../NumPud/NumPud.tsx";
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
                    fontSize: "52px",
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "black",
                    margin: 0,
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: "black",
                    fontSize: '32px',
                    textAlignLast: 'center',
                    fontWeight: 900,
                    letterSpacing: '-1.2px',

                },
            }
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    "&:before": {
                        border: "none",
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: "rgba(0, 0, 0, 1)",
                    padding: 0,
                    "& MuiFormControlLabel": {
                        fontSize: '12px',
                    },
                    },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontSize: '13px',
                    wordSpacing: "0px",
                    letterSpacing: "0px",
                    lineHeight: '1.3',
                    fontWeight: '900',
                    color: '#4E4E4E'
                },
            },
        },
    },
});

const Aside = () => {
    const [input, setInput] = useState("+7(___)___-__-__");
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
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '720px'}}>
                <Box sx={{ background: "#86D3F4", width: "380px", height: "100%", textAlign: '-webkit-center',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography
                        sx={{fontSize: '25px', width: "290px", height: "60px", lineHeight: 1.18, fontWeight: 900, m: '-4px -1px 3px 0px',
                            letterSpacing: '-0.6px', wrodSpacing: '1px'}}>
                        Введите ваш номер мобильного телефона
                    </Typography>
                    <CustomInput  value={input} onChange={handleInputChange} />
                    <Typography
                        sx={{
                            width: '290px',
                            height: '32px',
                            marginTop: '4px',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.6px',

                        }}
                    >и с Вами свяжется наш менеджер для дальнейшей консультации
                    </Typography>
                    <NumPud sendNumber={isSendNumber} input={input} setInput={setInput} />

                    <FormControlLabel
                        sx={{ width: "276px", margin: '9px 0px 12px 0px', fontSize: '1px', textAlign: 'left'
                        }}
                        control={<Checkbox sx={{padding: '0px 14px 0px 0px'}} onChange={(event)=> getAllow(event)} />}
                        label="Согласие на обработку персональных данных"
                    />
                    <Button
                        sx={{ color: "#4E4E4E", background: "#86D3F4", borderColor: "#4E4E4E", borderRaduis: '0', width: '284px', height: '52px', fontSize: '15px',
                            fontWeight: '900', letterSpacing: '0px' }}
                        variant="outlined"
                        disabled={isDisabled}
                    >
                        Подтвердить номер
                    </Button>
                </Box>
                </Box>
            </ThemeProvider>
        </>
    );
};

export default Aside;