import React, { Fragment, useLayoutEffect } from 'react';
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

const fetchNews = async (pageParam: number) => {
  const res = await axios.get(`news/fetch_news_active?page=${pageParam}&size=5`)
  return res?.data?.data
}

export default function News () {
  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(['news'],
    ({ pageParam = 0 }) => fetchNews(pageParam), //eslint-disable-line
    {
      networkMode: 'always',
      getNextPageParam: (_lastPage, pages) => {
        console.log(pages.length)
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
      <Box
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
            <>
            <Typography
              sx={{
                fontWeight: 600, fontSize: {xs: '1.5rem', md: '3rem'},
                color: process.env.REACT_APP_MAIN_COLOR as string
              }}
            >
              Recent News
            </Typography>
            <RssFeed
              sx={{
                color: process.env.REACT_APP_HOVER_COLOR as string,
                mb: '5px',
                fontSize: {md: '3rem', xs: '1.5rem'}
              }}
            />
            </>
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
                    <ErrorPage />
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
                              pr: 2,
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
                                src={ process.env.REACT_APP_IMG_URL + value?.image } //eslint-disable-line
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
                                { value.title }
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
                                to={`/news/${value.id}`} //eslint-disable-line
                              >
                                { value.title }
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
                                { value?.news }
                              </Typography>}
                              <Box
                                sx={{
                                  display: {md: 'none', xs: 'flex'},
                                  justifyContent: 'right',
                                  alignItems: 'flex-end',
                                  mt: {sm: 4, xs: 0}
                                }}
                              >
                                <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>posted on: { value.createdAt }</Typography>
                              </Box>
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
                                      textDecorationLine: 'underline',
                                      color: `${process.env.REACT_APP_HOVER_COLOR as string}`
                                    },
                                    color: `${process.env.REACT_APP_MAIN_COLOR as string}`,
                                    fontWeight: 500
                                  }}
                                  component={Link}
                                  to={`/news/${value.id}`} //eslint-disable-line
                                >
                                    [ ...Continue reading ]
                                </Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>posted on: { value.createdAt }</Typography>
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
