import React, { useRef, useState, useEffect } from 'react';
import video from '../../assets/video/volvo.mp4';
import CardCover from '@mui/joy/CardCover';
import Box from "@mui/material/Box";
import Banner from "../Banner/Banner.tsx";
const Video = () => {
    const videoRef = useRef(null);
    const [showBanner, setShowBanner] = useState(false);
    const [videoTime, setVideoTime] = useState(localStorage.getItem('videoTime')  ? localStorage.getItem('videoTime') : 0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowBanner(true);
        }, 5000);
    }, []);

    const onSave = () => {
        const currentTime = videoRef.current.currentTime; // Получаем текущее время видео
        console.log(currentTime); // Выводим текущее время видео в консоль

        // Вы можете выполнить другие действия с currentTime, если необходимо

        // Например, сохранить текущее время в localStorage
        localStorage.setItem('videoTime', currentTime);
    }

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
                                videoRef.current.currentTime = videoTime;
                            }}
                        >
                            <source
                                src={video}
                                type="video/mp4"
                            />
                        </video>
                    </CardCover>
                </Box>
                {showBanner && <Banner onSave={onSave} />}
            </Box>
        </>
    )
}

export default Video
