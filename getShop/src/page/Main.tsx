import Box from "@mui/material/Box";
import img from '../assets/png/scale_1200.png'
import CardMedia from '@mui/material/CardMedia';

const Main = () => {
    return(
        <>
            <Box sx={{width: '100%'}}>
                <CardMedia
                    sx={{ width: '1280px', height: '720px' }}
                    image={img}
                />

            </Box>
        </>
    )
}
export default Main;