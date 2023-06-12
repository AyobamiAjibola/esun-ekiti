import React, { useState, useLayoutEffect, useEffect, Fragment } from 'react';
import {
  Stack,
  Box,
  Typography,
  CircularProgress,
  Avatar,
  IconButton,
  Button,
  TextField,
  Collapse
} from '@mui/material';
import { makeStyles } from "@material-ui/core";
import Modal from '../modal/Modal';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import axios from '../../../interceptor/axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import ErrorPage from '../../helpers/ErrorPage';
import { initials } from '../../helpers/Generic';
import capitalize from 'capitalize';
import moment from 'moment';
import { ChatBubble, Favorite, KeyboardArrowDown, KeyboardArrowUp, ThumbDownAlt, ThumbUpAlt } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import YouTubeVideo from '../../helpers/YoutubeVideo';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'fill'
  }
}));

const fetchComment = async (pageParam: number, identifier: string) => {
  const res = await axios.get(`comment/fetch/project/${identifier}?page=${pageParam}&size=3`)
  return res.data;
};

interface Props {
  replies: any,
  id: any,
  setUpdate: any,
  loadMore: any,
  handleToggleShowReply: any
}

interface Props_Comment {
  id: any,
  setUpdate: any
}

interface Props_Reply {
  id: any,
  setUpdate: any
}

interface Inputs {
  name: string
  comment: string
}

interface Inputs_Reply{
  name: string,
  reply: string
}

