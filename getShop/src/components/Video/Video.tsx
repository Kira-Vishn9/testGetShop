import React, { useRef, useState, useEffect } from 'react';
import video from '../../assets/video/volvo.mp4';
import CardCover from '@mui/joy/CardCover';
import Box from "@mui/material/Box";
import Banner from "../Banner/Banner.tsx";

const Video = () => {
    const videoRef = useRef(null);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowBanner(true);
        }, 5000); // Показать баннер после 5 секунд

        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                    <CardCover sx={{ width: '100%', height: '100vh' }}>
                        <video
                            autoPlay
                            ref={videoRef}
                        >
                            <source
                                src={video}
                                type="video/mp4"
                            />
                        </video>
                    </CardCover>
                </Box>
                {showBanner && <Banner />}
            </Box>
        </>
    )
}

export default Video;
