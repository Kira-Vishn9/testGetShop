import {ChangeEvent, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NumPud from "../NumPud/NumPud.tsx";
import CustomInput from "../CustomInput/CustomInput.tsx";
import {onValidNumber} from "../../service/service.ts";
import {useNavigate} from "react-router-dom";

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
                    "&.Mui-error": {
                        color: 'red',
                    },
                    "&.Mui-disabled:before":{
                        border: '0',
                        color: 'red'
                    },
                },
                input: {
                    "&.MuiInput-input":{
                        "&.Mui-disabled":{
                        opacity: '1',
                       "-webkitTextFillColor": 'rgba(0, 0, 0, 1)'},

                    }
                }            }
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
        }
    },
});

const Aside = () => {
    const [input, setInput] = useState("+7(___)___-__-__");
    const [isValidNumber, setIsValidNumber] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true);
    const [isAllow, setIsAllow] = useState(false)
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!input.includes("_")) {
                    const data = await onValidNumber(input);
                    setIsValidNumber(data)
                    setIsError(!data)
                    isSendNumber()
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [input, isAllow]);

    const getAllow = (event: ChangeEvent<HTMLInputElement>) => {
        setIsAllow(event.target.checked)
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
                            letterSpacing: '-0.6px', wordSpacing: '1px'}}>
                        Введите ваш номер мобильного телефона
                    </Typography>
                    <CustomInput isError={isError} value={input}  />
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
                    <NumPud setIsDisabled={setIsDisabled} setInput={setInput} />

                    {isError ? (
                        <Typography sx={{ color: 'red', textTransform: 'uppercase' }}>Неверно введён номер</Typography>
                    ) : (
                        <FormControlLabel
                            sx={{ width: "276px", margin: '9px 0px 12px 0px', fontSize: '1px', textAlign: 'left' }}
                            control={<Checkbox sx={{ padding: '0px 14px 0px 0px' }} onChange={(event) => getAllow(event)} />}
                            label="Согласие на обработку персональных данных"
                        />
                    )}
                    <Button
                        onClick={()=>{navigate('/successfully')}}
                        sx={{ color: "#4E4E4E", background: "#86D3F4", borderColor: "#4E4E4E", borderRadius: '0', width: '284px', height: '52px', fontSize: '15px',
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