import { useRef, useState, useEffect } from 'react';
import video from '../../assets/video/volvo.mp4';
import CardCover from '@mui/joy/CardCover';
import Box from "@mui/material/Box";
import Banner from "../Banner/Banner.tsx";
const Video = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [videoTime] = useState(localStorage.getItem('videoTime')  ? localStorage.getItem('videoTime') : 0);

    useEffect(() => {
        setTimeout(() => {
            setShowBanner(true);
        }, 5000);
    }, []);

    const onSave = () => {
        const currentTime = videoRef.current!.currentTime;
        localStorage.setItem('videoTime', currentTime.toString());
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
                            onPlay={() => {
                                videoRef.current!.currentTime = Number(videoTime);
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
