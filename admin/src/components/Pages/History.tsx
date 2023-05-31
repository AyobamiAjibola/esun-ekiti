import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Backdrop, Box, Button, Fade, IconButton, CircularProgress, Modal, TextField, Tooltip, Typography } from '@mui/material';
import { SubmitHandler, useForm } from "react-hook-form";
import { SnackContext } from "../../context";
import axios from '../../interceptors/axios_api';
import { Add, Close, Delete, Save, Warning } from "@mui/icons-material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { LoadingButton } from "@mui/lab";
import { useAxios } from "../hooks/useAxios";
import SnackBar from "../utils/SnackBar";

const useStyles = makeStyles(() => ({
  wrapper: {
    width: "100%",
    height: "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  container: {
    width: '80%',
    margin: '15px 8px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    padding: '30px 20px'
  },
  btn1: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: '10px',
    padding: '5px 10px',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'white',
      color: 'green',
      border: 'green solid 2px'
    }
  },
  history: {
    width: '100%',
    height: '100%',
    p: '5px 5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

interface Props {
  classes: any
  state: any
  setState: any
  axiosPrivate: any
  resource: any
  setUpdate: any
}

interface Inputs {
  history: string
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

export default function History () {
  const classes = useStyles();
  const [state, setState] = useContext(SnackContext);
  const axiosPrivate = useAxiosPrivate();
  const [fileName, setFileName] = useState<any>();
  const [errMsg, setErrMsg] = useState('');
  const { response: data, loading, error, setUpdate, update } = useAxios({
    method: 'GET',
    url: 'history/fetch_history'
  });

  const [values, setValues] = useState<any>({
    isLoading: false,
    isErr: '',
    open: false,
    openModal: false
  });
  const [delId, setDelId] = useState(null);

  const handleOpen = () => setValues({ ...values, open: true });
  const handleClose = () => {
    setValues({ ...values, open: false });
    setErrMsg('')
  };

  const OpenModal = () => setValues({ ...values, openModal: true });
  const CloseModal = () => setValues({ ...values, openModal: false });

  const onChangeFile = (e: any) => {
    setFileName(e.target.files[0]);
  };

  const onSubmitImg = async () => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("image", fileName);

      const response = await axios.put("history/upd_history_img", formData);

      setValues({ ...values, isLoading: false })
      setUpdate(true)
      setFileName(undefined)
      if (response.statusText === "OK") {
        setState({ ...state, imgSuccess: true })
      }
      handleClose()
    } catch (err: any) {
      setErrMsg(err.response.data.message)
      setValues({ ...values, isLoading: false })
    }
  };

  const deleteImg = async () => {
    try {
      setValues({ ...values, isLoading: true });
      await axios.delete(`history/delete_history_img/${delId}`)

      setValues({ ...values, isLoading: false });
      setState({ ...state, success: true });
      setUpdate(true)
      CloseModal()
    } catch (err: any) {
      setState({ ...state, error: err.message && true }) //eslint-disable-line
      setValues({ ...values, isLoading: false })
    }
  };

  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'transparent'
  })

  return (
    <>
      <Box className={ classes.wrapper }>
        <Box className={ classes.container }
          sx={{
            boxShadow: 5
          }}
        >
          { !loading
            ? <>
                <NewHistory
                  classes={ classes }
                  state={ state }
                  setState={ setState }
                  axiosPrivate={ axiosPrivate }
                  resource={ data }
                  setUpdate={ setUpdate }
                />
                {!state.newChief && <Box
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: '0 20px'
                  }}
                >
                  <Typography
                    variant='body1'
                    sx={{
                      m: '15px 0',
                      fontWeight: 600,
                      fontSize: '3rem',
                      color: 'primary'
                    }}
                  >
                    Our Story
                  </Typography>
                  <Typography variant='body2'
                    sx={{
                      textAlign: 'justify',
                      fontSize: '18px',
                      wordSpacing: '5px',
                      lineHeight: 1.5,
                      p: '0 20px',
                      color: '#585858'
                    }}
                  >
                    { data.data?.info?.history }
                  </Typography>
                </Box>}
                <Box
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {data.data?.info?.image?.map((value: any, index: any) => {
                    return <Box
                      sx={{
                        width: '18%',
                        height: '9rem',
                        display: 'flex',
                        mr: '5px',
                        mt: 3,
                        borderRadius: '15px'
                      }}
                      key={index}
                    >
                      <Tooltip
                        title="Delete image"
                        placement="top"
                      >
                        <IconButton
                          onClick={() => {
                            setDelId(value) //eslint-disable-line
                            OpenModal()
                          }}
                          sx={{
                            zIndex: 1,
                            position: "absolute",
                            backgroundColor: "#521414",
                            color: 'white',
                            marginLeft: 1,
                            "&:hover": {
                              color: "#521414",
                              backgroundColor: 'white   '
                            },
                            mt: 1
                          }}
                        >
                          <Delete sx={{ fontSize: "0.7rem" }}/>
                        </IconButton>
                      </Tooltip>
                      <img
                        src={ process.env.REACT_APP_IMG_URL + value } //eslint-disable-line
                        crossOrigin="anonymous"
                        alt='img'
                        style={{
                          width: "100%",
                          height: '100%',
                          objectFit: "fill"
                        }}
                      />
                  </Box>
                  })}
                  {(data.data?.info?.image?.length < 4 || data.data?.info?.image === null) && <Box
                    sx={{
                      width: '18%',
                      height: '9rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mr: '5px',
                      mt: 3,
                      flexDirection: 'column'
                    }}
                  >
                    <Tooltip
                      title="Upload image"
                      placement="top"
                    >
                      <IconButton
                        onClick={handleOpen}
                        sx={{
                          backgroundColor: "#521414",
                          color: 'white',
                          "&:hover": {
                            color: "white",
                            backgroundColor: 'green'
                          },
                          mt: 2
                        }}
                        >
                          <Add sx={{ fontSize: '3rem' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>}
                </Box>
              </>
            : <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 'auto'
                }}
              >
                <CircularProgress color="primary"/>
              </Box>
          }
          <>
            <Modal
              open={values.openModal}
              onClose={CloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Fade in={values.openModal}>
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
                        onClick={deleteImg} // eslint-disable-line
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
                        onClick={ CloseModal }
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
                      Select new image
                    </Typography>
                    <Typography component='em'
                      sx={{
                        mb: 1,
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      Upload image (500kb max. Dimension: 700 X 750).
                    </Typography>
                  </Box>
                  <Box component="form" mt={1} encType="multipart/form-data">
                    <input
                      style={{ fontSize: "17px", cursor: "pointer" }}
                      accept="image/*"
                      name="image"
                      onChange={onChangeFile}
                      type="file"
                    />
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center"
                      }}
                    >
                      { errMsg && //eslint-disable-line
                        <Typography variant='body1' mt={1}
                          component='span' sx={{ color: 'red', fontWeight: 600 }}
                        >
                          { errMsg }
                        </Typography>
                      }
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
                      <LoadingButton
                        onClick={onSubmitImg} // eslint-disable-line
                        size="small"
                        endIcon={<Save />}
                        loading={values.isLoading}
                        loadingIndicator="Saving..."
                        variant="contained"
                        disabled={ fileName === undefined }
                        sx={{
                          backgroundColor: 'green',
                          color: 'white',
                          boxShadow: 5,
                          margin: '3px 20px',
                          '&:hover': { backgroundColor: 'white', color: 'green' }
                        }}
                      >
                        Save
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
                        Close
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Modal>
          </>
          <SnackBar />
        </Box>
      </Box>
    </>
  )
}

