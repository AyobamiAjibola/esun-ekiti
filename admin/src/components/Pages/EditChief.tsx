import {
  Typography, Box, TextField, Tooltip, Fade,
  LinearProgress, Button, IconButton, Modal
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../hooks/useAxios';
import { useState, useEffect, useContext } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { SnackContext } from '../../context';
import { makeStyles } from "@material-ui/core";
import { LoadingButton } from '@mui/lab';
import ErrorPage from './ErrorPage';
import { Edit, Save } from '@mui/icons-material';
import axios from '../../interceptors/axios_api';

interface Inputs {
  fullName: string
  title: string
  position: number
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
    width: '70%',
    margin: '15px 8px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    padding: '10px 10px'
  }
}));

interface Props {
  setUpdate: any
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
    url: `council/curr_chief/${id}`
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const handleClose = () => {
    navigate('/council')
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("fullName", data.fullName.toLowerCase());
      formData.append("position", data.position);
      formData.append("title", data.title.toLowerCase());

      const res = await axiosPrivate.put(`council/upd_chief/${id}`, formData);

      if (res.data.errors) { //eslint-disable-line
        setValues({ ...values, isErr: res.data.errors[0].msg })
      }

      setValues({ ...values, isLoading: false })

      if (res.statusText === 'OK') {
        setState({ ...state, updSuccess: true })
      }

      setUpdate(true)
      handleClose()
      navigate('/council')
    } catch (err: any) {
      err.response.data.status === 'fail' && setIsError(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  useEffect(() => {
    if (response !== undefined) {
      reset({
        fullName: response.data?.singleChief.fullName,
        title: response.data?.singleChief.title,
        position: response.data?.singleChief.position
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
                  sx={{ boxShadow: 5 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '5rem'
                    }}
                  >
                    <Typography variant='body1'
                      sx={{
                        fontWeight: 600,
                        fontSize: '30px',
                        m: '1rem 0'
                      }}
                    >
                      Update { response.data?.singleChief.title.toUpperCase() } Details
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      height: '12rem',
                      justifyContent: 'start',
                      alignItems: 'start'
                    }}
                  >
                    <ImgModal
                      setUpdate={ setUpdate }
                    />
                    {response.data?.singleChief?.image !== null
                      ? <Box
                          sx={{
                            width: '20%',
                            height: '80%',
                            border: '1px solid #521414',
                            m: '10px 0'
                          }}
                        >
                          <img
                            src={ process.env.REACT_APP_IMG_URL + response.data?.singleChief.image } //eslint-disable-line
                            crossOrigin="anonymous"
                            alt='esun-chief'
                            style={{
                              width: "100%",
                              height: '100%',
                              objectFit: "fill"
                            }}
                          />
                        </Box>
                      : <Box
                          sx={{
                            width: '20%',
                            height: '80%',
                            border: '1px solid #521414',
                            m: '10px 0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Typography
                            sx={{
                              textAlign: 'center',
                              fontWeight: 600
                            }}
                          >No Image, please upload</Typography>
                        </Box>
                    }
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
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      height: 'auto',
                      gap: 2
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80%'
                      }}
                    >
                      <TextField
                        autoFocus
                        variant='filled'
                        margin="normal"
                        fullWidth
                        id="title"
                        label="Title"
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
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '20%'
                      }}
                    >
                      <TextField
                        autoFocus
                        variant='filled'
                        margin="normal"
                        type="number"
                        fullWidth
                        id="position"
                        label="Position"
                        {...register("position", {
                          required: 'This field is required'
                        })}
                        InputLabelProps={{
                          shrink: true
                        }}
                        error={!!errors?.position}
                      />
                      {errors.position &&
                        (<Typography variant='body2' mt={1}
                        component='span' sx={{ color: 'red', textAlign: 'left' }}
                        >{errors.position?.message}</Typography>)
                      }
                    </Box>
                  </Box>
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
                  <Box
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
    </>
  )
}

// imgModal
function ImgModal ({ setUpdate }: Props) {
  const { id } = useParams();

  const [fileName, setFileName] = useState<any>();
  const [values, setValues] = useState<any>({
    isLoading: false,
    isErr: null,
    open: false
  });
  const [errMsg, setErrMsg] = useState('');

  const handleOpen = () => setValues({ ...values, open: true });
  const handleClose = () => {
    setValues({ ...values, open: false });
    setErrMsg('')
  };

  const onChangeFile = (e: any) => {
    setFileName(e.target.files[0]);
  };

  const onSubmitImg = async () => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("image", fileName);

      await axios.put(`council/upd_chief_img/${id}`, formData);

      setValues({ ...values, isLoading: false })
      if (fileName === undefined) {
        return setErrMsg('Please select a picture')
      }
      setUpdate(true)
      handleClose()
    } catch (errors: any) {
      setErrMsg(errors.response.data.message)
      setValues({ ...values, isLoading: false })
    }
  };

  return (
      <>
        <Tooltip
          title="Change image"
          placement="top"
        >
          <IconButton
            onClick={handleOpen}
            sx={{
              zIndex: 1,
              position: "absolute",
              backgroundColor: "#521414",
              color: 'white',
              "&:hover": {
                color: "#521414",
                backgroundColor: 'white   '
              },
              mt: 2,
              ml: 1
            }}
          >
            <Edit sx={{ fontSize: "0.8rem" }}/>
          </IconButton>
        </Tooltip>
        <Modal
          open={values.open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={values.open}>
            <Box sx={styleImg}>
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
  )
}
