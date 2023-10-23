import Box from "@mui/material/Box";
import img from '../assets/jpg/promo-zone_1.jpg'
import CardMedia from '@mui/material/CardMedia';
import Aside from "../components/Aside/Aside.tsx";

const Main = () => {
    return(
        <>
            <Box sx={{width: '1280px', height: '720px', backgroundImage: `url(${img})`}}>
                {/*<CardMedia*/}
                {/*    sx={{ width: '1280px', height: '720px' }}*/}
                {/*    image={img}*/}
                {/*/>*/}
                <Aside />
            </Box>
        </>
    )
}
export default Main;