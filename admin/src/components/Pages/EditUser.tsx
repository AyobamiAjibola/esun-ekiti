import React, { useState, useEffect, useContext } from 'react';
import {
  Typography, Box, TextField, Tooltip, Fade,
  LinearProgress, Button, IconButton, Modal, FormControl, InputLabel, FilledInput
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../hooks/useAxios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { SnackContext } from '../../context';
import { makeStyles } from "@material-ui/core";
import { LoadingButton } from '@mui/lab';
import ErrorPage from './ErrorPage';
import { Edit, Save } from '@mui/icons-material';
import axios from '../../interceptors/axios_api';
import { passwordPattern, phonePattern } from '../utils/helpers';
import SnackBar from '../utils/SnackBar';

interface Inputs {
  fullName: string
  phone_num: string
  password: string
  confirm_password: string
}

const styleImg = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  JustifyContent: "center",
  flexDirection: "column"
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  style: {
    margin: '15px 8px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    padding: '30px 30px'
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
  }
}));

interface Props {
  classes: any
  axiosPrivate: any
  state: any
  setState: any
}

export default function EditChief () {
  const classes = useStyles()
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState<any>({
    isLoading: false
  });
  const axiosPrivate = useAxiosPrivate();
  const [state, setState] = useContext(SnackContext);
  const [isError, setIsError] = useState<string>('');

  const { response, loading, error, setUpdate } = useAxios({
    method: 'GET',
    url: `user/current_user/${id}`
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const handleClose = () => {
    navigate('/users')
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("fullName", data.fullName.toLowerCase());
      formData.append("phone_num", data.phone_num);

      const res = await axiosPrivate.put(`user/update_user/${id}`, formData);

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

  useEffect(() => {
    if (response !== undefined) {
      reset({
        fullName: response.data?.singleUser.fullName,
        phone_num: response.data?.singleUser.phone_num
      });
    }
  }, [reset, response]);

  return (
    <>
      {!error
        ? <Box className={ classes.wrapper }>
            {loading && <Box
              sx={{
                width: '70%'
              }}
            >
              <LinearProgress color='primary'/>
            </Box>}
            {!loading && <Box
                className={classes.style}
                component='form'
                sx={{
                  boxShadow: 5,
                  width: { lg: '50%', md: '60%', xs: '80%' }
                }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: 'auto'
                }}
              >
                <Typography variant='body1'
                  sx={{
                    fontWeight: 600,
                    fontSize: { md: '25px', xs: '20px' },
                    m: '1rem 0',
                    textAlign: 'center'
                  }}
                >
                  Update { response.data?.singleUser.fullName.toUpperCase() } Details
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center'
                }}
              >
                <PasswordModal
                  classes={ classes }
                  axiosPrivate={ axiosPrivate }
                  state={ state }
                  setState={ setState }
                />
              </Box>
              <TextField
                margin="normal"
                fullWidth
                autoFocus
                variant='filled'
                id="fullName"
                label="Full Name"
                {...register("fullName", {
                  required: 'Name is required'
                })}
                InputLabelProps={{
                  shrink: true
                }}
                error={!!errors?.fullName}
              />
              {errors.fullName &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{ color: 'red', textAlign: 'left' }}
                >{errors.fullName?.message}</Typography>)
              }
              <TextField
                autoFocus
                variant='filled'
                margin="normal"
                fullWidth
                id="phone_num"
                label="Phone Number"
                {...register("phone_num", {
                  required: 'This field is required',
                  pattern: {
                    value: phonePattern,
                    message: 'Please enter a valid phone number'
                  }
                })}
                InputLabelProps={{
                  shrink: true
                }}
                error={!!errors?.phone_num}
              />
              {errors.phone_num &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{ color: 'red', textAlign: 'left' }}
                >{errors.phone_num?.message}</Typography>)
              }
              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
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
              <Box //eslint-disable-line
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
              >
                {values.isErr && //eslint-disable-line
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    { values.isErr }
                  </Typography>
                }
                {isError && //eslint-disable-line
                  <Typography variant='body2' mt={1} component='span'
                      sx={{ color: 'red', textAlign: 'left' }}
                  >
                    { isError }
                  </Typography>
                }
              </Box>
            </Box>}
          </Box>
        : <ErrorPage error={ error } /> }
        <SnackBar />
      </>
  )
}

