import { useState, useEffect, useContext } from 'react';
import
{
  Backdrop,
  Box, Button, Fade, IconButton, Modal, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  TextField, LinearProgress,
  Tooltip, Typography, Zoom, FormControl, InputLabel, Select, MenuItem, FilledInput, InputAdornment
} from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Delete, Edit, Visibility, VisibilityOff, WarningOutlined } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { makeStyles } from "@material-ui/core";
import { SnackContext } from '../../context';
import LoadingButton from '@mui/lab/LoadingButton';
import AddPagination from '../utils/AddPagination';
import { passwordPattern, phonePattern, userValues } from '../utils/helpers';
import { Link } from 'react-router-dom';
import SnackBar from '../utils/SnackBar';

interface Pagination {
  pageCount: number
  itemOffset: number
  itemsPerPage: number
  isLoading: boolean
  open: boolean
}

interface UserProps {
  setUpdate: any
  axiosPrivate: any
  newUserPage: boolean
  setNewUserPage: any
  setState: any
  state: any
}

interface Inputs {
  fullName: string
  phone_num: string
  password: string
  confirm_password: string
  unique: string
  user_type: string
}

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
    height: "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px 5px',
    flexDirection: 'column',
    margin: '5px 5px'
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
  wrap: {
    display: "flex",
    height: 'auto',
    justifyContent: "left",
    alignItems: "center",
    mb: 4
  }
}));

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
};

export default function RegisterUser () {
  const classes = useStyles();

  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<any>([]);
  const [updList, setUpdList] = useState(false);
  const [currItems, setCurrItems] = useState([]);
  const [delId, setDelId] = useState(null);
  const [values, setValues] = useState<Pagination>({
    pageCount: 0,
    itemOffset: 0,
    itemsPerPage: 10,
    isLoading: false,
    open: false
  });
  const [state, setState] = useContext(SnackContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newUserPage, setNewUserPage] = useState(false)

  const handleOpen = () => setValues({ ...values, open: true });
  const handleClose = () => setValues({ ...values, open: false });
  const handleOpens = () => setNewUserPage(true);

  const getUsers = async () => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get('user/fetch_users')
      setData(res?.data?.data?.result)
      setIsLoading(false)
    } catch (err: any) {
      console.log(err.message && "Loading") // eslint-disable-line
      setIsLoading(false)
    }
  };

  const deleteUser = async () => {
    try {
      setValues({ ...values, isLoading: true })
      await axiosPrivate.delete(`user/delete_user/${delId}`)

      setValues({ ...values, isLoading: false })
      setData(data.filter((value: any) => value.phone_num !== delId));
      handleClose()
      // navigate('/')
      setState({ ...state, success: true })
      setUpdList(true)
    } catch (err: any) {
      setState({ ...state, error: err.message && true }) //eslint-disable-line
      setValues({ ...values, isLoading: false })
    }
  };

  useEffect(() => {
    getUsers() // eslint-disable-line
    setUpdList(false);
  }, [updList]);

  useEffect(() => {
    const endOffset = values.itemOffset + values.itemsPerPage;
    setCurrItems(data.slice(values.itemOffset, endOffset));
    setValues({ ...values, pageCount: Math.ceil(data.length / values.itemsPerPage) })
  }, [values.itemOffset, values.itemsPerPage, data]);

  return (
    <Box className={ classes.wrapper }>
      <Box
        sx={{
          width: '80%',
          height: 'auto',
          mt: 4
        }}
      >
        { !newUserPage && <Button className={ classes.btn1 } onClick={ handleOpens }
          size='medium'
          sx={{
            boxShadow: 4,
            mb: 3,
            mt: 2
          }}
        >
          Add User
        </Button>}
      </Box>
      {newUserPage && <Box className={ classes.wrap }
        sx={{
          width: { sm: "60%", xs: "80%" },
          boxShadow: 5,
          m: 2,
          p: 4
        }}
      >
        <NewUser
          setUpdate={ setUpdList }
          newUserPage={newUserPage}
          setNewUserPage={setNewUserPage}
          axiosPrivate={ axiosPrivate }
          setState={setState}
          state={state}
        />
      </Box>}
      { !state.newUser && <Box className={ classes.container }
          sx={{
            width: { sm: "90%", xs: "80%" }
          }}
        >
          <TableContainer component={Paper} sx={{ maxWidth: "90%" }}>
              { isLoading && <LinearProgress color='primary' /> }
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#CBB8B8" }}>
                  <TableCell align="left"><span style={{ fontWeight: "bolder", color: "#521414" }}>|</span>&nbsp;S/NO</TableCell>
                  <TableCell align="center"><span style={{ fontWeight: "bolder", color: "#521414" }}>|</span>&nbsp;Name</TableCell>
                  <TableCell align="center"><span style={{ fontWeight: "bolder", color: "#521414" }}>|</span>&nbsp;Phone Number</TableCell>
                  <TableCell align="center"><span style={{ fontWeight: "bolder", color: "#521414" }}>|</span>&nbsp;Role</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {Object.values(currItems).map((value: any, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left" sx={{ width: 5 }}>{index + 1}</TableCell>
                    <TableCell align="center">{value.fullName}</TableCell>
                    <TableCell align="center">{value.phone_num}</TableCell>
                    <TableCell align="center">{value.user_type}</TableCell>
                    <TableCell align="center">
                      <Tooltip TransitionComponent={Zoom} title="Delete">
                        <IconButton
                          onClick={() => {
                            setDelId(value.phone_num)
                            handleOpen()
                          }}
                        >
                          <Delete sx={{ fontSize: "md", color: "#521414", "&:hover": { color: "red" } }}/>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip TransitionComponent={Zoom} title="Edit">
                        <IconButton
                          component={Link}
                          to={`/user/${value.phone_num}`}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 'auto',
              mt: 2
            }}
          >
            <AddPagination
              data={data}
              itemsPerPage={values.itemsPerPage}
              pageCount={values.pageCount}
              setValues={setValues}
              values={values}
            />
          </Box>
          <Modal
            open={values.open}
            onClose={handleClose}
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
                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  Confirmation <WarningOutlined sx={{ color: "black" }} />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 500, color: "red", mb: 3 }}>
                  Are you sure you want to delete this user?
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <LoadingButton
                    onClick={ deleteUser } // eslint-disable-line
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
                    onClick={handleClose}
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
      </Box> }
      <SnackBar />
    </Box>
  )
}