export default function ProjectDetail () {
  const { id } = useParams()
  const classes = useStyles();
  const [selectedImg, setSelectedImg] = useState(null);
  const [commentTotal, setCommentTotal] = useState<number>(0);
  const [update, setUpdate] = useState<boolean>(false);
  const [reply, setReply] = useState<any>(0)
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [liked, setLiked] = useState<any>(0);

  const { status, data: projectData } = useQuery(['project'], async () => {
    return await axios.get(`project/curr_project/${id}`) //eslint-disable-line
  }, { networkMode: 'always' })

  const handleReply = (index: any) => {
    setReply((prev: any) => {
      const updateActive = prev.map((_: any, idx: any) => idx  === index);
      return updateActive;
    });
  };

  useLayoutEffect(() => {
    document.body.style.backgroundColor = process.env.REACT_APP_BG_COLOR as string
  });

  const {
    status: comment_status,
    data: comments_data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch
  } = useInfiniteQuery(['comment'],
    //@ts-ignore
    ({ pageParam = 0, identifier = id}) => fetchComment(pageParam, identifier), //eslint-disable-line
    {
      networkMode: 'always',
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < pages[0]?.data?.comments?.totalPages) {
          return pages.length + 1 - 1
        } else {
          return undefined
        }
      }
    }
  )

  useEffect(() => {
    comments_data?.pages?.map((page: any) => {
      setCommentTotal(page?.data?.comments?.totalItems)
      setReply(Array(page?.data?.comments?.totalItems).fill(false));
      setLiked(Array(page?.data?.comments?.totalItems).fill(false));
    })
  }, [comments_data]);

  useEffect(() => {
    if(update){
      refetch()
    }
    setUpdate(false)
  }, [update]);

  const onSubmitLike = async (idx: number, commentId: number) => {
    //@ts-ignore
    const storedLikes = JSON.parse(sessionStorage.getItem('likes'));
    const targetIdx = storedLikes.find((id: any) => id === commentId);

    if (targetIdx) {
      console.log('already liked');
      setLiked((prev: any) => {
        const updateActive = prev.map((_: any, index: any) => index  === idx);
        return updateActive;
      });
      return;
    }
    storedLikes.push(commentId);
  
    try {
      const requestBody = {
        like: 1,
        commentId: sessionStorage.getItem('commentId')
      };
  
      await axios.put(`comment/project/like/${id}`, requestBody);
  
      setUpdate(true);
      sessionStorage.setItem('likes', JSON.stringify(storedLikes));
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (liked) {
      const timeout = setTimeout(() => {
        setLiked((prev: any) => prev.map(() => false));
      }, 2000);
  
      return () => clearTimeout(timeout);
    }
  }, [liked]);
  

  useEffect(() => {
    const array: [] = [];

    const checkLikeArray = sessionStorage.getItem('likes') 
    if(!checkLikeArray){
      sessionStorage.setItem('likes', JSON.stringify(array));
    }
    
  }, []);

  // const onSubmitDisLike = async () => {
  //   try {
  //     const requestBody = {
  //       dislike: 1,
  //       commentId: sessionStorage.getItem('commentId')
  //     };
      
  //     await axios.put(`comment/project/dislike/${id}`, requestBody);

  //     setUpdate(true)
  //   } catch (err: any) {
  //     console.log(err)
  //   }
  // };
  const handleToggleShowReply = () => {
    setLoadMore(() => {
      return !loadMore;
    })
  };

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
                    width: { md: '90%', xs: '100%' },
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
                          width: { lg: '15rem', xs: '5rem' },
                          height: { lg: '15rem', xs: '5rem' },
                          mt: 6, mx: 1,
                          // margin: { lg: '30px 10px', xs: '10px 10px' },
                          cursor: 'zoom-in',
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
                      width: '100%',
                      height: 'auto',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      px: 5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {md: '2.5rem', xs: '1.5rem'},
                        fontWeight: 600,
                        mt: 4,
                        textAlign: 'center',
                        color: '#712E1E'
                      }}
                    >
                      { projectData?.data?.data?.singleProject?.project.toUpperCase() }
                    </Typography>

                    <Box sx={{width: '60%', height: '0.2px', backgroundColor: '#CCCCCC', mt: 1, mb: 8}}/>

                    <Box>
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
                      <Box
                        sx={{
                          width: {lg: 600, md: 400, xs: 200},
                          height: 300,
                          float: 'left',
                          mr: 2, my: 2,
                          display: projectData?.data?.data?.singleProject?.videoLink ? 'block' : 'none'
                        }}
                      >
                        <YouTubeVideo
                          videoLink={projectData?.data?.data?.singleProject?.videoLink}
                          title={projectData?.data?.data?.singleProject?.videoTitle}
                          width='100%'
                          height= '300px'
                        />
                      </Box>
                      { projectData?.data?.data?.singleProject?.detail }
                      </Typography>
                    </Box>

                  </Box>

                  { selectedImg !== null && <Modal selectedImg={ selectedImg } setSelectedImg={ setSelectedImg } /> }
      
                  <Box sx={{width: '95%', height: '0.2px', backgroundColor: '#CCCCCC', mb:2}}/>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '90%',
                      px: 5
                    }}
                  >
                    <Typography sx={{fontWeight: 600, color: '#585858'}}>
                      {commentTotal} Comments
                    </Typography>
                    <New_Comment id={id} setUpdate={setUpdate}/>
                  </Box>

                  <Box sx={{width: '90%', height: '0.2px', backgroundColor: '#CCCCCC', mt: 4, mb: commentTotal === 0 ? 10 : 2}}/>
                  
                  {commentTotal !== 0 && <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '90%',
                      px: 5
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%', maxHeight: '30rem',
                        flexDirection: 'column'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column', gap: 2
                        }}
                      >
                        {comment_status === 'loading'
                          ? <Box
                              sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              <Typography>Loading comments...</Typography>
                            </Box>
                          : comments_data?.pages?.map((page: any, idx: number) => (
                            <Fragment key={idx}>
                              {page?.data?.comments?.result?.map((value: any, idx: number) => {
                                return <Box key={value.id}
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column', gap: 2
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'row', gap: 2
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        width: 50, height: 50,
                                        backgroundColor: process.env.REACT_APP_BG_COLOR_2,
                                        color: process.env.REACT_APP_MAIN_COLOR,
                                        fontWeight: 600
                                      }}
                                    >
                                      {value.name
                                        ? initials(capitalize.words(value.name))
                                        : initials(capitalize.words('a nonimous'))}
                                    </Avatar>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '90%'
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: '17px',
                                          wordSpacing: '3px',
                                          lineHeight: 1.5,
                                          color: '#343434',
                                        }}
                                      >
                                        {value.comment}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          color: process.env.REACT_APP_MAIN_COLOR,
                                          fontWeight: 600, mt: 1, fontSize: 14
                                        }}
                                      >
                                        {value.name} <span style={{color: 'black', fontWeight: 400, fontSize: 12}}>
                                          { moment(value.createdAt).format('LL') }
                                        </span>
                                      </Typography>
                                      
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          justifyContent: 'left',
                                          alignItems: 'center',
                                          width: '100%', height: '4rem',
                                          mt: 1
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative',
                                            width: '4rem', height: '100%'
                                          }}
                                        >
                                          {!liked[idx] ? (
                                            <Typography
                                              sx={{
                                                position: 'absolute',
                                                top: 6,
                                                left: '35%',
                                                transform: 'translateX(-50%)',
                                                backgroundColor: process.env.REACT_APP_BG_COLOR,
                                                color: 'black',
                                                borderRadius: '50%',
                                                minWidth: '1.5rem',
                                                textAlign: 'center',
                                                padding: '4px',
                                                fontSize: '8px',
                                                fontWeight: 600,
                                                zIndex: 1,
                                                border: '2px white solid'
                                              }}
                                            >
                                              {value.like ? value.like : 0}
                                            </Typography>
                                          ) : (
                                            <Typography
                                              sx={{
                                                position: 'absolute',
                                                top: 6,
                                                left: '35%',
                                                transform: 'translateX(-50%)',
                                                backgroundColor: process.env.REACT_APP_BG_COLOR,
                                                color: 'black',
                                                borderRadius: '50%',
                                                minWidth: '1.5rem',
                                                textAlign: 'center',
                                                padding: '4px',
                                                fontSize: '8px',
                                                fontWeight: 600,
                                                zIndex: 1,
                                                border: '2px white solid'
                                              }}
                                            >
                                              Liked
                                            </Typography>
                                          )}
                                          <IconButton sx={{ml: 1}}
                                            onClick={() => {
                                              sessionStorage.setItem('commentId', value.id)
                                              onSubmitLike(idx, value.id)
                                            }}
                                          >
                                            <Favorite sx={{color: process.env.REACT_APP_MAIN_COLOR}}/>
                                          </IconButton>
                                        </Box>

                                        {/* start dislike code */}
                                        {/* <Box
                                          sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'left',
                                            alignItems: 'center',
                                            position: 'relative',
                                            width: '4rem', height: '100%',
                                            mr: 0.3
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              position: 'absolute',
                                              top: 4,
                                              left: '60%',
                                              transform: 'translateX(-50%)',
                                              backgroundColor: process.env.REACT_APP_BG_COLOR,
                                              color: 'black',
                                              borderRadius: '50%',
                                              minWidth: '1.5rem',
                                              textAlign: 'center',
                                              padding: '4px',
                                              fontSize: '8px', fontWeight: 600,
                                              zIndex: 1, border: '2px white solid'
                                            }}
                                          >
                                            {value.dislike ? value.dislike : 0}
                                          </Typography>
                                          <IconButton sx={{ml: 1}}
                                            onClick={() => {
                                              sessionStorage.setItem('commentId', value.id)
                                              onSubmitDisLike()
                                            }}
                                          >
                                            <ThumbDownAlt sx={{color: process.env.REACT_APP_MAIN_COLOR}} />
                                          </IconButton>
                                        </Box> */}
                                        {/* end dislike code */}

                                        <Box
                                          sx={{
                                            display: 'flex',
                                            flexDirection: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center', ml: 1
                                          }}
                                        >
                                          <IconButton
                                            onClick={handleToggleShowReply}
                                          >
                                            <ChatBubble sx={{color: process.env.REACT_APP_MAIN_COLOR}}/>
                                          </IconButton>
                                          <Typography sx={{fontWeight: 600, color: '#585858'}}>
                                            {value.replies.length
                                              ? value.replies.length
                                              : 0
                                            }
                                          </Typography>
                                        </Box>
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            flexDirection: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center', ml: 2
                                          }}
                                        >
                                          <Button
                                            onClick={() => {
                                              handleReply(idx)
                                              sessionStorage.setItem('commentId', value.id)
                                            }}
                                            sx={{
                                              fontWeight: 600,
                                              color: process.env.REACT_APP_MAIN_COLOR
                                            }}
                                          >
                                            reply
                                          </Button>
                                        </Box>
                                      </Box>

                                      {reply[idx] && <Box sx={{width: '90%', ml: 6, mb: 3}}> <New_Reply id={id} setUpdate={setUpdate}/> </Box>}

                                    </Box>
                                  </Box>

                                  {/* start reply block */}
                                    {
                                      value.replies.length
                                        ? <Replies
                                            replies={ value.replies }
                                            id={id}
                                            setUpdate={setUpdate}
                                            handleToggleShowReply={handleToggleShowReply}
                                            loadMore={loadMore}
                                          />
                                        : ''
                                    }
                                  {/* end reply block */}
                                </Box>
                              })}
                            </Fragment>
                          ))
                        }
                        
                      </Box>
                    </Box>

                    <Box sx={{width: '100%', height: '0.2px', backgroundColor: '#CCCCCC', mt: 4}}/>

                    <Box
                      sx={{
                        display: 'flex',
                        width: '100%',
                        height: 'auto',
                        justifyContent: 'left',
                        alignItems: 'center', mt: 2, mb: 4
                      }}
                    >
                      <Button
                        onClick={ () => fetchNextPage() } //eslint-disable-line
                        disabled={ !hasNextPage || isFetchingNextPage } //eslint-disable-line
                        sx={{
                          color: '#712E1E',
                          backgroundColor: 'white',
                          fontWeight: 600,
                          boxShadow: 2, mb: 1, ml: 1,
                          '&:hover': {
                            color: 'white',
                            backgroundColor: '#712E1E',
                          }
                        }}
                      >
                        { isFetchingNextPage //eslint-disable-line
                          ? <CircularProgress sx={{color: 'white'}}/>
                          : hasNextPage //eslint-disable-line
                            ? 'Load More Comment'
                            : comment_status === 'error' || comment_status === 'loading'
                              ? ''
                              : ''
                        }
                      </Button>
                      <Box>
                        { isFetching && !isFetchingNextPage //eslint-disable-line
                          ? comment_status === 'loading'
                            ? ''
                            : <Typography
                                sx={{
                                  color: 'white'
                                }}
                              >Updating...</Typography>
                          : null }
                      </Box>
                    </Box>
                  </Box>}

                </Box>
              )
        }
        
      </Stack>
    </>
  )
}

