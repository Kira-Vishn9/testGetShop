import React, { useRef, useState, useEffect } from 'react';
import video from '../../assets/video/volvo.mp4';
import CardCover from '@mui/joy/CardCover';
import Box from "@mui/material/Box";
import Banner from "../Banner/Banner.tsx";

const Video = () => {
    const videoRef = useRef(null);
    const [showBanner, setShowBanner] = useState(false);
    const [videoTime, setVideoTime] = useState( localStorage.getItem('videoTime')  > 0 ?  localStorage.getItem('videoTime') : 0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowBanner(true);
        }, 5000);
    }, []);


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', width: '100%'}}>
                <Box>
                    <CardCover sx={{ minWidth: '1280px', height: '720px', position: 'relative' }}>
                        <video
                            autoPlay={true}
                            ref={videoRef}
                            muted
                            onPlay={(e) => {
                                videoRef.current.currentTime = videoTime
                            }}
                        >
                            <source
                                src={video}
                                type="video/mp4"
                            />
                        </video>
                    </CardCover>
                </Box>
                {showBanner && <Banner  />}
            </Box>
        </>
    )
}

export default Video;
