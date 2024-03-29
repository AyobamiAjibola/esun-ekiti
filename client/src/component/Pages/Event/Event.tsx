import React, { useLayoutEffect, Fragment } from 'react';
import { RssFeed } from '@mui/icons-material';
import {
  Box,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import axios from '../../../interceptor/axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ErrorPage from '../../helpers/ErrorPage';
import InfinitScrollBtn from '../../helpers/InfinitScrollBtn';

const fetchEvent = async (pageParam: number) => {
  const res = await axios.get(`event/fetch_event_client?page=${pageParam}&size=5`)
  return res?.data?.data
}

export default function Event () {
  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(['event'],
    ({ pageParam = 0 }) => fetchEvent(pageParam), //eslint-disable-line
    {
      networkMode: 'always',
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < pages[0].res1.totalPages) {
          return pages.length + 1 - 1
        } else {
          return undefined
        }
      }
    }
  );

  useLayoutEffect(() => {
    document.body.style.backgroundColor = process.env.REACT_APP_BG_COLOR as string
  });

  return (
    <>
      <Box mt={9}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            width: '80%',
            height: 'auto',
            p: 2,
            m: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'left',
              width: '90%',
              margin: '30px 0 0px',
              height: '5rem'
            }}
          >
            <Typography
              variant='h3'
              sx={{
                color: process.env.REACT_APP_MAIN_COLOR as string,
                fontWeight: 600
              }}
            >
              Events
            </Typography>
          </Box>
          {status === 'loading'
            ? (
                <Box
                  sx={{
                    width: '90%',
                    height: '15rem',
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
                      width: '90%',
                      height: '15rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <ErrorPage/>
                  </Box>
                ) : (
                  <>
                    {data?.pages?.map((page: any, index: number) => (
                      <Fragment key={ index }>
                        {page?.res2?.map((value: any) => { //eslint-disable-line
                          return <Box
                            sx={{
                              width: '90%',
                              height: {md: '12rem', xs: '18rem'},
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: {md: 'row', xs: 'column'},
                              margin: '0 0 20px',
                              backgroundColor: 'white',
                              boxShadow: 2,
                              pr: {md: 2, xs : 0},
                              borderRadius: '5px',
                              borderBottom: `4px solid ${process.env.REACT_APP_MAIN_COLOR as string}`
                            }}
                            key={ value.id }
                          >
                            <Box
                              sx={{
                                width: {md: '30%', xs: '100%'},
                                height: {md: '100%', xs: '70%'}
                              }}
                            >
                              <img
                                src={ process.env.REACT_APP_IMG_URL + value.image } //eslint-disable-line
                                crossOrigin="anonymous"
                                alt='news'
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: "fill"
                                }}
                              />
                            </Box>
                            <Box
                              sx={{
                                width: {md: '70%', xs: '100%'},
                                height: {md: '100%', xs: '30%'},
                                paddingLeft: {md: '25px', xs: '0px'},
                                ml: {md: '0px', xs: '10px'}
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: '20px',
                                  fontWeight: 600,
                                  margin: '8px 0',
                                  display: { md: 'block', xs: 'none' },
                                  color: `${process.env.REACT_APP_MAIN_COLOR as string}`
                                }}
                              >
                                { value.name }
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '18px',
                                  fontWeight: 600,
                                  margin: '8px 0',
                                  textAlign: 'center',
                                  display: { md: 'none', xs: 'block' },
                                  color: `${process.env.REACT_APP_MAIN_COLOR as string}`,
                                  '&:hover': {
                                    color: '#E59A59',
                                    textDecorationLine: 'underline'
                                  },
                                  textDecoration: 'none'
                                }}
                                component={Link}
                                to={`/event/${value.name.toLowerCase()}`} //eslint-disable-line
                              >
                                { value.name }
                              </Typography>
                              {document.documentElement.clientWidth > 769 && <Typography
                                sx={{
                                  fontSize: '15px',
                                  wordSpacing: '5px',
                                  lineHeight: 1.5,
                                  color: '#585858',
                                  margin: '8px 0'
                                }}
                              >
                                { value.detail }
                              </Typography>}
                              {document.documentElement.clientWidth > 769 && <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'flex-end',
                                  ml: {md: '0px', xs: '10px'}
                                }}
                              >
                                <Typography
                                  sx={{
                                    textDecoration: 'none',
                                    '&:hover': {
                                      color: `${process.env.REACT_APP_HOVER_COLOR as string}`,
                                      textDecorationLine: 'underline'
                                    },
                                    color: `${process.env.REACT_APP_MAIN_COLOR as string}`,
                                    fontWeight: 500
                                  }}
                                  component={Link}
                                  to={`/event/${value.name.toLowerCase()}`} //eslint-disable-line
                                >
                                  [ ...Continue reading ]
                                </Typography>
                              </Box>}
                            </Box>
                          </Box>
                        })}
                      </Fragment>
                    ))}
                  </>
                )}
            <Box
              sx={{
                display: 'flex',
                width: '90%',
                height: 'auto',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 3
              }}
            >
              <InfinitScrollBtn
                fetchNextPage = { fetchNextPage }
                hasNextPage = { hasNextPage }
                isFetchingNextPage = { isFetchingNextPage }
                status = { status }
                isFetching = { isFetching }
              />
            </Box>
        </Box>
      </Box>
    </>
  )
}
