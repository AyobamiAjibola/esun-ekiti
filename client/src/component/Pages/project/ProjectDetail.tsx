import React, { useState, useLayoutEffect } from 'react';
import {
  Stack,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { makeStyles } from "@material-ui/core";
import Modal from '../modal/Modal';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import axios from '../../../interceptor/axios';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../../helpers/ErrorPage';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'fill'
  }
}));

export default function ProjectDetail () {
  const { id } = useParams()
  const classes = useStyles();
  const [selectedImg, setSelectedImg] = useState(null);

  const { status, data: projectData } = useQuery(['project'], async () => {
    return await axios.get(`project/curr_project/${id}`) //eslint-disable-line
  }, { networkMode: 'always' })

  useLayoutEffect(() => {
    document.body.style.backgroundColor = process.env.REACT_APP_BG_COLOR as string
  });

  return (
    <>
      <Stack mt={9}
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
                  <ErrorPage/>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: { md: '80%', xs: '100%' },
                    height: 'auto',
                    boxShadow: 4,
                    backgroundColor: 'white',
                    flexDirection: 'column'
                  }}
                >
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
                    { projectData?.data?.data?.singleProject?.image?.map((images: any, index: any) => (
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
                        onClick={() => setSelectedImg(images)}
                      >
                        <img
                          src={ process.env.REACT_APP_IMG_URL + images } //eslint-disable-line
                          crossOrigin="anonymous"
                          alt='image'
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'fill'
                          }}
                          className={ classes.img }
                        />
                      </Box>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      width: '80%',
                      height: 'auto',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      paddingBottom: '5rem'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '25px',
                        fontWeight: 600,
                        mb: 4,
                        mt: 4,
                        textAlign: 'center',
                        color: `${process.env.REACT_APP_MAIN_COLOR as string}`
                      }}
                      >
                        { projectData?.data?.data?.singleProject?.project.toUpperCase() }
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
                      { projectData?.data?.data?.singleProject?.detail }
                    </Typography>
                  </Box>
                </Box>
              )
        }
        { selectedImg !== null && <Modal selectedImg={ selectedImg } setSelectedImg={ setSelectedImg } /> }
      </Stack>
    </>
  )
}
