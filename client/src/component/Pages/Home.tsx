import React, { useLayoutEffect } from 'react';
import {
  Stack,
  Box,
  Divider,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { makeStyles } from "@material-ui/core";
import Carousel from '../helpers/Carousel';
import { Link } from 'react-router-dom';
import axios from '../../interceptor/axios';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../helpers/ErrorPage';
import '../Navbar/style.css';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  carousel: {
    width: "100%",
    backgroundColor: "#712E1E",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    // borderBottom: '8px solid #712E1E'
  },
  rouse: {
    height: '100%',
    zIndex: 1
  },
  btn: {
    backgroundColor: '#fff',
    color: '#521414',
    padding: '10px 0px',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#521414',
      color: '#fff',
      border: '#fff solid 2px'
    }
  }
}));

const fetchHistory = async () => {
  return await axios.get('history/fetch_history')
}

const fetchNews = async () => {
  return await axios.get('news/fetch_news_limit')
}

const fetchProject = async () => {
  return await axios.get('project/fetch_project_limit')
}

export default function Home () {
  const classes = useStyles();

  const {
    data,
    status
  } = useQuery(['history'], fetchHistory, { networkMode: 'always' });

  const {
    data: newsData,
    status: newsStatus
  } = useQuery(['news'], fetchNews, { networkMode: 'always' });

  const {
    data: projectData,
    status: projectStatus
  } = useQuery(['project'], fetchProject, { networkMode: 'always' });

  useLayoutEffect(() => {
    document.body.style.backgroundColor = process.env.REACT_APP_BG_COLOR as string
  })

  return (
    <Stack mt={9}>
      <Box className={classes.carousel}
        sx={{
          height: { lg: '550px', sm: '400px', xs: '300px' },
          width: '100%'
        }}
      >
        <Box className={classes.rouse}
          sx={{
            width: {sm: "75%", xs: "100%"}
          }}
        >
          <Carousel />
        </Box>
      </Box>
      <div>
        <Stack
          direction={{ lg: "row", xs: "column" }}
          divider={ <Divider orientation="horizontal" flexItem />}
          spacing={1}
        >
          <Box
            sx={{
              width: { lg: "60%", sm: "100%" }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                height: 'auto',
                paddingLeft: '2em',
                paddingRight: { lg: '1.5em', sm: '2em', xs: '2em' },
                paddingBottom: '0.5em',
                backgroundColor: 'white',
                boxShadow: 4
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  pt: 2
                }}
              >
                <Typography
                    sx={{
                      fontWeight: '800', fontSize: {xs: '2rem', md: '3rem'},
                      paddingBottom: '35px',
                      color: '#712E1E'
                    }}
                  >
                    HISTORY OF ESUN EKITI
                </Typography>
              </Box>
              {status === 'loading'
                ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: { md: '30rem', sx: '15rem' }
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  )
                : status === 'error'
                  ? ( // eslint-disable-line
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          height: { md: '30rem', sx: '15rem' }
                        }}
                      >
                        <ErrorPage />
                      </Box>
                    ) : (
                      <>
                        <Typography variant='body1'
                          sx={{
                            fontSize: '17px',
                            wordSpacing: '5px',
                            lineHeight: 1.8,
                            color: '#585858',
                            textAlign: 'justify'
                          }}
                        >
                          { data?.data?.data?.info2 }...
                          <Typography
                            component={Link}
                            to='/history'
                            sx={{
                              color: '#712E1E',
                              textDecoration: 'none',
                              fontWeight: 600,
                              '&:hover': {
                                color: '#E59A59',
                                textDecorationLine: 'underline'
                              }
                            }}
                          >
                            [ Continue reading ]
                          </Typography>
                        </Typography>
                        <Box
                          sx={{
                            width: '100%'
                          }}
                        >
                          <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: { xs: '10px', sm: '10px', lg: '50px', md: '50px' }
                            }}
                          >
                            <Box
                              sx={{
                                width: { sm: '50%', xs: '100%' },
                                height: '20rem'
                              }}
                            >
                            {data?.data?.data?.info?.image && <img //eslint-disable-line
                              src={ process.env.REACT_APP_IMG_URL + data?.data?.data?.info?.image[0] } //eslint-disable-line
                              crossOrigin="anonymous"
                              alt='esun-news'
                              style={{
                                width: "100%",
                                height: '100%',
                                objectFit: "fill",
                                borderRadius: '20px'
                              }}
                            />}
                            </Box>
                            <Box
                              sx={{
                                width: { sm: '50%', xs: '100%' },
                                height: '20rem'
                              }}
                            >
                            {data?.data?.data?.info?.image && <img //eslint-disable-line
                              src={ process.env.REACT_APP_IMG_URL + data?.data?.data?.info?.image[1] } //eslint-disable-line
                              crossOrigin="anonymous"
                              alt='esun-news'
                              style={{
                                width: "100%",
                                height: '100%',
                                objectFit: "fill",
                                borderRadius: '20px'
                              }}
                            />}
                            </Box>
                          </Stack>
                        </Box>
                      </>
                    )
              }
            </Box>
          </Box>
          <Box
            sx={{
              width: { lg: "40%", sm: "100%" }
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: 'auto',
                marginLeft: '5px',
                paddingLeft: { lg: '0.5em', sm: '2em', xs: '2em' },
                paddingRight: '2em'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  pt: 2
                }}
              >
                <Typography
                  variant='h3'
                  sx={{
                    fontWeight: '800',
                    paddingBottom: '35px',
                    color: '#712E1E'
                  }}
                >
                  News
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'left',
                  width: '100%',
                  flexDirection: 'column'
                }}
              >
                {newsStatus === 'loading'
                  ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          height: { md: '30rem', sx: '15rem' }
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    )
                  : newsStatus === 'error'
                    ? ( //eslint-disable-line
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: { md: '30rem', sx: '15rem' }
                          }}
                        >
                          <Typography mb={3}>Something went wrong</Typography>
                          <Typography>Refresh page</Typography>
                        </Box>
                      ) : (
                        <>
                          {newsData?.data?.data?.result?.array.map((val: any) => {
                            return <Box key={ val.id }>
                            <Box
                              sx={{
                                width: '100%',
                                height: '13em',
                                marginBottom: '1em'
                              }}
                            >
                              <img
                                src={ process.env.REACT_APP_IMG_URL + val.image[0] } //eslint-disable-line
                                crossOrigin="anonymous"
                                alt='esun-news'
                                style={{
                                  width: "100%",
                                  height: '100%',
                                  objectFit: "fill"
                                }}
                              />
                            </Box>
                            <Typography variant='body2'
                              sx={{
                                fontSize: '17px',
                                lineHeight: 1.5,
                                textAlign: 'justify',
                                color: '#343434'
                              }}
                            >
                              { val.news }...
                              <Typography
                                component={Link}
                                to={`/news/${val.id}`} //eslint-disable-line
                                sx={{
                                  color: '#712E1E',
                                  textDecoration: 'none',
                                  fontWeight: 600,
                                  '&:hover': {
                                    color: `${process.env.REACT_APP_HOVER_COLOR as string}`,
                                    textDecorationLine: 'underline'
                                  }
                                }}
                              >[ Continue reading ] </Typography>
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'right',
                                marginTop: '10px'
                              }}
                            >
                              <Typography variant='caption'
                                sx={{
                                  alignText: 'right',
                                  fontWeight: '600',
                                  color: '#262728'
                                }}
                              >
                                posted on: { moment(val.createdAt).format('LL') }
                              </Typography>
                            </Box>
                            <hr />
                          </Box>
                          })}
                        </>
                      )
                }
              </Box>
            </Box>
          </Box>
        </Stack>
      </div>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#712E1E',
          paddingTop: '10px'
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px 0px'
          }}
        >
          <Typography variant='h3' sx={{ fontWeight: 600, color: '#fff', height: '100%' }}>Project</Typography>
        </Box>
        <Box
          sx={{
            width: '90%',
            height: '100%',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { lg: 'row', md: 'column', sm: 'column', xs: 'column' },
            gap: 8
          }}
        >
          {projectStatus === 'loading'
            ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: 'auto'
                  }}
                >
                  <CircularProgress />
                </Box>
              )
            : projectStatus === 'error'
              ? ( //eslint-disable-line
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: 'auto',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography mb={3}>Something went wrong</Typography>
                    <Typography>Refresh page</Typography>
                  </Box>
                ) : (
                  <>
                    {projectData?.data?.data?.result?.array.map((val: any) => {
                      return <Box
                          sx={{
                            width: { lg: '20%', md: '50%', xs: '60%' },
                            height: '20rem',
                            margin: '20px 5px 20px 0px',
                            borderLeft: '#fff solid .5px',
                            borderRight: '#fff solid .5px',
                            padding: '0px 5px'
                          }}
                          key={ val.id }
                        >
                          <Box
                            sx={{
                              width: '100%',
                              height: '60%'
                            }}
                          >
                            <img
                              src={process.env.REACT_APP_IMG_URL + val.image[0]} //eslint-disable-line
                              crossOrigin="anonymous"
                              alt='esun-news'
                              style={{
                                width: "100%",
                                height: '100%',
                                objectFit: "fill"
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: '100%',
                              height: '10%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: '600',
                                color: '#fff',
                                fontSize: '16px'
                              }}
                            >
                              { val.project }
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: '100%',
                              height: '30%'
                            }}
                          >
                            <Typography
                              variant='body2'
                              sx={{
                                fontWeight: 400,
                                color: '#fff',
                                textAlign: 'justify'
                              }}
                            >
                              { val.detail }
                            </Typography>
                          </Box>
                        </Box>
                    })}
                  </>
                )
          }
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: '20px'
          }}
        >
          <Link to='/project' style={{ textDecoration: 'none' }}>
            <Button
              sx={{
                backgroundColor: '#fff',
                color: `${process.env.REACT_APP_MAIN_COLOR as string}`,
                padding: '10px 10px',
                marginBottom: '20px',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: `${process.env.REACT_APP_MAIN_COLOR as string}`,
                  color: '#fff',
                  border: '#fff solid 2px'
                }
              }}
            >
              view more...
            </Button>
          </Link>
        </Box>
      </Box>
    </Stack>
  )
}
