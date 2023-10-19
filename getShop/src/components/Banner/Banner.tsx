import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import img from '../../assets/jpg/qr-code.jpg';
import { ThemeProvider ,createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
    components: {
        MuiCardMedia: {
            styleOverrides: {
                root: {
                    width: '126px',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: 'black',
                },
            },
        },
    },
});

const Banner = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{position: 'absolute', right: 0, top: '220px',background: '#86D3F4', height: 357, width: 251, display: "inline-block"}}>
                    <Box sx={{fontSize: '16px', margin: '20px 10px 16px 10px'}}>
                        <Typography
                            sx={{ textWrap: 'nowrap', letterSpacing: '-0.5px'
                        }}>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО</Typography>
                        <Typography sx={{margin: '-4.5px'}}>МАЛЫША!</Typography>
                        <Typography sx={{letterSpacing: '-0.5px'}}>ПОДАРИТЕ ЕМУ СОБАКУ!</Typography>
                    </Box>

                    <Box sx={{textAlign: '-webkit-center'}}>
                        <CardMedia
                            component="img"
                            height={'126'}
                            image={img}
                            alt="QR CODE"
                        />
                    </Box>
                    <Typography sx={{fontSize: '14px', m: '18px', lineHeight: '18px', letterSpacing: '-0.5px'}}>
                        Сканируйте QR-код <br/> или нажмите ОК
                    </Typography>
                    <Button
                        sx={{width: '156px', height: '52px', m: 0, background: '#000'}}
                        variant="contained">OK</Button>

                </Box>
            </ThemeProvider>
        </>
    )
}

export default Banner