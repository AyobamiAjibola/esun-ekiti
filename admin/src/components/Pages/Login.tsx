import React, { useState } from 'react';
import { Box, Button, Checkbox, FilledInput, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
// import axios, { axiosPrivate } from '../../interceptors/axios_api';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { loginValues, phonePattern, passwordPattern } from "../utils/helpers";
import useAuth from '../hooks/useAuth';
import useToggle from "../hooks/useToggle";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import SnackBar from "../utils/SnackBar";
import axios from "axios";

interface Inputs {
  phone_num: string
  password: string
}

export default function Login () {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [check, toggleCheck] = useToggle('persist', false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: loginValues,
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });
  console.log(process.env.REACT_APP_BASE_URL, 'env')
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => { // eslint-disable-line
    try {
      setIsLoading(true)
      const phone_num = data.phone_num; // eslint-disable-line
      const password = data.password;

      const { data: login } = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/login_admin`, {
        phone_num,
        password
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          'Accept': '*/*',
        },
        withCredentials: true
      });

      setIsLoading(false)

      const access = login.token;

      setAuth({ access })

      navigate("/council");
    } catch (err: any) { // eslint-disable-line
      err.response.data.status === 'fail' && setIsError(err.response.data.message);
      console.log(err.response.data.status)
      setIsLoading(false)
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: { sm: 'row', xs: 'column' }
      }}
    >

      <Box
        sx={{
          display: { sm: 'none', xs: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          height: '20%',
          width: '100vw',
          backgroundColor: process.env.REACT_APP_MAIN_COLOR
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: '20px', textAlign: 'center', color: 'white', p: 4 }}>
          Omo afowo bokole,
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: { sm: '100vh', xs: '80%' },
          width: { md: '80%', sm: '70%', xs: '100vw' }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              height: 'auto',
              width: { lg: '40%', md: '50%', sm: '60%', xs: '90%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              boxShadow: 5,
              borderRadius: '5px',
              p: 2,
              mb: 2,
              backgroundColor: 'white'
            }}
            component='form'
          >
            <Box
              sx={{
                width: '30%',
                height: 'auto',
                mb: 2
              }}
            >
              <img
                src='assets/logo.png'
                alt='logo'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill'
                }}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  color: '#521414',
                  fontSize: '1.5rem'
                }}
              >
                Sign In
              </Typography>
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
                margin="normal"
                fullWidth
                variant='filled'
                id="phone_num"
                label="Phone Number"
                {...register("phone_num", {
                  required: 'Phone Number is required',
                  pattern: {
                    value: phonePattern,
                    message: 'Please enter a valid phone number'
                  }
                })}
                autoFocus
                error={!!errors?.phone_num}
              />
              {errors.phone_num &&
                (<Typography variant='body2' mt={0.5}
                component='span' sx={{ color: 'red', textAlign: 'left' }}
                >{errors.phone_num?.message}</Typography>)
              }
              <FormControl sx={{ mt: 3, width: '100%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  {...register("password", {
                    required: 'Password is required',
                    pattern: {
                      value: passwordPattern,
                      message: 'Password cannot be less than 8 characters. \n Must include an upper case letter, at least a digit and a special character'
                    }
                  })}
                  error={!!errors?.password}
                  endAdornment={
                    <InputAdornment position="end"
                      sx={{
                        height: '100%',
                        width: '15%',
                        overflow: 'hidden'
                      }}
                    >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff sx={{ fontSize: '25px' }} /> : <Visibility sx={{ fontSize: '25px' }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password &&
                  (<Typography variant='body2' mt={1}
                    component='span' sx={{ color: 'red', textAlign: 'left' }}
                  >{errors.password?.message}</Typography>)
                }
              </FormControl>
            </Box>
            <div
              style={{
                height: "auto",
                width: "100%",
                marginTop: '15px'
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check}
                      onChange={toggleCheck}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="Trust this device"
                />
              </FormGroup>
            </div>
              <LoadingButton
                type="submit"
                onClick={handleSubmit(onSubmit)} // eslint-disable-line
                loading={isLoading}
                loadingIndicator="Logging In..."
                sx={{
                  mt: 4,
                  backgroundColor: '#521414',
                  color: 'white',
                  padding: '10px 10px',
                  mb: '20px',
                  width: '100%',
                  fontWeight: 600,
                  boxShadow: 3,
                  '&:hover': {
                    backgroundColor: 'white',
                    color: '#521414',
                    border: '#fff solid 2px'
                  }
                }}
              >
                Sign In
              </LoadingButton>
              <Link to='/register'>Register</Link>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 'auto'
              }}
            >
              {isError && //eslint-disable-line
                <Typography variant='body2' mt={1} component='span'
                  sx={{ color: 'red', fontWeight: 600 }}
                >
                  { isError }
              </Typography>}
            </Box>
          </Box>
          <SnackBar />
        </Box>
      </Box>
      <Box
        sx={{
          display: { sm: 'flex', xs: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: { md: '20%', sm: '30%' },
          backgroundColor: process.env.REACT_APP_MAIN_COLOR
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: '20px', textAlign: 'center', color: 'white', p: 4 }}>
          Omo afowo bokole, fsfseew werf werewr werwe rwerew rwer wer ew r wer we rwerewrew
        </Typography>
      </Box>
    </Box>
  )
}
