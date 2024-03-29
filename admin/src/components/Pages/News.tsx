import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Circle, Delete, RssFeed, Save, Warning } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, CircularProgress, Fade, IconButton, Modal, TextField, Tooltip, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SnackContext } from "../../context";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AddPagination from "../utils/AddPagination";
import { newsValues } from "../utils/helpers";
import SnackBar from "../utils/SnackBar";
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  container: {
    width: "90%",
    height: "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingBottom: '5px',
    marginTop: '3rem',
    padding: '0 5px'
  },
  wrap: {
    width: "80%",
    height: "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 20px',
    flexDirection: 'column'
  },
  contain: {
    width: "100%",
    height: "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 20px',
    flexDirection: 'column'
  },
  btn1: {
    backgroundColor: 'green',
    color: 'white',
    padding: '5px 10px',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'white',
      color: 'green',
      border: 'green solid 2px'
    }
  },
  btn2: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: '10px',
    padding: '5px 10px',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'white',
      color: 'red',
      border: 'red solid 2px'
    }
  }
}));

interface NewsProps {
  state: any
  setState: any
  classes: any
  axiosPrivate: any
  setUpdList: any
}

interface Inputs {
  news: string
  title: string
  videoLink: string
  videoTitle: string
}

interface Pagination {
  pageCount: number
  itemOffset: number
  itemsPerPage: number
  isLoading: boolean
  open: boolean
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  p: '20px 0'
};