// new history
function NewHistory ({ classes, setState, state, axiosPrivate, resource, setUpdate }: Props) {
  const [values, setValues] = useState<any>({
    isLoading: false,
    isErr: null,
    open: false
  });

  const handleOpen = () => setState({ ...state, newChief: true });
  const handleClose = () => {
    setState({ ...state, newChief: false })
    reset()
  };

  const handleOpenModal = () => {
    setValues({ ...values, open: true })
  };
  const handleCloseModal = () => setValues({ ...values, open: false });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("history", data.history);

      const res = await axiosPrivate.post("history/history", formData);

      setValues({ ...values, isLoading: false })
      if (res.data.errors) { //eslint-disable-line
        setValues({ ...values, isErr: res.data.errors[0].msg })
      }

      if (res.statusText === 'OK') {
        setState({ ...state, updSuccess: true })
      }

      setUpdate(true)
      handleClose()
    } catch (err: any) {
      // err.response.status >= 400 && setStates({...states, isError: "Server error, please reload the page"})
      setValues({ ...values, isLoading: false })
    }
  };

  const onSubmitUpd: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("history", data.history);

      const res = await axiosPrivate.put("history/upd_history", formData);

      setValues({ ...values, isLoading: false })
      if (res.data.errors) { //eslint-disable-line
        setValues({ ...values, isErr: res.data.errors[0].msg })
      }

      if (res.statusText === 'OK') {
        setState({ ...state, updSuccess: true })
      }

      setUpdate(true)
      handleCloseModal()
    } catch (err: any) {
      // err.response.status >= 400 && setStates({...states, isError: "Server error, please reload the page"})
      setValues({ ...values, isLoading: false })
    }
  };

  useEffect(() => {
    if (resource) { //eslint-disable-line
      reset({
        history: resource?.data?.info?.history
      });
    } else if (!resource) { //eslint-disable-line
      reset({
        history: ''
      })
    }
  }, [reset, resource]);

  return (
    <>
      {resource.data?.info === null && //eslint-disable-line
        <>
          { state.newChief === false && <Button className={classes.btn1} onClick={ handleOpen }
            sx={{
              width: { sm: '20%', xs: '100%' }
            }}
          >
            post history
          </Button>}
        </>}
        {resource.data?.info !== null && //eslint-disable-line
        <>
          { state.newChief === false && <Button className={classes.btn1} onClick={ handleOpenModal }
            sx={{
              width: { sm: '20%', xs: '100%' }
            }}
          >
            edit history
          </Button>}
        </>}
      { state.newChief === true && <Tooltip
          title="Close"
          placement="top"
        >
          <IconButton
            onClick={ handleClose }
            sx={{
              width: '5%',
              height: '45px',
              color: 'red',
              fontSize: '10px',
              p: '5px 10px',
              fontWeight: 500,
              boxShadow: 5,
              '&:hover': {
                backgroundColor: 'red',
                color: 'white'
              }
            }}
          >
            <Close />
          </IconButton>
        </Tooltip>
      }
      { state.newChief === true && <Box className={ classes.history }>
          <Box
            component='form'
            sx={{
              width: '100%',
              mb: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <TextField
              autoFocus
              variant='filled'
              margin="normal"
              fullWidth
              id="filled-multiline-static"
              label="History"
              multiline
              rows={12}
              {...register("history", {
                required: 'This field is required',
                maxLength: {
                  value: 10000,
                  message: "History cant not be more than 10000 characters"
                }
              })}
              InputLabelProps={{
                shrink: true
              }}
              error={!!errors?.history}
            />
            {errors.history &&
              (<Typography variant='body2' mt={1}
              component='span' sx={{ color: 'red', textAlign: 'left' }}
              >{errors.history?.message}</Typography>)
            }
            <LoadingButton
              onClick={ handleSubmit(onSubmit) } //eslint-disable-line
              loading={values.isLoading}
              loadingIndicator="Saving..."
              variant="contained"
              sx={{
                m: '40px 0px 10px',
                width: "50%",
                color: "white",
                backgroundColor: "green",
                boxShadow: 4,
                "&:hover": { backgroundColor: "white", color: "green" }
              }}
            >
              save
            </LoadingButton>
          </Box>
        </Box>
      }
      <Modal
        open={values.open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={values.open}>
          <Box sx={style}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                p: 2
              }}
              component='form'
            >
              <TextField
                autoFocus
                variant='filled'
                fullWidth
                id="filled-multiline-static"
                label="History"
                multiline
                margin="normal"
                rows={10}
                {...register("history", {
                  required: 'This field is required',
                  maxLength: {
                    value: 10000,
                    message: "History cant not be more than 10000 characters"
                  }
                })}
                InputLabelProps={{
                  shrink: true
                }}
                error={!!errors?.history}
              />
              {errors.history &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{ color: 'red', textAlign: 'left' }}
                >{errors.history?.message}</Typography>)
              }
              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <LoadingButton
                  onClick={ handleSubmit(onSubmitUpd) } //eslint-disable-line
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
                  onClick={handleCloseModal}
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
            </Box>
            { values.isErr && <Box //eslint-disable-line
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                { values.isErr }
              </Typography>
            </Box> }
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
