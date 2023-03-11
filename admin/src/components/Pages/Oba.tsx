import
{
  Backdrop,
  Box, Button, Fade, IconButton, Modal, Paper, styled, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  TextField, LinearProgress,
  Tooltip, Typography, Zoom
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState, useContext, useLayoutEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { CircularProgress, makeStyles } from "@material-ui/core";
import { Add, ArrowCircleUp, Delete, Edit, Save, WarningOutlined } from '@mui/icons-material';
import AddPagination from '../utils/AddPagination';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAxios } from '../hooks/useAxios';
import axios from '../../interceptors/axios_api';
import { SnackContext } from '../../context';
import SnackBar from '../utils/SnackBar';
import ErrorPage from './ErrorPage';
import Empty from './Empty';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  first: {
    width: "80%",
    height: "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  second: {
    width: "80%",
    height: "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAEAEA',
    padding: '20px 0 10px',
    flexDirection: 'column'
  },
  btn1: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: '10px',
    padding: '5px 10px',
    fontWeight: 500,
    marginRight: '8px',
    '&:hover': {
      backgroundColor: 'white',
      color: 'green',
      border: 'green solid 2px'
    }
  },
  btn3: {
    backgroundColor: 'green',
    color: 'white',
    padding: '5px 10px',
    fontWeight: 500,
    marginRight: '8px',
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

interface Pagination {
  pageCount: number
  itemOffset: number
  itemsPerPage: number
  isLoading: boolean
  delId: any
}

interface Inputs {
  fullName: string
  bio: string
  from: string
  to: string
  position: number
}

const Input = styled('input')({
  display: 'none'
});

interface Props {
  resource: any
  classes: any
  axiosPrivate: any
  setUpdate: any
  state: any
  setState: any
  setOlori: any
}

interface PastObaProps {
  classes: any
  axiosPrivate: any
  setUpdate: any
  state: any
  setState: any
}

interface PropsImg {
  setUpdate: any
  state: any
  setState: any
}

interface PropsDel {
  axiosPrivate: any
  setUpdate: any
  resource: any
  classes: any
  state: any
  setState: any
  setOlori: any
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

export default function Oba () {
  const classes = useStyles();

  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const [updList, setUpdList] = useState(false);
  const [currItems, setCurrItems] = useState([]);
  const { response: resource, loading, error, setUpdate } = useAxios({
    method: 'GET',
    url: 'council/fetch_oba'
  });
  const { response: information, setUpdate: setOlori } = useAxios({
    method: 'GET',
    url: 'council/fetch_olori'
  });

  const [fileName, setFileName] = useState<any>();
  const [state, setState] = useContext(SnackContext);
  const [errImage, setErrImage] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [oloriErr, setOloriErr] = useState('');

  const [values, setValues] = useState<Pagination>({
    pageCount: 0,
    itemOffset: 0,
    itemsPerPage: 5,
    isLoading: false,
    delId: null
  })
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenOlori = () => setState({ ...state, newOlori: true });
  const handleCloseOlori = () => {
    setState({ ...state, newOlori: false })
    reset()
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const getPastOba = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get('council/fetch_past_oba_admin')

      setData(res?.data?.result);
      setIsLoading(false)
    } catch (err: any) {
      console.log(err.message && "Loading") // eslint-disable-line
      setIsLoading(false)
    }
  };

  const deleteOba = async () => {
    try {
      setValues({ ...values, isLoading: true })
      await axiosPrivate.delete(`council/delete_past_oba/${values.delId}`)

      setValues({ ...values, isLoading: false })
      setData(data.filter((value: any) => value.id !== values.delId));
      handleClose()
      setState({ ...state, success: true });
    } catch (err: any) {
      setState({ ...state, error: err.message && true }) //eslint-disable-line
      setValues({ ...values, isLoading: false })
    }
  };

  const onChangeFile = (e: any) => {
    setFileName(e.target.files[0]);
  };

  const onSubImg = async () => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("image", fileName);

      const response = await axios.put("council/upd_oba", formData);

      setValues({ ...values, isLoading: false })
      if (fileName === undefined) {
        return setErrImage('Please select a picture')
      }
      setUpdate(true)
      handleClose()
      if (response.statusText === "OK") {
        setState({ ...state, imgSuccess: true })
      }
    } catch (errors: any) {
      setErrImage(errors.response.data.message)
      console.log(errors.message)
      setValues({ ...values, isLoading: false })
    }
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const onSubmitOlori: SubmitHandler<Inputs> = async (val: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("fullName", val.fullName.toLowerCase());

      const res = await axiosPrivate.post("council/new_olori", formData);

      setValues({ ...values, isLoading: false })
      if (res.data.errors) { //eslint-disable-line
        setErrMsg(res.data.errors[0].msg)
      }

      if (res.status === 201) {
        setState({ ...state, addSuccess: true, newOlori: false })
      }

      setOlori(true)
      reset()
    } catch (err: any) {
      err.response.data.error.status === 'fail' && setOloriErr(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  const onSubmitOloriUpd: SubmitHandler<Inputs> = async (val: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("fullName", val.fullName.toLowerCase());

      const res = await axiosPrivate.put("council/upd_olori", formData);

      setValues({ ...values, isLoading: false })
      if (res.data.errors) { //eslint-disable-line
        setErrMsg(res.data.errors[0].msg)
      }

      if (res.statusText === 'OK') {
        setState({ ...state, updSuccess: true, newOlori: false })
      }

      setOlori(true)
    } catch (err: any) {
      err.response.data.error.status === 'fail' && setOloriErr(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  const onSubmitImg = async () => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("image", fileName);

      const response = await axios.put("council/upd_olori", formData);

      setValues({ ...values, isLoading: false })
      if (fileName === undefined) {
        return setErrMsg('Please select a picture')
      }
      setOlori(true)
      handleCloseModal()
      if (response.statusText === "OK") {
        setState({ ...state, imgSuccess: true })
      }
    } catch (err: any) {
      setErrMsg(err.response.data.message)
      setValues({ ...values, isLoading: false })
    }
  };

  useEffect(() => {
    (() => {
      if (resource?.result) { //eslint-disable-line
        setConfirm(true)
      }
    })()
  }, [resource]);

  useEffect(() => {
    getPastOba() // eslint-disable-line
    setUpdList(false);
  }, [updList]);

  useEffect(() => {
    const endOffset = values.itemOffset + values.itemsPerPage;
    setCurrItems(data.slice(values.itemOffset, endOffset));
    setValues({ ...values, pageCount: Math.ceil(data.length / values.itemsPerPage) })
  }, [values.itemOffset, values.itemsPerPage, data]);

  useEffect(() => {
    if (information !== undefined) {
      reset({
        fullName: information?.result?.fullName
      });
    } else if (information.length === 0) {
      reset({
        fullName: ''
      })
    }
  }, [reset, information]);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'transparent'
  })

  return (
    <>
      <Box className={classes.wrapper}>
        <Box className={classes.first}>
          <Box
            sx={{
              width: "100%",
              height: "4rem",
              display: "flex",
              justifyContent: "left",
              alignItems: "center"
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                color: '#521414',
                fontSize: { md: '2rem', sm: '1.7rem', xs: '1rem' }
              }}
            >
              OBA ELESUN OF ESUN EKITI
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "4rem",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              flexDirection: 'row'
            }}
          >
            <ObaModal
              resource={ resource }
              classes={ classes }
              axiosPrivate={ axiosPrivate }
              setUpdate={ setUpdate }
              state={ state }
              setState={ setState }
              setOlori={ setOlori }
            />
          </Box>
          {!error
          ? <Box // eslint-disable-line
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { md: 'row', xs: 'column' },
              padding: '10px 0 30px'
            }}
          >
            <Box
              sx={{
                width: { md: "50%", xs: "100%" },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'left',
                flexDirection: 'column'
              }}
            >
              { loading && <Box sx={{ width: '100%', height: '5rem' }}>
                <CircularProgress />
              </Box> }
              { !loading && <Box
                sx={{
                  width: '100%',
                  height: '20rem',
                  border: '1px solid #521414'
                }}
              >
                { resource?.result?.info?.image //eslint-disable-line
                  ? <>
                      <ImgModal
                        setUpdate={ setUpdate }
                        setState={ setState }
                        state={ state }
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '100%',
                          height: '100%'
                        }}
                      >
                        <img
                          src={ process.env.REACT_APP_IMG_URL + resource?.result?.info?.image} //eslint-disable-line
                          crossOrigin="anonymous"
                          alt='esun-news'
                          style={{
                            width: "70%",
                            height: '100%',
                            objectFit: "fill"
                          }}
                        />
                      </Box>
                    </>
                  : !confirm
                      ? <Empty />
                      : <Box
                          sx={{
                            width: "100%",
                            height: '100%',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: 'column'
                          }}
                        >
                          <Typography
                            variant='body2'
                            component="span"
                            sx={{ color: "black", fontSize: 18, fontWeight: 600 }}
                          >
                            Upload image (500kb max. Dimension: 700 X 750).
                          </Typography>
                          <label htmlFor="icon-button-file">
                            <Input id="icon-button-file" type="file" name="image" onChange={onChangeFile}/>
                            <IconButton color="primary" aria-label="upload picture" component="span"
                                sx={{ display: "flex", flexDirection: "column", fontSize: '40px', mt: 4 }}
                            >
                                <ArrowCircleUp />
                                <Typography component="span" variant="body2" sx={{ fontSize: 14 }}>Select Image</Typography>
                            </IconButton>
                          </label>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            { errImage && //eslint-disable-line
                              <Typography variant='body2' mt={1}
                                component='span' sx={{ color: 'red', textAlign: 'left', fontWeight: 600 }}
                              >
                                { errImage }
                              </Typography>
                            }
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              mt: 1
                            }}
                          >
                            { fileName && // eslint-disable-line
                              <>
                                <Typography
                                  variant='body2'
                                  component="span"
                                  sx={{ color: "5F5E5E", fontWeight: 500, fontSize: 14 }}
                                >
                                  <span>file name: </span>{fileName.name}
                                </Typography>
                                <Typography
                                  variant='body2'
                                  component="span"
                                  sx={{ color: "#5F5E5E", fontWeight: 500, fontSize: 14 }}
                                >
                                  <span>file size: </span> {fileName.size}
                                </Typography>
                              </>
                            }
                          </Box>
                          <Box
                            component='form'
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <LoadingButton
                              onClick={onSubImg} //eslint-disable-line
                              size="small"
                              loading={values.isLoading}
                              loadingIndicator="Saving..."
                              variant="contained"
                              sx={{
                                mt: 3,
                                width: "50%",
                                color: "white",
                                backgroundColor: "green",
                                boxShadow: 4,
                                "&:hover": {
                                  backgroundColor: "white",
                                  color: "green",
                                  border: 'solid 0.5px green'
                                }
                              }}
                            >
                              Save
                            </LoadingButton>
                          </Box>
                        </Box>
                }
              </Box>}
              { !loading && <>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: '#521414',
                      marginTop: '5px',
                      fontSize: { md: '25px', xs: '18px' },
                      textAlign: 'center'
                    }}
                  >
                    { resource.result?.info?.fullName.toUpperCase() }
                  </Typography>
                  <Typography
                    sx={{ color: '#585858', fontSize: '18px', fontWeight: 600, textAlign: 'center' }}
                  >
                    { `${resource.result?.info?.from} -- ${resource.result?.info?.to}` }
                  </Typography>
                </>
              }
            </Box>
            { !loading && <Box
              sx={{
                width: { md: "50%", xs: "100%" },
                height: 'auto',
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: 'column',
                marginLeft: '15px'
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: '#521414',
                  fontSize: '25px'
                }}
              >Biography</Typography>
              <Typography
                sx={{
                  color: '#585858',
                  marginTop: '5px',
                  textAlign: 'justify',
                  fontSize: { md: '20px', xs: '16px' }
                }}
              >
                {resource.result?.bio}
              </Typography>
            </Box> }
          </Box> : <ErrorPage error={ error } /> }
          {resource?.result && <Box //eslint-disable-line
            sx={{
              width: '100%',
              height: 'auto',
              pb: 4,
              mb: 5,
              pt: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: { sm: 'row', xs: 'column' },
              borderTop: '2px solid #999999'
            }}
          >
            {information?.result && <Box //eslint-disable-line
              sx={{
                width: '40%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              { information?.result?.image //eslint-disable-line
                ? <>
                    <Tooltip
                      title="Update image"
                      placement="top"
                    >
                    <IconButton
                      onClick={handleOpenModal}
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
                      <Edit sx={{ fontSize: "0.9rem" }}/>
                    </IconButton>
                  </Tooltip>
                  <img
                    src={ process.env.REACT_APP_IMG_URL + information?.result?.image } //eslint-disable-line
                    crossOrigin="anonymous"
                    alt='esun-news'
                    style={{
                      width: "80%",
                      height: '60%',
                      objectFit: "fill"
                    }}
                  />
                </>
                : <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: '50px'
                    }}
                  >
                  <Tooltip
                    title="Upload image"
                    placement="top"
                  >
                    <IconButton
                      onClick={handleOpenModal}
                      sx={{
                        width: '4rem',
                        border: '1px dashed #D6D6D6',
                        color: 'green',
                        "&:hover": {
                          color: "white",
                          backgroundColor: '#D6D6D6'
                        },
                        mt: 2
                      }}
                      >
                        <Add sx={{ fontSize: '3rem' }} />
                    </IconButton>
                  </Tooltip>
                  <Typography sx={{ fontWeight: 500 }}>Upload Image</Typography>
                </Box>}
              <Typography
                sx={{
                  fontWeight: '600',
                  fontSize: { md: '18px', xs: '15px' },
                  textAlign: 'left',
                  color: '#521414'
                }}
              >
                {information?.result?.fullName.toUpperCase()}
              </Typography>
              <Typography
                sx={{
                  textAlign: 'left',
                  fontWeight: 500,
                  color: '#585858',
                  fontSize: { md: '15px', xs: '13px' }
                }}>
                Olori Esun Ekiti
              </Typography>
            </Box>}
            <Box
              sx={{
                width: '50%',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {!state.newOlori && //eslint-disable-line
                <>
                  {!information?.result && //eslint-disable-line
                    <Button
                      className={ classes.btn3 }
                      size='large'
                      sx={{
                        boxShadow: 5
                      }}
                      onClick={ handleOpenOlori }
                    >
                      New Olori
                    </Button>
                  }
                </>
              }
              { !state.newOlori && //eslint-disable-line
                <>
                  {information?.result && //eslint-disable-line
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'left',
                          alignItems: 'left',
                          mb: 4
                        }}
                      >
                        <Button
                          onClick={ handleOpenOlori }
                          size='small'
                          className={ classes.btn1 }
                        >Edit Olori fullname</Button>
                      </Box>
                    </Box>
                  }
                </>
              }
              {state.newOlori && <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '80%',
                    height: 'auto'
                  }}
                  component='form'
                >
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
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <LoadingButton
                      onClick={ information?.result ? handleSubmit(onSubmitOloriUpd) : handleSubmit(onSubmitOlori) } //eslint-disable-line
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
                      onClick={handleCloseOlori}
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
                    { oloriErr && //eslint-disable-line
                      <Typography variant='body1' mt={1}
                        component='span' sx={{ color: 'red', fontWeight: 600 }}
                      >
                        { oloriErr }
                      </Typography>
                    }
                  </Box>
                </Box>
              </Box>}
            </Box>
            <>
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Fade in={openModal}>
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
                          onClick={ handleCloseModal }
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
          </Box>}
        </Box>

        <Box className={classes.second}>
          <Box
            sx={{
              width: "100%",
              height: "4rem",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              pl: 2
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                color: '#521414',
                fontSize: '2rem'
              }}
            >
              PAST OBAS
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Box
              sx={{
                width: "90%",
                height: "4rem",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                flexDirection: 'row'
              }}
            >
              <PastObaModal
                classes={ classes }
                axiosPrivate={ axiosPrivate }
                setUpdate={ setUpdList }
                state={ state }
                setState={ setState }
              />
            </Box>
            <TableContainer component={Paper} sx={{ maxWidth: "90%" }}>
              { isLoading && <LinearProgress color='primary' />}
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#CBB8B8" }}>
                    <TableCell align="left"><span style={{ fontWeight: "bolder", color: "#521414" }}>|</span>&nbsp;S/NO</TableCell>
                    <TableCell align="center"><span style={{ fontWeight: "bolder", color: "#521414" }}>|</span>&nbsp;Name</TableCell>
                    <TableCell align="center"><span style={{ fontWeight: "bolder", color: "#521414" }}>|</span>&nbsp;Date</TableCell>
                    <TableCell align="center"><span style={{ fontWeight: "bolder", color: "#521414" }}>|</span>&nbsp;Position</TableCell>
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
                    <TableCell align="center">{value.fullName.toUpperCase()}</TableCell>
                    <TableCell align="center">{value.from} - {value.to}</TableCell>
                    <TableCell align="center">{value.position}</TableCell>
                    <TableCell align="center">
                      <Tooltip TransitionComponent={Zoom} title="Delete">
                        <IconButton
                          onClick={() => {
                            setValues({ ...values, delId: value.id })
                            handleOpen()
                          }}
                        >
                          <Delete sx={{ fontSize: "md", color: "#521414", "&:hover": { color: "red" } }}/>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 'auto'
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
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  Confirmation <WarningOutlined sx={{ color: "black" }} />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 500, color: "red", mb: 3 }}>
                  Are you sure you want to delete this oba?
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <LoadingButton
                    onClick={ deleteOba } // eslint-disable-line
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
        </Box>
        <SnackBar />
      </Box>
    </>
  )
}