export default function News () {
  const classes = useStyles();
  const [delId, setDelId] = useState(null);
  const [updList, setUpdList] = useState(false);
  const [values, setValues] = useState<Pagination>({
    isLoading: false,
    pageCount: 0,
    itemOffset: 0,
    itemsPerPage: 10,
    open: false
  });
  const [data, setData] = useState([]);
  const [currItems, setCurrItems] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpen = () => setValues({ ...values, open: true });
  const handleClose = () => setValues({ ...values, open: false });

  const [state, setState] = useContext(SnackContext);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const decoded: any = auth?.access //eslint-disable-line
    ? jwt_decode(auth.access)
    : undefined

  const activate = async (id: string) => {
    try {
      await axiosPrivate.put(`news/upd_news_valid/${id}`)
      setUpdList(true)
    } catch (err: any) {
      console.log(err)
    }
  }

  const getNews = async () => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get('news/fetch_news_all')
      setData(res?.data?.data?.res2)
      setIsLoading(false)
    } catch (err: any) {
      console.log(err.message && "Loading") // eslint-disable-line
      setIsLoading(false)
    }
  };
 
  const deleteNews = async () => {
    try {
      setValues({ ...values, isLoading: true })
      await axiosPrivate.delete(`news/delete_news/${delId}`)

      setValues({ ...values, isLoading: false })
      setData(data.filter((value: any) => value.title !== delId));

      setUpdList(true);
      handleClose();
    } catch (err: any) {
      setState({ ...state, error: err.message && true }) //eslint-disable-line
      setValues({ ...values, isLoading: false })
    }
  };

  useEffect(() => {
    getNews() // eslint-disable-line
    setUpdList(false);
  }, [updList]);

  useEffect(() => {
    const endOffset = values.itemOffset + values.itemsPerPage;
    setCurrItems(data.slice(values.itemOffset, endOffset));
    setValues({ ...values, pageCount: Math.ceil(data.length / values.itemsPerPage) })
  }, [values.itemOffset, values.itemsPerPage, data]);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'transparent'
  })

  return (
    <Box className={ classes.wrapper }>
      <Box className={ classes.container }>
        <PostNews
          state={ state }
          setState={ setState }
          classes={ classes }
          axiosPrivate={ axiosPrivate }
          setUpdList={ setUpdList }
        />
        {!state.newNews && <Box className={ classes.contain } //eslint-disable-line
          sx={{
            boxShadow: 5,
            mt: 3
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '3rem',
                mb: 3
              }}
            >
              News <RssFeed sx={{ color: 'orange', mb: '4px', fontSize: '2.5rem' }} />
            </Typography>
          </Box>
          {!isLoading
            ? <>
              {Object.values(currItems).map((value: any) => (<Box
                sx={{
                  width: '100%',
                  height: '12rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: '0 0 20px'
                }}
                key={ value.id }
              >
                <Box
                    sx={{
                      width: '30%',
                      height: '100%'
                    }}
                >
                  {!value.image //eslint-disable-line
                    ? <img
                        src='assets/no-image.png' alt='news'
                        style={{
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    : <img
                        src={ process.env.REACT_APP_IMG_URL + value.image[0] } //eslint-disable-line
                        crossOrigin="anonymous"
                        alt='news'
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: "fill"
                        }}
                      />}
                </Box>
                <Box
                  sx={{
                    width: '70%',
                    height: '100%',
                    paddingLeft: '25px'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    <Box
                      sx={{
                        width: '80%'
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '18px',
                          fontWeight: 600,
                          color: 'black',
                          margin: '8px'
                        }}
                      >
                        { value.title.toUpperCase() }
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '15%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {decoded.role === 'admin' && <>
                        {value.status === 'pending' && //eslint-disable-line
                          <Box>
                            <Circle sx={{ color: "red", fontSize: "small" }}/>
                            <Button
                              variant="text"
                              sx={{ fontSize: 10, fontWeight: 600, color: "red" }}
                              onClick={ () => activate(value.id) } //eslint-disable-line
                            >
                              Pending...
                            </Button>
                          </Box>
                        }
                        {value.status === 'active' && //eslint-disable-line
                          <Box>
                            <Circle sx={{ color: "green", fontSize: "small" }}/>
                            <Button
                              variant="text"
                              sx={{ fontSize: 10, fontWeight: 600, color: "green" }}
                              onClick={ () => activate(value.id) } //eslint-disable-line
                            >
                              Activated
                            </Button>
                          </Box>
                        }
                      </>}
                    </Box>
                    <Box
                      sx={{
                        width: '5%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                    <Tooltip
                      title="Delete news"
                      placement="top"
                    >
                      <IconButton
                        onClick={() => {
                          setDelId(value.id) //eslint-disable-line
                          handleOpen()
                        }}
                        sx={{
                          zIndex: 1,
                          position: "absolute",
                          color: "#521414",
                          "&:hover": {
                            color: "red"
                          }
                        }}
                      >
                        <Delete sx={{ fontSize: "1.5rem" }}/>
                      </IconButton>
                    </Tooltip>
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      wordSpacing: '5px',
                      lineHeight: 1.5,
                      color: '#585858',
                      margin: '8px 0'
                    }}
                  >
                    { value.news }
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      height: 'auto',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center'
                      }}
                    >
                      <Button variant='text'
                        sx={{
                          textDecoration: 'none',
                          fontWeight: 600,
                          '&:hover': { textDecorationLine: 'underline' },
                          color: '#521414'
                        }}
                        component={Link}
                        to={`/news/${value.id}`}
                      >
                        view...
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center'
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>
                        Posted on: { value.createdAt }
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>))}
              <AddPagination
                data={data}
                itemsPerPage={values.itemsPerPage}
                pageCount={values.pageCount}
                setValues={setValues}
                values={values}
              />
              </>
            : <Box
                sx={{
                  width: '100%',
                  height: '12rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CircularProgress />
              </Box>}
          </Box>}
        </Box>
        <Modal
          open={values.open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Fade in={values.open}>
          <Box sx={style}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                mb: 3
              }}
            >
              <Typography id="modal-modal-title" variant="h5" component="h2"
                sx={{
                  fontWeight: 600
                }}
              >
                Confirm Action <Warning />
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
                <LoadingButton
                  onClick={deleteNews} // eslint-disable-line
                  size="small"
                  endIcon={<Save />}
                  loading={values.isLoading}
                  loadingIndicator="Deleting..."
                  variant="contained"
                  sx={{
                    backgroundColor: 'green',
                    color: 'white',
                    boxShadow: 5,
                    margin: '3px 20px',
                    '&:hover': { backgroundColor: 'white', color: 'green' }
                  }}
                >
                  Yes
                </LoadingButton>
                <Button
                  onClick={ handleClose }
                  size="small"
                  sx={{
                    backgroundColor: 'red',
                    color: 'white',
                    margin: '3px 20px',
                    boxShadow: 5,
                    '&:hover': { backgroundColor: 'white', color: 'red' }
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <SnackBar />
    </Box>
  )
}

function PostNews ({ state, setState, classes, axiosPrivate, setUpdList }: NewsProps) {
  const [values, setValues] = useState<any>({
    isLoading: false
  })
  const [isError, setIsError] = useState('');

  const handleOpenPostNews = () => { setState({ ...state, newNews: true }) };
  const handleClosePostNews = () => {
    setState({ ...state, newNews: false });
    reset()
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    defaultValues: newsValues,
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("title", data.title.toLowerCase());
      formData.append("news", data.news);
      formData.append("videoLink", data.videoLink.trim());
      formData.append("videoTitle", data.videoTitle);

      const res = await axiosPrivate.post("news/new_news", formData);

      setValues({ ...values, isLoading: false })
      if (res.data.errors) { //eslint-disable-line
        setValues({ ...values, isErr: res.data.errors[0].msg })
      }

      if (res.statusText === 'OK') {
        setState({ ...state, addSuccess: true })
      }

      setUpdList(true)
      handleClosePostNews()
    } catch (err: any) {
      err.response.data.status === 'fail' && setIsError(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  return (
    <>
      { !state.newNews && //eslint-disable-line
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            width: '100%',
            height: 'auto'
          }}
        >
          <Button className={ classes.btn1 }
            sx={{
              boxShadow: 4,
              mb: 3
            }}
            size='medium'
            onClick={ handleOpenPostNews }
          >
            Post News
          </Button>
        </Box>
      }
      { state.newNews && //eslint-disable-line
        <Box className={ classes.wrap }
          sx={{
            boxShadow: 5,
            borderRadius: '5px',
            mt: 3
          }}
          component='form'
        >
          <TextField
            autoFocus
            variant='filled'
            margin="normal"
            fullWidth
            id="title"
            label="Headline"
            {...register("title", {
              required: 'This field is required'
            })}
            InputLabelProps={{
              shrink: true
            }}
            error={!!errors?.title}
          />
          {errors.title &&
            (<Typography variant='body2' mt={1}
            component='span' sx={{ color: 'red', textAlign: 'left' }}
            >{errors.title?.message}</Typography>)
          }
          <TextField
            autoFocus
            variant='filled'
            margin="normal"
            fullWidth
            id="filled-multiline-static"
            label="Story"
            multiline
            rows={6}
            {...register("news", {
              required: 'This field is required',
              maxLength: {
                value: 5000,
                message: "News cant not be more than 500 characters"
              }
            })}
            InputLabelProps={{
              shrink: true
            }}
            error={!!errors?.news}
          />
          {errors.news &&
            (<Typography variant='body2' mt={1}
            component='span' sx={{ color: 'red', textAlign: 'left' }}
            >{errors.news?.message}</Typography>)
          }
          <TextField
            autoFocus
            variant='filled'
            margin="normal"
            fullWidth
            id="video link"
            label="Video Link"
            {...register("videoLink")}
            InputLabelProps={{
              shrink: true
            }}
            error={!!errors?.videoLink}
          />
          {errors.videoLink &&
            (<Typography variant='body2' mt={1}
            component='span' sx={{ color: 'red', textAlign: 'left' }}
            >{errors.videoLink?.message}</Typography>)
          }
          <TextField
            autoFocus
            variant='filled'
            margin="normal"
            fullWidth
            id="video title"
            label="Video Title"
            {...register("videoTitle")}
            InputLabelProps={{
              shrink: true
            }}
            error={!!errors?.videoTitle}
          />
          {errors.videoTitle &&
            (<Typography variant='body2' mt={1}
            component='span' sx={{ color: 'red', textAlign: 'left' }}
            >{errors.videoTitle?.message}</Typography>)
          }
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
              width: '50%'
            }}
          >
            <LoadingButton
              onClick={ handleSubmit(onSubmit) } //eslint-disable-line
              size="small"
              loading={values.isLoading}
              loadingIndicator="Saving..."
              variant="contained"
              sx={{
                mb: 2,
                mr: 5,
                width: "50%",
                color: "white",
                backgroundColor: "green",
                boxShadow: 4,
                "&:hover": { backgroundColor: "white", color: "green" }
              }}
            >
              Save
            </LoadingButton>
            <Button
              onClick={handleClosePostNews}
              size="small"
              variant="contained"
              sx={{
                mb: 2,
                width: "50%",
                color: "white",
                backgroundColor: "red",
                boxShadow: 4,
                "&:hover": { backgroundColor: "white", color: "red" }
              }}
            >
              Cancel
            </Button>
          </Box>
          <Box>
            {isError && //eslint-disable-line
              <Typography variant='body2' mt={1} component='span'
                sx={{ color: 'red', textAlign: 'left' }}
              >
                { isError }
              </Typography>
            }
          </Box>
        </Box>
      }
    </>
  )
}
