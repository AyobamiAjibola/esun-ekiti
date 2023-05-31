import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Fade, IconButton, Modal, TextField, Tooltip, Typography, CircularProgress } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { SnackContext } from "../../context";
import { Add, Delete, Save, Warning } from "@mui/icons-material";
import axios from '../../interceptors/axios_api';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SnackBar from "../utils/SnackBar";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
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
                        <img
                            src={`http://localhost:5000/uploads/${value}`}
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
    </Box>
  )
}
