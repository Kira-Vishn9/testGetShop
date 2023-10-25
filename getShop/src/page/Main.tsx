import Box from "@mui/material/Box";
import img from '../assets/jpg/promo-zone_1.jpg'
import Aside from "../components/Aside/Aside.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            // navigate('/')
        },10000)
    },[])
    return(
        <>
            <Box sx={{widht: '100%', height: '100%', minWidth: '1280px', minHeight: '720px', backgroundImage: `url(${img})`, position: 'relative'}}>
                <Aside />
            </Box>
        </>
    )
}
export default Main;