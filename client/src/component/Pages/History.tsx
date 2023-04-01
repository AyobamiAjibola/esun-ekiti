import {
  Stack,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import axios from '../../interceptor/axios';
import { useQuery } from '@tanstack/react-query';
import { useLayoutEffect, useState } from 'react';
import Modal from './modal/Modal';
import { motion } from 'framer-motion';
import ErrorPage from '../helpers/ErrorPage';

const fetchHistory = async () => {
  return await axios.get('history/fetch_history')
}

export default function History () {
  const { status, data } = useQuery(['history'], fetchHistory, { networkMode: 'always' });
  const [selectedImg, setSelectedImg] = useState(null);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = process.env.REACT_APP_BG_COLOR as string
  })
  console.log(data)
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            height: 'auto',
            mt: 6,
            mb: 2
          }}
        >
          <Typography
            variant='h2'
            sx={{
              fontWeight: 600,
              color: `${process.env.REACT_APP_MAIN_COLOR as string}`
            }}
          >
            OUR STORY
          </Typography>
        </Box>
        {status === 'loading'
          ? (
              <Box
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CircularProgress />
              </Box>
            )
          : status === 'error'
            ? ( //eslint-disable-line
                <Box
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <ErrorPage />
                </Box>
              ) : (
                <Stack
                  direction='column'
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  sx={{
                    width: '80%',
                    backgroundColor: 'white',
                    boxShadow: 4,
                    p: 6
                  }}
                >
                  <Box
                    sx={{
                      width: '100%'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '18px',
                        wordSpacing: '5px',
                        lineHeight: 1.8,
                        color: '#585858',
                        textAlign: 'justify'
                      }}
                    >
                      { data?.data?.data?.info?.history }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%'
                    }}
                  >
                    <Stack
                      direction={{ xs: 'column', md: 'row' }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: { xs: '10px', sm: '10px', lg: '40px', md: '40px' },
                        marginBottom: '40px'
                      }}
                    >
                      {data?.data?.data?.info?.image?.map((value: any, index: any) => {
                        return <Box
                          component={ motion.div }
                          whileHover={{ opacity: 0.5 }}
                          sx={{
                            width: { md: '50%', xs: '100%' },
                            height: '15rem',
                            cursor: 'pointer'
                          }}
                          key={index}
                          onClick={() => setSelectedImg(value)}
                        >
                          <img
                            src={ process.env.REACT_APP_IMG_URL + value} //eslint-disable-line
                            crossOrigin="anonymous"
                            alt='esun-history'
                            style={{
                              width: "100%",
                              height: '100%',
                              objectFit: "fill"
                            }}
                          />
                        </Box>
                      })}
                      { selectedImg !== null && <Modal selectedImg={ selectedImg } setSelectedImg={ setSelectedImg } /> }
                    </Stack>
                  </Box>
                </Stack>
              )
        }
      </Box>
    </>
  )
}