function New_Comment ({id, setUpdate}: Props_Comment) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isErr, setIsErr] = useState<string>('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setLoading(true)
      const requestBody = {
        name: data.name.toLowerCase(),
        comment: data.comment
      };

      const res = await axios.post(`comment/comment_project/${id}`, requestBody);

      if (res.data.errors) { //eslint-disable-line
        return setIsErr(res.data.errors[0].msg)
      }

      if (res.status === 201) {
        setLoading(false)
      }

      setUpdate(true)
      reset({
        name: '',
        comment: ''
      });
    } catch (err: any) {
      console.log(err)
      setLoading(false)
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%', pt: 4
        }}
      >
        <Box
          sx={{
            width: {md: '80%', xs: '70%'},
            borderRadius: '20px',
            backgroundColor: process.env.REACT_APP_BG_COLOR_2,
            border: 'none', display: 'flex',
            flexDirection: 'column', justifyContent: 'left',
            alignItems: 'center'
          }}
        >
          <TextField
            variant='outlined'
            placeholder='Name'
            {...register("name")}
            sx={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              '& .MuiInputBase-root': {
                border: 'none',
                '&:hover, &:focus': {
                  borderColor: 'transparent',
                  boxShadow: 'none',
                },
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                  boxShadow: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                  boxShadow: 'none',
                },
              },
            }}
          />
          <Box sx={{width: '95%', height: '0.2px', backgroundColor: '#CCCCCC'}}/>
          <TextField
            variant='outlined'
            multiline
            rows={2}
            placeholder='Write a public comment'
            {...register("comment", {
              required: 'Comment is required'
            })}
            error={!!errors?.comment}
            sx={{
              // width: {md: '80%', xs: '70%'},
              width: '100%',
              // borderRadius: '20px',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              '& .MuiInputBase-root': {
                border: 'none',
                '&:hover, &:focus': {
                  borderColor: 'transparent',
                  boxShadow: 'none',
                },
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                  boxShadow: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                  boxShadow: 'none',
                },
              },
            }}
          />
          {errors.comment &&
            (<Typography variant='body2' mt={1}
            component='span' sx={{ color: 'red', textAlign: 'left' }}
            >{errors.comment?.message}</Typography>)
          }
        </Box>
        
        <Box
          sx={{
            width: {md: '20%', xs: '30%'},
            display: 'flex',
            justifyContent: 'center',
            alignItems:  'center'
          }}
        >
          <LoadingButton
            onClick={ handleSubmit(onSubmit) } //eslint-disable-line
            loading={loading}
            loadingIndicator={<CircularProgress/>}
            sx={{
              width: '80%',
              height: '50%',
              borderRadius: '20px',
              boxShadow: 2,
              backgroundColor: process.env.REACT_APP_MAIN_COLOR,
              color: 'white',
              '&:hover': {
                backgroundColor: '#7F4234',
                color: 'white'
              }
            }}
          >
            post
          </LoadingButton>
        </Box>
      </Box>
    </>
  )
}

