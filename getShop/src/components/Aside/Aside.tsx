import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NumPud from "../KeyBoard/KeyBoard.tsx";

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
    const [input, setInput] = useState("+7(___)___-__-__");

    const handleInputChange = (event) => {
        const inputValue = event;

        let formattedValue = "+7(";

        for (let i = 0; i < inputValue.length; i++) {
            if (/[0-9]/.test(inputValue[i])) {
                if (formattedValue.includes("_")) {
                    formattedValue = formattedValue.replace("_", inputValue[i]);
                } else {
                    formattedValue += inputValue[i];
                }
            } else {
                formattedValue += "_";
            }

            if (i === 2) {
                formattedValue += ")";
            } else if (i === 5 || i === 8 || i === 10) {
                formattedValue += "-";
            }
        }

        setInput(formattedValue);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ background: "#86D3F4", width: "380px", height: "721px" }}>
                    <Typography>
                        Введите ваш номер мобильного телефона
                    </Typography>
                    <TextField value={input} onChange={handleInputChange} />
                    <Typography>
                        и с Вами свяжется наш менеджер для дальнейшей консультации
                    </Typography>
                    <NumPud input={input} setInput={setInput} handleInputChange={handleInputChange} />
                    <FormControlLabel
                        sx={{ width: "284px" }}
                        control={<Checkbox />}
                        label="Согласие на обработку персональных данных"
                    />
                    <Button
                        sx={{ color: "#4E4E4E", background: "#86D3F4", borderColor: "#4E4E4E" }}
                        variant="outlined"
                    >
                        Подтвердить номер
                    </Button>
                </Box>
            </ThemeProvider>
        </>
    );
};

export default Aside;
