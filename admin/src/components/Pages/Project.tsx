import { Box, Button, CircularProgress, Fade, IconButton, Modal, TextField, Tooltip, Typography } from "@mui/material";
import { useContext, useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { SnackContext } from "../../context";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
import { Delete, Save, Warning } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AddPagination from "../utils/AddPagination";
import { LoadingButton } from "@mui/lab";
import SnackBar from "../utils/SnackBar";
import { SubmitHandler, useForm } from "react-hook-form";
import { projectValues } from "../utils/helpers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
  project: string
  detail: string
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

export default function Project () {
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

  const getProject = async () => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get('project/fetch_project')

      setData(res?.data?.data?.res2)
      setIsLoading(false)
    } catch (err: any) {
      console.log(err.message && "Loading") // eslint-disable-line
      setIsLoading(false)
    }
  };

  const deleteProject = async () => {
    try {
      setValues({ ...values, isLoading: true })
      await axiosPrivate.delete(`project/delete_project/${delId}`)

      setValues({ ...values, isLoading: false })
      setData(data.filter((value: any) => value.id !== delId));

      setUpdList(true);
      handleClose();
    } catch (err: any) {
      setState({ ...state, error: err.message && true }) //eslint-disable-line
      setValues({ ...values, isLoading: false })
    }
  };

  useEffect(() => {
    getProject() // eslint-disable-line
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
        <PostProject
          state={ state }
          setState={ setState }
          classes={ classes }
          axiosPrivate={ axiosPrivate }
          setUpdList={ setUpdList }
        />
        {!state.newProject && <Box className={ classes.contain } //eslint-disable-line
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
              Projects
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
                        height: '100%'
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
                          fontSize: '20px',
                          fontWeight: 600,
                          color: 'black',
                          margin: '8px'
                        }}
                      >
                        { value.project.toUpperCase() }
                      </Typography>
                    </Box>
                    {decoded.role === 'admin' && <Box
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
                    </Box>}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      wordSpacing: '5px',
                      lineHeight: 1.5,
                      color: '#585858',
                      margin: '8px 0'
                    }}
                  >
                    { value.detail }
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      height: 'auto',
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
                      to={`/project/${value.id}`}
                    >
                      view...
                    </Button>
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
                  onClick={deleteProject} // eslint-disable-line
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

function PostProject ({ state, setState, classes, axiosPrivate, setUpdList }: NewsProps) {
  const [values, setValues] = useState<any>({
    isLoading: false
    // date_commissioned: new Date('2000/01/01')
  })
  const [isError, setIsError] = useState('');

  const handleOpenPostProject = () => { setState({ ...state, newProject: true }) };
  const handleClosePostProject = () => {
    setState({ ...state, newProject: false });
    reset()
  };
  // const handleDate = (newValue: any) => {
  //   setValues({ ...values, date_commissioned: newValue });
  // }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    defaultValues: projectValues,
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const onSubmit: SubmitHandler <Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("project", data.project.toLowerCase());
      formData.append("detail", data.detail);
      // formData.append("date_commissioned", values.date_commissioned);

      const res = await axiosPrivate.post("project/new_project", formData);

      setValues({ ...values, isLoading: false })
      if (res.data.errors) { //eslint-disable-line
        setValues({ ...values, isErr: res.data.errors[0].msg })
      }

      if (res.statusText === 'OK') {
        setState({ ...state, addSuccess: true })
      }

      setUpdList(true)
      handleClosePostProject()
    } catch (err: any) {
      err.response.data.error.status === 'fail' && setIsError(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  return (
    <>
      { !state.newProject && //eslint-disable-line
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
            onClick={ handleOpenPostProject }
          >
            Post Project
          </Button>
        </Box>
      }
      { state.newProject && //eslint-disable-line
        <Box className={ classes.wrap }
          sx={{
            boxShadow: 5,
            borderRadius: '5px',
            mt: 3,
            width: { xs: "100%", md: "80%" }
          }}
          component='form'
        >
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
              onClick={handleClosePostProject}
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
      }
    </>
  )
}