// PasswordModal
function PasswordModal ({ classes, axiosPrivate, state, setState }: Props) {
  const { id } = useParams();
  const [values, setValues] = useState<any>({
    isLoading: false,
    isErr: null,
    open: false
  });
  const [isError, setIsError] = useState('');

  const handleOpen = () => setValues({ ...values, open: true });
  const handleClose = () => {
    setValues({ ...values, open: false });
    setIsError('')
    reset()
  };

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<Inputs>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const onSubmitAdmin: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("password", data.password);
      formData.append("confirm_password", data.confirm_password);

      const res = await axiosPrivate.put(`user/update_user/${id}`, formData);

      if (res.data.errors) { //eslint-disable-line
        return setValues({ ...values, isErr: res.data.errors[0].msg })
      }

      setValues({ ...values, isLoading: false });

      if (res.statusText === "OK") {
        setState({ ...state, updPassSuccess: true })
      }

      handleClose()
    } catch (err: any) {
      setValues({ ...values, errImg: err.response.data.errors });
      err.response.data.error.status === 'fail' && setIsError(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  return (
      <>
        <Button
          onClick={handleOpen}
          className={ classes.btn1 }
          size="small"
          sx={{
            mb: 4,
            mt: 3
          }}
        >
          Change Password
        </Button>
        <Modal
          open={values.open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={values.open}>
            <Box sx={styleImg}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '2rem',
                  mb: 2
                }}
              >Enter new password</Typography>
              <Box component="form" mt={1} encType="multipart/form-data"
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'left',
                  flexDirection: 'column',
                  gap: 4
                }}
              >
                <>
                  <FormControl sx={{ width: '100%' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                    id="filled-password"
                    // type={passType}
                    {...register("password", {
                      required: 'Password is required',
                      pattern: {
                        value: passwordPattern,
                        message: 'Password cannot be less than 8 characters. \n Must include an upper case letter, at least a digit and special character'
                      }
                    })}
                    error={!!errors?.password}
                  />
                  </FormControl>
                  {errors.password &&
                    (<Typography variant='body2'
                    component='span' sx={{ color: 'red', textAlign: 'left', mt: '-20px' }}
                    >{errors.password?.message}</Typography>)
                  }
                </>
                <>
                  <FormControl sx={{ width: '100%' }} variant="filled">
                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                      <FilledInput
                      id="filled-confirm-password"
                      // type={passType}
                      {...register("confirm_password", {
                        required: 'Confirm password is required',
                        pattern: {
                          value: passwordPattern,
                          message: 'Password cannot be less than 8 characters. \n Must include an upper case letter, at least a digit and special character'
                        },
                        validate: {
                          checkPasswordConfirmationHandler: (value) => {
                            const { password } = getValues();
                            return password === value || "Passwords don't match";
                          }
                        }
                      })}
                      />
                  </FormControl>
                  {errors.confirm_password &&
                    (<Typography variant='body2'
                    component='span' sx={{ color: 'red', textAlign: 'left', mt: '-20px' }}
                    >{errors.confirm_password?.message}</Typography>)
                  }
                </>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <LoadingButton
                    onClick={ handleSubmit(onSubmitAdmin) } // eslint-disable-line
                    size="small"
                    endIcon={<Save />}
                    loading={values.isLoading}
                    loadingIndicator="Saving..."
                    variant="contained"
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
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: 'auto'
                  }}
                >
                  {values.isErr && //eslint-disable-line
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      { values.isErr }
                    </Typography>}
                  {isError && //eslint-disable-line
                    <Typography variant='body2' mt={1} component='span'
                      sx={{ color: 'red', fontWeight: 600 }}
                    >
                      { isError }
                  </Typography>}
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </>
  )
}