function New_Reply ({id, setUpdate}: Props_Reply) {

  const [loading, setLoading] = useState<boolean>(false);
  const [isErr, setIsErr] = useState<string>('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs_Reply>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const onSubmit: SubmitHandler<Inputs_Reply> = async (data: any) => {
    try {
      setLoading(true)
      const requestBody = {
        name: data.name.toLowerCase(),
        reply: data.reply,
        commentId: sessionStorage.getItem('commentId')
      };

      const res = await axios.post(`comment/reply/project/${id}`, requestBody);

      if (res.data.errors) { //eslint-disable-line
        return setIsErr(res.data.errors[0].msg)
      }

      if (res.status === 201) {
        setLoading(false)
      }

      setUpdate(true)
      reset({
        name: '',
        reply: ''
      });
    } catch (err: any) {
      console.log(err)
      setLoading(false)
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%', pt: 4
        }}
      >
        <Box
          sx={{
            width: {md: '80%', xs: '70%'},
            borderRadius: '20px',
            backgroundColor: process.env.REACT_APP_BG_COLOR_2,
            border: 'none', display: 'flex',
            flexDirection: 'column', justifyContent: 'left',
            alignItems: 'center'
          }}
        >
          <TextField
            variant='outlined'
            placeholder='Name'
            {...register("name")}
            sx={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              '& .MuiInputBase-root': {
                border: 'none',
                '&:hover, &:focus': {
                  borderColor: 'transparent',
                  boxShadow: 'none',
                },
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                  boxShadow: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                  boxShadow: 'none',
                },
              },
            }}
          />
          <Box sx={{width: '95%', height: '0.2px', backgroundColor: '#CCCCCC'}}/>
          <TextField
            variant='outlined'
            multiline
            rows={2}
            placeholder='Write a public comment'
            {...register("reply", {
              required: 'Reply is required'
            })}
            error={!!errors?.reply}
            sx={{
              // width: {md: '80%', xs: '70%'},
              width: '100%',
              // borderRadius: '20px',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              '& .MuiInputBase-root': {
                border: 'none',
                '&:hover, &:focus': {
                  borderColor: 'transparent',
                  boxShadow: 'none',
                },
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                  boxShadow: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                  boxShadow: 'none',
                },
              },
            }}
          />
          {errors.reply &&
            (<Typography variant='body2' mt={1}
            component='span' sx={{ color: 'red', textAlign: 'left' }}
            >{errors.reply?.message}</Typography>)
          }
        </Box>
        
        <Box
          sx={{
            width: {md: '20%', xs: '30%'},
            display: 'flex',
            justifyContent: 'center',
            alignItems:  'center'
          }}
        >
          <LoadingButton
            onClick={ handleSubmit(onSubmit) } //eslint-disable-line
            loading={loading}
            loadingIndicator={<CircularProgress/>}
            sx={{
              width: '80%',
              height: '50%',
              borderRadius: '20px',
              boxShadow: 2,
              backgroundColor: process.env.REACT_APP_MAIN_COLOR,
              color: 'white',
              '&:hover': {
                backgroundColor: '#7F4234',
                color: 'white'
              }
            }}
          >
            post
          </LoadingButton>
        </Box>
      </Box>
    </>
  )
}