// Oba Modal
function ObaModal ({ resource, classes, axiosPrivate, setUpdate, state, setState, setOlori }: Props) {
  const [values, setValues] = useState<any>({
    isLoading: false,
    isErr: null,
    delId: null,
    open: false
  });
  const [isError, setIsError] = useState<string>('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const handleOpen = () => {
    setValues({ ...values, open: true })
  };
  const handleClose = () => {
    setValues({ ...values, open: false })
    reset()
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("fullName", data.fullName.toLowerCase());
      formData.append("bio", data.bio);
      formData.append("from", data.from);
      formData.append("to", data.to);

      const res = await axiosPrivate.put("council/upd_oba", formData);

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
      err.response.data.error.status === 'fail' && setIsError(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  const onSubmitNew: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("fullName", data.fullName.toLowerCase());
      formData.append("bio", data.bio);
      formData.append("from", data.from);
      formData.append("to", data.to);

      const res = await axiosPrivate.post("council/new_oba", formData);

      setValues({ ...values, isLoading: false })
      if (res.data.errors) { //eslint-disable-line
        setValues({ ...values, isErr: res.data.errors[0].msg })
      }

      if (res.status === 201) {
        setState({ ...state, addSuccess: true })
      }

      setUpdate(true)
      handleClose()
    } catch (err: any) {
      err.response.data.error.status === 'fail' && setIsError(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  useEffect(() => {
    if (resource !== undefined) {
      reset({
        fullName: resource?.result?.info?.fullName,
        from: resource?.result?.info?.from,
        to: resource?.result?.info?.to,
        bio: resource?.result?.info?.bio
      });
    } else if (resource.length === 0) {
      reset({
        fullName: '',
        from: '',
        to: '',
        bio: ''
      })
    }
  }, [reset, resource]);

  return (
    <>
      { !resource?.result && <Button //eslint-disable-line
        className={ classes.btn1 }
        onClick={ handleOpen } //eslint-disable-line
      >
        New Oba
      </Button> }
      { resource?.result && <Button //eslint-disable-line
        className={ classes.btn1 }
        onClick={ handleOpen } //eslint-disable-line
      >Edit Oba</Button> }
      <DelObaModal
        axiosPrivate={ axiosPrivate }
        setUpdate={ setUpdate }
        resource={ resource }
        classes={ classes }
        state={ state }
        setState={ setState }
        setOlori={ setOlori }
      />
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
              component='form'
            >
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
                id="filled-multiline-static"
                label="Biography"
                multiline
                rows={6}
                variant="filled"
                fullWidth
                {...register("bio", {
                  required: 'Biography is required',
                  maxLength: {
                    value: 10000,
                    message: "Biography can not be more than 10000 characters"
                  }
                })}
                InputLabelProps={{
                  shrink: true
                }}
              />
              {errors.bio &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{ color: 'red', textAlign: 'left' }}
                >{errors.bio?.message}</Typography>)
              }
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  mt: 3
                }}
              >
                <Box sx={{ width: '50%', borderRight: 'solid 5px white' }}>
                  <TextField
                    autoFocus
                    variant='filled'
                    id="from"
                    label="From"
                    {...register("from", {
                      required: 'This field is required'
                    })}
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={!!errors?.from}
                  />
                  {errors.from &&
                    (<Typography variant='body2' mt={1}
                    component='span' sx={{ color: 'red', textAlign: 'left' }}
                    >{errors.from?.message}</Typography>)
                  }
                </Box>
                <Box sx={{ width: '50%', borderLeft: 'solid 5px white' }}>
                  <TextField
                    autoFocus
                    variant='filled'
                    id="to"
                    label="To"
                    {...register("to", {
                      required: 'This field is required'
                    })}
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={!!errors?.to}
                  />
                  {errors.to &&
                    (<Typography variant='body2' mt={1}
                    component='span' sx={{ color: 'red', textAlign: 'left' }}
                    >{errors.to?.message}</Typography>)
                  }
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <LoadingButton
                onClick={ !resource?.result ? handleSubmit(onSubmitNew) : handleSubmit(onSubmit) } //eslint-disable-line
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
              { values.isErr && //eslint-disable-line
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  { values.isErr }
                </Typography>}
              { isError && //eslint-disable-line
                <Typography variant='body1' mt={1}
                  component='span' sx={{ color: 'red', fontWeight: 600 }}
                >
                  { isError }
                </Typography>
              }
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

// Image Modal
function ImgModal ({ setUpdate, state, setState }: PropsImg) {
  const [fileName, setFileName] = useState<any>();
  const [values, setValues] = useState<any>({
    isLoading: false,
    isErr: null,
    delId: null,
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

      const response = await axios.put("council/upd_oba", formData);

      setValues({ ...values, isLoading: false })
      if (fileName === undefined) {
        return setErrMsg('Please select a picture')
      }
      setUpdate(true)
      handleClose()
      if (response.statusText === "OK") {
        setState({ ...state, imgSuccess: true })
      }
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
            marginLeft: 3,
            marginBottom: 1,
            "&:hover": {
              color: "#521414",
              backgroundColor: 'white   '
            },
            mt: 2
          }}
        >
          <Edit sx={{ fontSize: "1.3rem" }}/>
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

// Delete Oba
function DelObaModal ({ axiosPrivate, setUpdate, resource, classes, state, setState, setOlori }: PropsDel) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    isLoading: false
  })

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const delOba = async () => {
    try {
      setValues({ ...values, isLoading: true })
      await axiosPrivate.delete('council/delete_oba')

      setValues({ ...values, isLoading: false })
      setUpdate(true)
      setOlori(true)
      handleClose()
      setState({ ...state, success: true })
    } catch (err: any) {
      console.log(err.message)
      setValues({ ...values, isLoading: false })
    }
  };

  return (
    <>
      { resource?.result && <Button //eslint-disable-line
        className={ classes.btn2 }
        onClick={ handleOpen }
      >Delete Oba</Button> }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              Confirmation <WarningOutlined sx={{ color: "black" }} />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 500, color: "red", mb: 3 }}>
              Are you sure you want to delete this oba?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LoadingButton
                onClick={ delOba } // eslint-disable-line
                size="small"
                loading={values.isLoading}
                loadingIndicator="Deleting..."
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
                  backgroundColor: "red",
                  boxShadow: 4,
                  "&:hover": { backgroundColor: "white", color: "red" }
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

