import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Fade, IconButton, Modal, TextField, Tooltip, Typography, CircularProgress, Collapse, TableContainer, Paper, LinearProgress, TableHead, TableRow, TableCell, Zoom, Table, TableBody, Dialog, DialogTitle, Divider, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { SnackContext } from "../../context";
import { Add, Delete, Edit, KeyboardArrowDown, KeyboardArrowUp, Save, Warning, WarningOutlined } from "@mui/icons-material";
import axios from '../../interceptors/axios_api';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SnackBar from "../utils/SnackBar";
import capitalize from "capitalize";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  content: {
    fontSize: 20
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

interface Inputs {
  project: string
  detail: string
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

export default function EditProject () {
  const classes = useStyles();
  const { id } = useParams();
  const { response, loading, error, setUpdate } = useAxios({
    method: 'GET',
    url: `project/curr_project/${id}`
  });
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [values, setValues] = useState<any>({
    isLoading: false,
    open: false,
    openModal: false
    // date_commissioned: new Date('2000/01/01')
  })
  const [state, setState] = useContext(SnackContext);
  const [isError, setIsError] = useState<string>('');
  const [errMsg, setErrMsg] = useState<any>('');
  const [fileName, setFileName] = useState<any>();
  const [delId, setDelId] = useState(null);
  const [_delId, _setDelId] = useState(null);
  const [_open, _setOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [viewComment, setViewComment] = useState<string>('');
  const [name, setName] = useState<string>('');//very rubbish thing i did here. FYI I was tired need to rest.
  const [openComments, setOpenComments] =  useState<boolean>(false);

  const __handleOpen = () => {setModal(true)};
  const __handleClose = () => {setModal(false)};

  const _handleOpen = () => _setOpen(true);
  const _handleClose = () => _setOpen(false);

  const handleClose = () => {
    navigate('/project')
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const handleModalOpen = () => setValues({ ...values, open: true });
  const handleModalClose = () => {
    setValues({ ...values, open: false });
    setErrMsg('')
  };
  const openModal = () => setValues({ ...values, openModal: true });
  const closeModal = () => setValues({ ...values, openModal: false });

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("project", data.project.toLowerCase());
      formData.append("detail", data.detail);
      // formData.append("date_commissioned", values.date_commissioned);

      const res = await axiosPrivate.put(`project/upd_project/${id}`, formData);

      if (res.data.errors) { //eslint-disable-line
        setValues({ ...values, isErr: res.data.errors[0].msg })
      }

      setValues({ ...values, isLoading: false })

      if (res.statusText === 'OK') {
        setState({ ...state, updSuccess: true })
      }

      setUpdate(true)
      handleClose()
    } catch (err: any) {
      err.response.data.status === 'fail' && setIsError(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  // const handleDate = (newValue: any) => {
  //   setValues({ ...values, date_commissioned: newValue });
  // }

  const onChangeFile = (e: any) => {
    setFileName(e.target.files[0]);
  };

  const onSubmitImg = async () => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("image", fileName);

      await axios.put(`project/upd_project_img/${id}`, formData);

      setValues({ ...values, isLoading: false })
      setUpdate(true)
      setFileName(undefined)
      setState({ ...state, updSuccess: true })
      handleModalClose()
    } catch (err: any) {
      setErrMsg(err.response.data.message)
      setValues({ ...values, isLoading: false })
    }
  };

  const deleteImg = async () => {
    try {
      setValues({ ...values, isLoading: true });
      await axios.delete(`project/delete_project_img/${delId}`)

      setValues({ ...values, isLoading: false });
      setState({ ...state, success: true });
      setUpdate(true)
      closeModal()
    } catch (err: any) {
      setState({ ...state, error: err.message && true }) //eslint-disable-line
      setValues({ ...values, isLoading: false })
    }
  };

  useEffect(() => {
    if (response !== undefined) {
      reset({
        project: response.data?.singleProject.project,
        detail: response.data?.singleProject.detail
      });
      setValues({})
      // setValues({ ...values, date_commissioned: response.data?.singleProject.date_commissioned })
    }
  }, [reset, response]);

  const deleteComment = async () => {
    try {
      await axiosPrivate.delete(`comment/project/delete/${_delId}`)

      _handleClose()
      setUpdate(true)
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleToggleShowComments = () => {
    setOpenComments(() => {
      return !openComments;
    })
  };

  useEffect(() => {
    if(modal){
      const value = response?.data?.singleProject?.comments.find((comment: any) => comment.id === _delId )
      setViewComment(value.comment);
      setName(value.name)
    }
    
  },[modal])

  return (
    <Box className={ classes.wrapper }>
        { !loading
          ? <Box className={ classes.wrap }
            sx={{
              boxShadow: 5,
              borderRadius: '5px',
              mt: 3,
              mb: 3
            }}
            component='form'
            >
            <>
                <Box
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                >
                    {response.data?.singleProject?.image?.map((value: any, index: any) => {
                      return <Box
                        sx={{
                          width: '18%',
                          height: '9rem',
                          display: 'flex',
                          mr: '5px',
                          mt: 3,
                          borderRadius: '15px',
                          flexDirection: 'column',
                          position: 'relative'
                        }}
                        key={index}
                    >
                      <img
                        src={ process.env.REACT_APP_IMG_URL + value }
                        crossOrigin="anonymous"
                        alt='img'
                        style={{
                          width: "100%",
                          height: '100%',
                          objectFit: "fill"
                        }}
                      />
                      <Tooltip
                        title="Delete image"
                        placement="top"
                      >
                        <IconButton
                          onClick={() => {
                          setDelId(value) //eslint-disable-line
                            openModal()
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
                        
                    </Box>
                    })}
                    {(response.data?.singleProject?.image?.length < 4 || response.data?.singleProject?.image === null) && <Box
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
                            onClick={handleModalOpen}
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
              <Modal
                open={values.openModal}
                onClose={closeModal}
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
                            onClick={ closeModal }
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
                onClose={handleModalClose}
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
                          onClick={ handleModalClose }
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
            <Box
              sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                gap: 2,
                flexDirection: { sm: 'row', xs: 'column' }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'left',
                  flexDirection: 'column',
                  width: '100%'
                }}
              >
                <TextField
                  autoFocus
                  variant='filled'
                  margin="normal"
                  fullWidth
                  id="project"
                  label="Project Name"
                  {...register("project", {
                    required: 'This field is required'
                  })}
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={!!errors?.project}
                />
                {errors.project &&
                  (<Typography variant='body2' mt={1}
                  component='span' sx={{ color: 'red', textAlign: 'left' }}
                  >{errors.project?.message}</Typography>)
                }
              </Box>
              {/* <Box
                sx={{
                  width: { sm: '30%', xs: '100%' },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disableFuture
                    minDate={new Date('2000/01/01')}
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={values.date_commissioned}
                    onChange={ handleDate }
                    renderInput={(params: any) =>
                      <TextField
                        {...params}
                        fullWidth
                        label="Date Commissioned"
                        variant="filled"
                        margin="normal"
                      />
                    }
                  />
                </LocalizationProvider>
              </Box> */}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'left',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              <TextField
                autoFocus
                variant='filled'
                margin="normal"
                fullWidth
                id="filled-multiline-static"
                label="Detail"
                multiline
                rows={6}
                {...register("detail", {
                  required: 'This field is required',
                  maxLength: {
                    value: 20000,
                    message: "Detail cant not be more than 20000 characters"
                  }
                })}
                InputLabelProps={{
                  shrink: true
                }}
                error={!!errors?.detail}
              />
              {errors.detail &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{ color: 'red', textAlign: 'left' }}
                >{errors.detail?.message}</Typography>)
              }
            </Box>
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
                onClick={handleClose}
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
              { isError && //eslint-disable-line
                <Typography variant='body1' mt={1}
                  component='span' sx={{ color: 'red', fontWeight: 600 }}
                >
                  { isError }
                </Typography>
              }
            </Box>
            </Box>
          : <Box
              sx={{
                width: '80%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress />
            </Box> }
      <SnackBar />

      {/* start comments */}

      <Typography variant="h4"
        sx={{
          textAlign: 'left',
          fontWeight: 600, mt: 2,
          color: process.env.REACT_APP_MAIN_COLOR
        }}
      >
        Comments
      </Typography>
      <Box
        onClick={() => handleToggleShowComments()}
        sx={{
          cursor: 'pointer', '&:hover': {color: 'grey'},
          color: process.env.REACT_APP_MAIN_COLOR,
          width: '100%', display: 'flex', ml: 6, mt:  4,
          justifyContent: 'left', alignItems: 'center'
        }}
      >
        <Typography sx={{fontSize: 14, textShadow: 5, fontWeight: 600}}>
          {openComments
            ? 'Hide comments'
            : `Show comments`
          }
        </Typography>
        {openComments ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </Box>
      <Collapse in={openComments} timeout={{ enter: 800, exit: 500 }}
        sx={{maxHeight: '20rem', width: '100%', mb: 8}}
      >
        <TableContainer component={Paper} sx={{ maxWidth: "90%", mt: 4 }}>
            { loading && <LinearProgress color='primary' /> }
            <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#CBB8B8" }}>
                <TableCell align="left">S/NO</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Comment</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {response?.data?.singleProject?.comments.map((value: any, index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left" sx={{ width: 5 }}>{index + 1}</TableCell>
                <TableCell align="center">{value.name || ''}</TableCell>
                <TableCell align="center">{value.comment}</TableCell>
                <TableCell align="center">
                  <Tooltip TransitionComponent={Zoom} title="Delete">
                    <IconButton
                      onClick={() => {
                        _setDelId(value.id)
                        _handleOpen()
                      }}
                    >
                      <Delete sx={{ fontSize: "md", color: "#521414", "&:hover": { color: "red" } }}/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip TransitionComponent={Zoom} title="Edit">
                    <IconButton
                      onClick={() => {
                        _setDelId(value.id)
                        __handleOpen()
                        
                      }}
                    >
                        <Edit sx={{ fontSize: "md", color: "#521414", "&:hover": { color: "green" } }}/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
            </Table>
        </TableContainer>
      </Collapse>

      <Modal
        open={_open}
        onClose={_handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <Fade in={_open}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              Confirmation <WarningOutlined sx={{ color: "black" }} />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 500, color: "red", mb: 3 }}>
              Are you sure you want to delete this comment?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LoadingButton
                onClick={ deleteComment } // eslint-disable-line
                size="small"
                loading={values.isLoading}
                loadingIndicator="Deleting..."
                variant="contained"
                sx={{
                  mb: 2,
                  mr: 5,
                  width: "50%",
                  color: "white",
                  backgroundColor: "red",
                  boxShadow: 4,
                  "&:hover": { backgroundColor: "white", color: "red" }
                }}
              >
                Delete
              </LoadingButton>
              <Button
                onClick={_handleClose}
                size="small"
                variant="contained"
                sx={{
                  mb: 2,
                  width: "50%",
                  color: "white",
                  backgroundColor: "green",
                  boxShadow: 4,
                  "&:hover": { backgroundColor: "white", color: "green" }
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Box
        sx={{
          width: '15rem'
        }}
      >
        <Dialog
          open={modal}
          onClose={__handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            sx: {
              width: '500px'
            },
          }}
        >
          <DialogTitle id="alert-dialog-title" className={classes.title}>
            {name ? `Comment from ${capitalize.words(name)}` : 'Comment from anonymous'}
          </DialogTitle>
          <Divider orientation="horizontal"/>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className={classes.content}>
              {viewComment}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={__handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
      {/* end comments */}

    </Box>
  )
}