function Replies ({replies, id, setUpdate,loadMore, handleToggleShowReply}: Props) {

  // const onSubmitLike = async () => {
  //   try {
  //     const requestBody = {
  //       like: 1,
  //       replyId: sessionStorage.getItem('replyId'),
  //       commentId: sessionStorage.getItem('commentId')
  //     };

  //     await axios.put(`comment/reply/project/like/${id}`, requestBody);

  //     setUpdate(true)
  //   } catch (err: any) {
  //     console.log(err)
  //   }
  // };
  // const onSubmitDisLike = async () => {
  //   try {
  //     const requestBody = {
  //       dislike: 1,
  //       replyId: sessionStorage.getItem('replyId'),
  //       commentId: sessionStorage.getItem('commentId')
  //     };

  //     await axios.put(`comment/reply/project/dislike/${id}`, requestBody);

  //     setUpdate(true)
  //   } catch (err: any) {
  //     console.log(err)
  //   }
  // };
  const latestReply = replies[replies.length - 1];

  return (
    <>
      <Box
        sx={{
          width: '90%',
          ml: 6, display: 'flex',
          flexDirection: 'row', gap: 2
        }}
      >
        <Avatar
          sx={{
            width: 36, height: 36,
            backgroundColor: process.env.REACT_APP_MAIN_COLOR,
            color: process.env.REACT_APP_BG_COLOR_2,
            fontWeight: 400
          }}
        >
          {latestReply.name
            ? initials(capitalize.words(latestReply.name))
            : initials(capitalize.words('a nonimous'))}
        </Avatar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%'
          }}
        >
          <Typography
            sx={{
              fontSize: '17px',
              wordSpacing: '3px',
              lineHeight: 1.5,
              color: '#343434',
            }}
          >
            {latestReply.reply}
          </Typography>
          <Typography
            sx={{
              color: process.env.REACT_APP_MAIN_COLOR,
              fontWeight: 600, mt: 1, fontSize: 14
            }}
          >
            {latestReply.name} <span style={{color: 'black', fontWeight: 400, fontSize: 12}}>
              { moment(latestReply.createdAt).format('LL') }
            </span>
          </Typography>
          
          {/* start like and dislike code */}
          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'left',
              alignItems: 'center',
              width: '100%', height: '4rem',
              mt: 1
            }}
          >
            <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  width: '4rem', height: '100%'
                }}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 6,
                    left: '35%',
                    transform: 'translateX(-50%)',
                    backgroundColor: process.env.REACT_APP_BG_COLOR,
                    color: 'black',
                    borderRadius: '50%',
                    minWidth: '1.5rem',
                    textAlign: 'center',
                    padding: '4px',
                    fontSize: '8px', fontWeight: 600,
                    zIndex: 1, border: '2px white solid'
                  }}
                >
                {latestReply.like ? latestReply.like : 0}
              </Typography>
              <IconButton sx={{ml: 1}}
                onClick={() => {
                  sessionStorage.setItem('replyId', latestReply.id)
                  sessionStorage.setItem('commentId', latestReply.commentNewsId)
                  onSubmitLike()
                }}
              >
                <ThumbUpAlt sx={{color: process.env.REACT_APP_MAIN_COLOR}}/>
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'left',
                alignItems: 'center',
                position: 'relative',
                width: '4rem', height: '100%',
                mr: 0.3
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  top: 4,
                  left: '60%',
                  transform: 'translateX(-50%)',
                  backgroundColor: process.env.REACT_APP_BG_COLOR,
                  color: 'black',
                  borderRadius: '50%',
                  minWidth: '1.5rem',
                  textAlign: 'center',
                  padding: '4px',
                  fontSize: '8px', fontWeight: 600,
                  zIndex: 1, border: '2px white solid'
                }}
              >
                {latestReply.dislike ? latestReply.dislike : 0}
              </Typography>
              <IconButton sx={{ml: 1}}
                onClick={() => {
                  sessionStorage.setItem('replyId', latestReply.id)
                  sessionStorage.setItem('commentId', latestReply.commentNewsId)
                  onSubmitDisLike()
                }}
              >
                <ThumbDownAlt sx={{color: process.env.REACT_APP_MAIN_COLOR}} />
              </IconButton>
            </Box> 
          </Box>*/}
          {/* end like and dislike code */}

        </Box>
      </Box>
      <Box
        onClick={() => handleToggleShowReply()}
        sx={{
          cursor: 'pointer', '&:hover': {color: 'grey'},
          color: process.env.REACT_APP_MAIN_COLOR,
          width: '100%', display: 'flex', ml: 6,
          justifyContent: loadMore ? 'center' : 'left', alignItems: 'center'
        }}
      >
        {replies.length > 1 && <Typography sx={{fontSize: 14, textShadow: 5, fontWeight: 600}}>
          {loadMore
            ? 'Hide replies'
            : `Load ${replies.length - 1} more replies`
          }
        </Typography>}
        {replies.length === 1 && <Typography sx={{fontSize: 14, textShadow: 5, fontWeight: 600}}>
          No more replies available
        </Typography>}
        {loadMore ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </Box>
      {<Collapse in={loadMore} timeout={{ enter: 800, exit: 500 }}
          sx={{maxHeight: '10rem'}}
        >
        {replies.slice(0, replies.length - 1).map((value: any) => (
          <Box
            key={value.id}
            sx={{
              width: '90%',
              ml: 6, display: 'flex',
              flexDirection: 'row', gap: 2, mb: 3
            }}
          >
            <Avatar
              sx={{
                width: 36, height: 36,
                backgroundColor: process.env.REACT_APP_MAIN_COLOR,
                color: process.env.REACT_APP_BG_COLOR_2,
                fontWeight: 400
              }}
            >
              {value.name
                ? initials(capitalize.words(value.name))
                : initials(capitalize.words('a nonimous'))}
            </Avatar>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '90%'
              }}
            >
              <Typography
                sx={{
                  fontSize: '17px',
                  wordSpacing: '3px',
                  lineHeight: 1.5,
                  color: '#343434',
                }}
              >
                {value.reply}
              </Typography>
              <Typography
                sx={{
                  color: process.env.REACT_APP_MAIN_COLOR,
                  fontWeight: 600, mt: 1, fontSize: 14
                }}
              >
                {value.name} <span style={{color: 'black', fontWeight: 400, fontSize: 12}}>
                  { moment(value.createdAt).format('LL') }
                </span>
              </Typography>
              
              {/* start like and dislike code */}
              {/* <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'left',
                  alignItems: 'center',
                  width: '100%', height: '4rem',
                  mt: 1
                }}
              >
                <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      width: '4rem', height: '100%'
                    }}
                  >
                    <Typography
                      sx={{
                        position: 'absolute',
                        top: 6,
                        left: '35%',
                        transform: 'translateX(-50%)',
                        backgroundColor: process.env.REACT_APP_BG_COLOR,
                        color: 'black',
                        borderRadius: '50%',
                        minWidth: '1.5rem',
                        textAlign: 'center',
                        padding: '4px',
                        fontSize: '8px', fontWeight: 600,
                        zIndex: 1, border: '2px white solid'
                      }}
                    >
                    {value.like ? value.like : 0}
                  </Typography>
                  <IconButton sx={{ml: 1}}
                    onClick={() => {
                      sessionStorage.setItem('replyId', value.id)
                      sessionStorage.setItem('commentId', value.commentProjectId)
                      onSubmitLike()
                    }}
                  >
                    <ThumbUpAlt sx={{color: process.env.REACT_APP_MAIN_COLOR}}/>
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'left',
                    alignItems: 'center',
                    position: 'relative',
                    width: '4rem', height: '100%',
                    mr: 0.3
                  }}
                >
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 4,
                      left: '60%',
                      transform: 'translateX(-50%)',
                      backgroundColor: process.env.REACT_APP_BG_COLOR,
                      color: 'black',
                      borderRadius: '50%',
                      minWidth: '1.5rem',
                      textAlign: 'center',
                      padding: '4px',
                      fontSize: '8px', fontWeight: 600,
                      zIndex: 1, border: '2px white solid'
                    }}
                  >
                    {value.dislike ? value.dislike : 0}
                  </Typography>
                  <IconButton sx={{ml: 1}}
                    onClick={() => {
                      sessionStorage.setItem('replyId', value.id)
                      sessionStorage.setItem('commentId', value.commentProjectId)
                      onSubmitDisLike()
                    }}
                  >
                    <ThumbDownAlt sx={{color: process.env.REACT_APP_MAIN_COLOR}} />
                  </IconButton>
                </Box>

              </Box> */}
              {/* end like and dislike code */}

            </Box>
          </Box>
        ))}
      </Collapse>}
    </>
  )
}
