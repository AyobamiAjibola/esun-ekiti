import React, { useLayoutEffect, Fragment } from 'react';
import {
  Stack,
  Box,
  Typography,
  CircularProgress,
  Button
} from '@mui/material';
import axios from '../../interceptor/axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import ErrorPage from '../helpers/ErrorPage';

const fetchOba = async () => {
  return await axios.get('council/fetch_oba')
}

const fetchPastOba = async (pageParam: number) => {
  const res = await axios.get(`council/fetch_past_oba?page=${pageParam}&size=2`)
  return res.data;
}

export default function Oba () {
  const {
    isLoading,
    data,
    isError,
    error
  } = useQuery(['oba'], fetchOba, { networkMode: 'always' });

  const {
    status,
    data: pastObaData,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(['pastOba'],
    ({ pageParam = 0 }) => fetchPastOba(pageParam), //eslint-disable-line
    {
      networkMode: 'always',
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < pages[0]?.result?.totalPages) {
          return pages.length + 1 - 1
        } else {
          return undefined
        }
      }
    }
  )

  return (
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
      {isLoading
        ? (
            <Box
              sx={{
                width: '100%',
                height: '10rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress />
            </Box>
          )
        : isError
          ? ( //eslint-disable-line
              <Box
                sx={{
                  width: '100%',
                  height: '10rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <ErrorPage />
              </Box>
            ) : (
              <Stack
                direction={{ sm: 'row', xs: 'column' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{
                  width: '90%',
                  height: '45rem',
                  marginTop: '20px',
                  mb: 2,
                  backgroundColor: process.env.REACT_APP_BG_COLOR_2 as string,
                  borderRadius: '5px',
                  boxShadow: 4,
                  pt: 4,
                  px: 4,
                  pb: { sm: '0rem', xs: '2rem' }
                }}
              >
                <Box
                  sx={{
                    width: { lg: '40%', sm: '50%', xs: '80%' },
                    height: { lg: '40rem', sm: '28rem', xs: '22rem' },
                    marginBottom: { sm: '-20px', xs: '0px' }
                  }}
                >
                  <img
                    src={ process.env.REACT_APP_IMG_URL + data?.data?.result?.info?.image } //eslint-disable-line
                    crossOrigin="anonymous"
                    style={{
                      width: "100%",
                      height: '75%',
                      objectFit: "fill"
                    }}
                  />
                  <Box
                    sx={{
                      width: '100%',
                      marginTop: '10px'
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: '#712E1E',
                        fontSize: { md: '25px', sm: '18px', xs: '13px' },
                        textAlign: 'center'
                      }}
                    >
                      { data?.data?.result?.info?.fullName.toUpperCase() }
                    </Typography>
                    <Typography
                      sx={{
                        color: '#585858',
                        textAlign: 'center',
                        fontSize: { sm: '20px', xs: '15px' }
                      }}
                    >
                      { data?.data?.result?.info?.from } - { data?.data?.result?.info?.to.toUpperCase() }
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: { lg: '60%', sm: '50%', xs: '100%' },
                    height: { lg: '40rem', sm: '28rem', xs: '22rem' },
                    pt: 6
                  }}
                >
                  <Typography variant='h4'
                    sx={{
                      fontWeight: 600,
                      color: '#712E1E'
                    }}
                  >
                    Biography
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      wordSpacing: '5px',
                      lineHeight: 1.5,
                      color: '#585858',
                      textAlign: 'justify',
                      mt: 2
                    }}
                  >
                    {data?.data?.result?.info?.bio}
                  </Typography>
                </Box>
              </Stack>
            )
      }
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          backgroundColor: '#712E1E',
          padding: '20px 20px',
          borderRadius: '5px',
          boxShadow: '0px 0px 15px -8px black',
          marginTop: { lg: '0rem', md: '-10rem', sm: '-10rem', xs: '2rem' }
        }}
      >
        <Typography
          variant='h4'
          sx={{
            fontWeight: 600,
            color: '#fff',
            marginBottom: '5px'
          }}
        >
          PAST OBAS
        </Typography>
        {status === 'loading'
          ? <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography>Loading...</Typography>
            </Box>
          : pastObaData?.pages?.map((page: any, idx: number) => (
              <Fragment key={ idx }>
                {page?.result?.result?.map((value: any) => {
                  return <Box key={value.id}>
                    <ul style={{ color: '#fff' }}>
                      <li
                        style={{
                          fontSize: '20px',
                          fontWeight: 500
                        }}
                      >
                        { value.fullName.toUpperCase() }
                      </li>
                      <Typography
                        variant='body2'
                      >
                        { value.from } - { value.to }
                      </Typography>
                      <hr style={{ width: '10%' }}/>
                    </ul>
                  </Box>
                })}
              </Fragment>
          ))
        }
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: 'auto',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button
              onClick={ () => fetchNextPage() } //eslint-disable-line
              disabled={ !hasNextPage || isFetchingNextPage } //eslint-disable-line
              sx={{
                color: '#712E1E',
                backgroundColor: 'white',
                fontWeight: 600,
                boxShadow: 5,
                '&:hover': {
                  color: 'white',
                  border: '0.5px solid white'
                }
              }}
            >
              { isFetchingNextPage //eslint-disable-line
                ? 'Loading...'
                : hasNextPage //eslint-disable-line
                  ? 'Load More'
                  : status === 'error' || status === 'loading'
                    ? ''
                    : ''
              }
            </Button>
            <Box>
              { isFetching && !isFetchingNextPage //eslint-disable-line
                ? status === 'loading'
                  ? ''
                  : <Typography
                      sx={{
                        color: 'white'
                      }}
                    >Updating...</Typography>
                : null }
            </Box>
        </Box>
      </Box>
    </Box>
  )
}
