import React, { useLayoutEffect, useState, Fragment } from 'react';
import {
  Divider,
  Box,
  Typography,
  CircularProgress,
  Button
} from '@mui/material';
import axios from '../../interceptor/axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Modal from './modal/Modal';
import { motion } from 'framer-motion';
import ErrorPage from '../helpers/ErrorPage';
import InfinitScrollBtn from '../helpers/InfinitScrollBtn';

const fetchOlori = async () => {
  return await axios.get('council/fetch_olori')
}

const fetchChiefs = async (pageParam: number) => { //eslint-disable-line
  const res = await axios.get(`council/fetch_chief?page=${pageParam}&size=5`) //eslint-disable-line
  return res.data;
}

interface Props {
  setSelectedImg: any
}

export default function Chief () {
  const [selectedImg, setSelectedImg] = useState(null);
  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(['chiefs'],
    ({ pageParam = 0 }) => fetchChiefs(pageParam), //eslint-disable-line
    {
      networkMode: 'always',
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < pages[0]?.result.totalPages) {
          return pages.length + 1 - 1
        } else {
          return undefined
        }
      }
    }
  );

  return (
     <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          flexWrap: 'wrap'
        }}
      >
        <Olori
          setSelectedImg={ setSelectedImg }
        />
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
                <Typography>Loading...</Typography>
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
                  {data?.pages?.map((page: any, idx: number) => (
                    <Fragment key={ idx }>
                      {page?.result?.result?.map((value: any) => {
                        return <Box
                          sx={{
                            width: { md: '30%', sm: '40%', xs: '100%' },
                            height: '20rem',
                            marginTop: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: { sm: 'row', xs: 'column' },
                            gap: { sm: 2, xs: 0 },
                            borderBottom: `${process.env.REACT_APP_MAIN_COLOR as string} solid 4px`,
                            overflow: 'hidden',
                            borderRadius: '5px',
                            backgroundColor: process.env.REACT_APP_BG_COLOR as string,
                            boxShadow: 4
                          }}
                          key={value.id}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'column'
                            }}
                          >
                            <Box
                              component={ motion.div }
                              whileHover={{ opacity: 0.5 }}
                              sx={{
                                width: '100%',
                                height: '80%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: -2,
                                cursor: 'pointer'
                              }}
                              onClick={() => setSelectedImg(value?.image)}
                            >
                              {value?.image //eslint-disable-line
                                ? <img
                                    src={ process.env.REACT_APP_IMG_URL + value?.image } //eslint-disable-line
                                    crossOrigin="anonymous"
                                    alt='esun-chiefs'
                                    style={{
                                      width: "100%",
                                      height: '100%',
                                      objectFit: "fill"
                                    }}
                                  />
                                : <img
                                    src='assets/no-image.png'
                                    crossOrigin="anonymous"
                                    alt='esun-chiefs'
                                    style={{
                                      width: "100%",
                                      height: '100%',
                                      objectFit: "fill"
                                    }}
                                  />
                              }
                            </Box>
                            <Box
                              sx={{
                                width: '80%',
                                height: '20%',
                                marginTop: { sm: '30px', xs: '40px' }
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  color: process.env.REACT_APP_MAIN_COLOR as string,
                                  fontSize: { lg: '18px', xs: '15px' },
                                  textAlign: 'center'
                                }}
                              >
                                { value?.fullName.toUpperCase() }
                              </Typography>
                              <Typography
                                sx={{
                                  color: '#585858',
                                  fontWeight: 400,
                                  fontSize: {
                                    lg: '16px', md: '13px', sm: '11px'
                                  },
                                  textAlign: 'center'
                                }}
                              >
                                {value?.title.toUpperCase()}
                              </Typography>
                            </Box>
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
        { selectedImg !== null && <Modal selectedImg={ selectedImg } setSelectedImg={ setSelectedImg } /> }
      </Box>
    </>
  )
}

function Olori ({ setSelectedImg }: Props) {
  const {
    isLoading: loadOlori,
    data: dataOlori
  } = useQuery(['olori'], fetchOlori, { networkMode: 'always' });

  return (
    <>
      {!loadOlori
        ? <Box
            sx={{
              width: { md: '30%', sm: '40%', xs: '100%' },
              height: '20rem',
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: { sm: 'row', xs: 'column' },
              gap: { sm: 2, xs: 0 },
              borderBottom: `${process.env.REACT_APP_MAIN_COLOR as string} solid 4px`,
              overflow: 'hidden',
              borderRadius: '5px',
              backgroundColor: `${process.env.REACT_APP_BG_COLOR as string}`,
              boxShadow: 4
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <Box
                component={ motion.div }
                whileHover={{ opacity: 0.5 }}
                sx={{
                  width: '100%',
                  height: '80%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onClick={() => setSelectedImg(dataOlori?.data?.result?.image)}
              >
                <img src={ process.env.REACT_APP_IMG_URL + dataOlori?.data?.result?.image } //eslint-disable-line
                  crossOrigin="anonymous"
                  alt='esun-olori'
                  style={{
                    width: "100%",
                    height: '100%',
                    objectFit: "fill",
                    cursor: "pointer"
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: '80%',
                  height: '20%',
                  marginTop: { sm: '10px', xs: '40px' }
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: process.env.REACT_APP_MAIN_COLOR as string,
                    fontSize: { lg: '18px', xs: '15px' },
                    textAlign: 'center'
                  }}
                >
                  { dataOlori?.data?.result?.fullName.toUpperCase() }
                </Typography>
                <Typography
                  sx={{
                    color: '#585858',
                    fontWeight: 400,
                    fontSize: {
                      lg: '16px', md: '13px', sm: '13px'
                    },
                    textAlign: 'center'
                  }}
                >
                  OLORI ELESUN
                </Typography>
              </Box>
            </Box>
          </Box>
        : <Box
            sx={{
              width: '90%',
              height: '33rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
      }
    </>
  )
}
