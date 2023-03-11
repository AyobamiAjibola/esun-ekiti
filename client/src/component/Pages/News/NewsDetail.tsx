import { useEffect, useState, useLayoutEffect } from 'react';
import {
  Stack,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { makeStyles } from "@material-ui/core";
import Modal from '../modal/Modal';
import { motion } from 'framer-motion';
import axios from '../../../interceptor/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ErrorPage from '../../helpers/ErrorPage';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'fill'
  }
}));

export default function NewsDetail () {
  const { id } = useParams();
  const classes = useStyles();
  const [selectedImg, setSelectedImg] = useState(null);

  const { status, data: newsData } = useQuery(['news'], async () => {
    return await axios.get(`news/curr_news/${id}`) //eslint-disable-line
  }, { networkMode: 'always' })

  useLayoutEffect(() => {
    document.body.style.backgroundColor = process.env.REACT_APP_BG_COLOR as string
  });

  return (
    <>
      <Stack
        direction='column'
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {status === 'loading'
          ? (
              <Box
                sx={{
                  width: { md: '70%', xs: '100%' },
                  height: '20rem',
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
                    width: { md: '70%', xs: '100%' },
                    height: '20rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <ErrorPage />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: { md: '70%', xs: '100%' },
                    height: 'auto',
                    boxShadow: 4,
                    backgroundColor: 'white',
                    flexDirection: 'column'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: { md: '25rem', xs: '20rem' }
                    }}
                  >
                    <img
                      src={ process.env.REACT_APP_IMG_URL + newsData?.data?.data?.singleNews?.image[0] } //eslint-disable-line
                      crossOrigin="anonymous"
                      className={ classes.img } alt='headImage'
                    />
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      pl: 5,
                      pr: 5
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '25px',
                        fontWeight: 600,
                        mb: 4,
                        mt: 4,
                        textAlign: 'center',
                        color: '#712E1E'
                      }}
                      >
                        { newsData?.data?.data?.singleNews?.title.toUpperCase() }
                      </Typography>
                    <Typography
                      sx={{
                        fontSize: '18px',
                        wordSpacing: '5px',
                        lineHeight: 1.5,
                        color: '#585858',
                        textAlign: 'justify',
                        mb: 3
                      }}
                    >
                      { newsData?.data?.data?.singleNews?.news }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: { lg: "100%", xs: "80%" },
                      height: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexWrap: 'wrap'
                    }}
                  >
                    { newsData?.data?.data?.singleNews?.image?.map((image: any, index: any) => (
                      <Box
                        component={ motion.div }
                        key={ index }
                        whileHover={{ opacity: 0.5 }}
                        sx={{
                          width: { lg: '10rem', xs: '5rem' },
                          height: { lg: '10rem', xs: '5rem' },
                          margin: { lg: '30px 10px', xs: '10px 10px' },
                          cursor: 'pointer',
                          borderRadius: '1rem',
                          border: `4px solid ${process.env.REACT_APP_MAIN_COLOR as string}`
                        }}
                        onClick={() => setSelectedImg(image)}
                      >
                        <img
                          src={ process.env.REACT_APP_IMG_URL + image } //eslint-disable-line
                          crossOrigin="anonymous"
                          alt='image'
                          className={ classes.img }
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'fill'
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                  { selectedImg !== null && <Modal selectedImg={ selectedImg } setSelectedImg={ setSelectedImg } /> }
                </Box>
              )
        }
      </Stack>
    </>
  )
}