// New User
function NewUser ({ setUpdate, axiosPrivate, newUserPage, setNewUserPage, setState, state }: UserProps) {
  const [values, setValues] = useState<any>({
    isLoading: false,
    isErr: null,
    delId: null
  });
  const [isError, setIsError] = useState<string>('');
  const [role, setRole] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setNewUserPage(false)
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
      const formData = new FormData();
      formData.append("fullName", data.fullName.toLowerCase());
      formData.append("phone_num", data.phone_num);
      formData.append("password", data.password);
      formData.append("confirm_password", data.confirm_password);
      formData.append("unique", data.unique);
      formData.append("user_type", role);

      const res = await axiosPrivate.post("user/register_admin", formData);

      if (res.data.errors) { //eslint-disable-line
        return setValues({ ...values, isErr: res.data.errors[0].msg })
      }

      setValues({ ...values, isLoading: false });

      setUpdate(true)
      setState({ ...state, newUser: true })
      handleClose()
    } catch (err: any) {
      setValues({ ...values, errImg: err.response.data.errors });
      err.response.data.error.status === 'fail' && setIsError(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  return (
    <>
      <Fade in={newUserPage}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
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
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                  id="filled-adornment-password"
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
                        {showPassword ? <VisibilityOff sx={{ fontSize: { sm: '25px', xs: '20px' } }} /> : <Visibility sx={{ fontSize: { sm: '25px', xs: '20px' } }} />}
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
                        {showPassword ? <VisibilityOff sx={{ fontSize: { sm: '25px', xs: '20px' } }} /> : <Visibility sx={{ fontSize: { sm: '25px', xs: '20px' } }} />}
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
      </Fade>
    </>
  )
}