// New Past Oba
function PastObaModal ({ classes, axiosPrivate, setUpdate, state, setState }: PastObaProps) {
  const [values, setValues] = useState<any>({
    isLoading: false,
    isErr: null,
    delId: null,
    open: false,
    errImg: ''
  });
  const [isError, setIsError] = useState<string>('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const handleOpen = () => {
    setValues({ ...values, open: true })
  };
  const handleClose = () => {
    setValues({ ...values, open: false })
    reset()
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("fullName", data.fullName.toLowerCase());
      formData.append("from", data.from);
      formData.append("to", data.to);
      formData.append("position", data.position);

      const res = await axiosPrivate.post("council/new_past_oba", formData);

      setValues({ ...values, isLoading: false })
      if (res.data.errors) { //eslint-disable-line
        return setValues({ ...values, isErr: res.data.errors[0].msg })
      }

      if (res.status === 201) {
        setState({ ...state, addSuccess: true })
      }

      setUpdate(true)
      handleClose()
    } catch (err: any) {
      setValues({ ...values, errImg: err.response.data.errors })
      err.response.data.error.status === 'fail' && setIsError(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  return (
    <>
      <Button
        className={ classes.btn1 }
        onClick={handleOpen}
      >
        New Past Oba
      </Button>
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'left',
                flexDirection: 'column'
              }}
              component='form'
            >
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
                fullWidth
                variant='filled'
                id="position"
                type='number'
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  mt: 3
                }}
              >
                <Box sx={{ width: '50%', borderRight: 'solid 5px white' }}>
                  <TextField
                    autoFocus
                    variant='filled'
                    id="from"
                    label="From"
                    {...register("from", {
                      required: 'This field is required'
                    })}
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={!!errors?.from}
                  />
                  {errors.from &&
                    (<Typography variant='body2' mt={1}
                    component='span' sx={{ color: 'red', textAlign: 'left' }}
                    >{errors.from?.message}</Typography>)
                  }
                </Box>
                <Box sx={{ width: '50%', borderLeft: 'solid 5px white' }}>
                  <TextField
                    autoFocus
                    variant='filled'
                    id="to"
                    label="To"
                    {...register("to", {
                      required: 'This field is required'
                    })}
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={!!errors?.to}
                  />
                  {errors.to &&
                    (<Typography variant='body2' mt={1}
                    component='span' sx={{ color: 'red', textAlign: 'left' }}
                    >{errors.to?.message}</Typography>)
                  }
                </Box>
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
            <Box>
              { values.isErr && //eslint-disable-line
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  { values.isErr }
                </Typography>}
              { isError && //eslint-disable-line
                <Typography variant='body1' mt={1}
                  component='span' sx={{ color: 'red', fontWeight: 600 }}
                >
                  { isError }
                </Typography>
              }
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
