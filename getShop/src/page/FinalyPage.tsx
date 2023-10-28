import Box from '@mui/material/Box'
import img from '../assets/jpg/promo-zone_1.jpg'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const FinalyPage = () => {
  const navigate = useNavigate()

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      navigate('/')
    }
  }
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 10000)
    document.addEventListener('keydown', handleKeyPress)
  }, [])
  return (
    <>
      <Box
        sx={{
          widht: '100%',
          height: '100%',
          minWidth: '1280px',
          minHeight: '720px',
          backgroundImage: `url(${img})`,
          position: 'relative'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '720px'
          }}
        >
          <Box
            sx={{
              background: '#86D3F4',
              width: '284px',
              height: '100%',
              textAlign: '-webkit-center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                color: 'black',
                fontSize: '32px',
                width: '284px',
                height: '76px',
                lineHeight: '37.5px',
                fontWeight: 900,
                letterSpacing: '-0.6px',
                wrodSpacing: '1px'
              }}
            >
              ЗАЯВКА ПРИНЯТА
            </Typography>
            <Typography
              sx={{
                color: 'black',
                fontSize: '14px',
                width: '290px',
                height: '32px',
                lineHeight: '16.41px',
                fontWeight: 400,
                letterSpacing: '-0.6px',
                wrodSpacing: '1px'
              }}
            >
              Держите телефон под рукой.
              <br /> Скоро с Вами свяжется наш менеджер.
            </Typography>
            <Button
              sx={{
                display: 'flex',
                width: '88px',
                position: 'absolute',
                backgroundColor: 'black',
                top: '20px',
                right: '20px',
                cursor: 'pointer',
                height: '52px',
                justifyContent: 'center',
                color: 'white',
                padding: '10px',
                fontSize: '20px',
                textAlign: 'center',
                border: '1px solid black',
                borderRadius: '0',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white'
                }
              }}
              onClick={() => {
                navigate('/')
              }}
            >
              X
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default FinalyPage
