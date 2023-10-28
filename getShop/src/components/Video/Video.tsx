import { useEffect, useRef, useState } from 'react'
import video from '../../assets/video/volvo.mp4'
import CardCover from '@mui/joy/CardCover'
import Box from '@mui/material/Box'
import Banner from '../Banner/Banner.tsx'

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [videoTime, setVideoTime] = useState(0)

  useEffect(() => {
    const storedVideoTime = localStorage.getItem('videoTime')
    if (storedVideoTime !== null) {
      const parsedTime = parseFloat(storedVideoTime)
      if (!isNaN(parsedTime) && parsedTime <= 73) {
        setVideoTime(parsedTime)
      } else {
        setVideoTime(0)
        localStorage.setItem('videoTime', '0')
      }
    }

    setTimeout(() => {
      setShowBanner(true)
    }, 5000)
  }, [])

  const onSave = () => {
    const currentTime = videoRef.current!.currentTime
    localStorage.setItem('videoTime', currentTime.toString())
  }

  const handleVideoEnd = () => {
    localStorage.setItem('videoTime', '0')
    setVideoTime(0)
    videoRef.current!.currentTime = 0
    videoRef.current!.play()
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          width: '100%'
        }}
      >
        <Box>
          <CardCover
            sx={{ minWidth: '1280px', height: '720px', position: 'relative' }}
          >
            <video
              autoPlay={true}
              ref={videoRef}
              muted
              onPlay={() => {
                videoRef.current!.currentTime = videoTime
              }}
              onEnded={handleVideoEnd}
            >
              <source src={video} type={'video/mp4'} />
            </video>
          </CardCover>
        </Box>
        {showBanner && <Banner onSave={onSave} />}
      </Box>
    </>
  )
}

export default Video
