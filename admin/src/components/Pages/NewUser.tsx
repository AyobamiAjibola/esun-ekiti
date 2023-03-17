import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SnackContext } from "../../context";
import axios from '../../interceptors/axios_api';
import { passwordPattern, phonePattern, userValues } from "../utils/helpers";

interface Inputs {
  fullName: string
  phone_num: string
  password: string
  confirm_password: string
  unique: string
  user_type: string
}

export default function NewUser () {
  const [values, setValues] = useState<any>({
    isLoading: false,
    isErr: null,
    delId: null
  });
  const [isError, setIsError] = useState<string>('');
  const [role, setRole] = useState('');
  const [state, setState] = useContext(SnackContext);
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClose = () => {
    //   setState({ ...state, newUser: false })
    reset()
  };

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<Inputs>({
    defaultValues: userValues,
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const handleRole = (e: any) => {
    setRole(e.target.value);
  }

  const onSubmitAdmin: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const fullName = data.fullName.toLowerCase();
      const phone_num = data.phone_num; // eslint-disable-line
      const password = data.password;
      const confirm_password = data.confirm_password; // eslint-disable-line
      const unique = data.unique
      const user_type = role // eslint-disable-line

      const res = await axios.post("user/register_admin", {
        fullName,
        phone_num,
        password,
        confirm_password,
        unique,
        user_type
      });

        if (res.data.errors) { //eslint-disable-line
        return setValues({ ...values, isErr: res.data.errors[0].msg })
      }

      setValues({ ...values, isLoading: false });

      // setUpdate(true)
      handleClose()
      navigate('/')
      setState({ ...state, newUser: true })
    } catch (err: any) {
      setValues({ ...values, errImg: err.response.data.errors });
      err.response.data.status === 'fail' && setIsError(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  return (
      <>
        <Box
            sx={{
              display: 'flex',
              justifyContent: "center",
              alignItems: "center",
              width: '100vw',
              height: '100vh'
            }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 4,
              height: 'auto',
              width: { lg: '40%', sm: '50%', xs: '90%' },
              boxShadow: 5,
              borderRadius: "10px"
            }}
            component='form'
          >
            <Box
              sx={{
                mt: 3,
                mb: 3,
                width: '100%',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { md: '2rem', xs: '1.5rem' }
                }}
              >Enter new user details</Typography>
            </Box>
            <>
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
            </>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'left',
                gap: 2
              }}
            >
              <Box
                sx={{
                  width: { md: '50%', xs: '100%' }
                }}
              >
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
              </Box>
              <Box
                sx={{
                  width: { md: '50%', xs: '100%' }
                }}
              >
                <FormControl variant="filled" fullWidth margin="normal">
                  <InputLabel id="demo-simple-select-filled-label">User Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue=''
                    onChange={ handleRole }
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            {role === 'admin' && <>
              <TextField
                autoFocus
                variant='filled'
                margin="normal"
                type="password"
                fullWidth
                id="unique"
                label="Unique Admin Text"
                {...register("unique", {
                  required: 'This field is required'
                })}
                InputLabelProps={{
                  shrink: true
                }}
                error={!!errors?.unique}
              />
              {errors.unique &&
                (<Typography variant='body2' mt={1}
                  component='span' sx={{ color: 'red', textAlign: 'left' }}
                >{errors.unique?.message}</Typography>)
              }
            </>}
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'left',
                gap: 2,
                mt: 3,
                flexDirection: { lg: 'row', xs: 'column' }
              }}
            >
              <Box
                sx={{
                  width: { lg: '50%', xs: '100%' }
                }}
              >
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-pass">Password</InputLabel>
                  <FilledInput
                    id="filled-adornment-pass"
                    type={showPassword ? 'text' : 'password'}
                    {...register("password", {
                      required: 'Password is required',
                      pattern: {
                        value: passwordPattern,
                        message: 'Password cannot be less than 8 characters. \n Must include an upper case letter, at least a digit and special character'
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
                          {showPassword ? <VisibilityOff sx={{ fontSize: { sm: '18px', xs: '15px' } }} /> : <Visibility sx={{ fontSize: { sm: '18px', xs: '15px' } }} />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {errors.password &&
                  (<Typography variant='body2' mt={1}
                  component='span' sx={{ color: 'red', textAlign: 'left' }}
                  >{errors.password?.message}</Typography>)
                }
              </Box>
              <Box
                sx={{
                  width: { lg: '50%', xs: '100%' }
                }}
              >
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    {...register("confirm_password", {
                      required: 'Confirm password is required',
                      pattern: {
                        value: passwordPattern,
                        message: 'Password cannot be less than 8 characters. \n Must include an upper case letter, at least a digit and a special character'
                      },
                      validate: {
                        checkPasswordConfirmationHandler: (value) => {
                          const { password } = getValues();
                          return password === value || "Passwords don't match";
                        }
                      }
                    })}
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
                          {showPassword ? <VisibilityOff sx={{ fontSize: { sm: '18px', xs: '15px' } }} /> : <Visibility sx={{ fontSize: { sm: '18px', xs: '15px' } }} />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {errors.confirm_password &&
                  (<Typography variant='body2' mt={1}
                  component='span' sx={{ color: 'red', textAlign: 'left' }}
                  >{errors.confirm_password?.message}</Typography>)
                }
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <LoadingButton
                onClick={ handleSubmit(onSubmitAdmin) } //eslint-disable-line
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
      </>
  )
}
