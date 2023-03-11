import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import
{
  Backdrop,
  Box, Button, Fade, IconButton, Modal, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  TextField, LinearProgress,
  Tooltip, Typography, Zoom
} from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Delete, Edit, WarningOutlined } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { makeStyles } from "@material-ui/core";
import { SnackContext } from '../../context';
import LoadingButton from '@mui/lab/LoadingButton';
import AddPagination from '../utils/AddPagination';
import { chiefValues } from '../utils/helpers';
import { Link } from 'react-router-dom';
import SnackBar from '../utils/SnackBar';

interface Pagination {
  pageCount: number
  itemOffset: number
  itemsPerPage: number
  isLoading: boolean
  open: boolean
}

interface ChiefProps {
  classes: any
  setUpdate: any
  state: any
  setState: any
  axiosPrivate: any
}

interface Inputs {
  fullName: string
  bio: string
  duties: string
  title: string
  position: number
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "100%",
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

export default function Chief () {
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

  const handleOpen = () => setValues({ ...values, open: true });
  const handleClose = () => setValues({ ...values, open: false });

  const getChiefs = async () => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get('council/fetch_chief_admin')
      setData(res?.data?.result)
      setIsLoading(false)
    } catch (err: any) {
      console.log(err.message && "Loading") // eslint-disable-line
      setIsLoading(false)
    }
  };
  const deleteChief = async () => {
    try {
      setValues({ ...values, isLoading: true })
      await axiosPrivate.delete(`council/delete_chief/${delId}`)

      setValues({ ...values, isLoading: false })
      setData(data.filter((value: any) => value.title !== delId));
      handleClose()
      setState({ ...state, success: true })
    } catch (err: any) {
      setState({ ...state, error: err.message && true }) //eslint-disable-line
      setValues({ ...values, isLoading: false })
    }
  };

  useEffect(() => {
    getChiefs() // eslint-disable-line
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
      <Box className={ classes.wrap }
        sx={{
          width: { sm: "90%", xs: "80%" }
        }}
      >
        <NewChief
          classes={ classes }
          setUpdate={ setUpdList }
          state={ state }
          setState={ setState }
          axiosPrivate={ axiosPrivate }
        />
      </Box>
      <Box className={ classes.container }
        sx={{
          width: { sm: "90%", xs: "80%" },
          boxShadow: 5
        }}
      >
        { !state.newChief && <>
            <TableContainer component={Paper} sx={{ maxWidth: "90%", mt: 6 }}>
                { isLoading && <LinearProgress color='primary' /> }
                <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#CBB8B8" }}>
                    <TableCell align="left"><span style={{ fontWeight: "bolder", color: "#521414" }}>|</span>&nbsp;S/NO</TableCell>
                    <TableCell align="center"><span style={{ fontWeight: "bolder", color: "#521414" }}>|</span>&nbsp;Name</TableCell>
                    <TableCell align="center"><span style={{ fontWeight: "bolder", color: "#521414" }}>|</span>&nbsp;Title</TableCell>
                    <TableCell align="center"><span style={{ fontWeight: "bolder", color: "#521414" }}>|</span>&nbsp;Position</TableCell>
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
                    <TableCell align="center">{value.title}</TableCell>
                    <TableCell align="center">{value.position}</TableCell>
                    <TableCell align="center">
                      <Tooltip TransitionComponent={Zoom} title="Delete">
                        <IconButton
                          onClick={() => {
                            setDelId(value.title)
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
                          to={`/chief/${value.title}`}
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
        </>}
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
                Are you sure you want to delete this oba?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <LoadingButton
                  onClick={ deleteChief } // eslint-disable-line
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
  )
}

// New Chief
function NewChief ({ classes, setUpdate, state, setState, axiosPrivate }: ChiefProps) {
  const [values, setValues] = useState<any>({
    isLoading: false,
    isErr: null,
    delId: null,
    errImg: ''
  });
  const [isError, setIsError] = useState<string>('');

  const handleOpen = () => setState({ ...state, newChief: true });
  const handleClose = () => {
    setState({ ...state, newChief: false })
    reset()
    setIsError('')
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    defaultValues: chiefValues,
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setValues({ ...values, isLoading: true })
      const formData = new FormData();
      formData.append("fullName", data.fullName.toLowerCase());
      formData.append("title", data.title.toLowerCase());
      formData.append("position", data.position.toLowerCase());

      const res = await axiosPrivate.post("council/new_chief", formData);

      if (res.data.errors) { //eslint-disable-line
        return setValues({ ...values, isErr: res.data.errors[0].msg })
      }

      setValues({ ...values, isLoading: false });

      if (res.status === 201) {
        setState({ ...state, addSuccess: true })
      }

      setUpdate(true)
      handleClose()
    } catch (err: any) {
      setValues({ ...values, errImg: err.response.data.errors });
      err.response.data.error.status === 'fail' && setIsError(err.response.data.message);
      setValues({ ...values, isLoading: false })
    }
  };

  return (
    <>
      { state.newChief === false && <Button className={ classes.btn1 } onClick={ handleOpen }
        size='medium'
        sx={{
          boxShadow: 4,
          mb: 3,
          mt: 2
        }}
      >
        Add Chief
      </Button>}
      { state.newChief === true && <Fade in={state.newChief}>
        <Box
          sx={{
            width: { md: '80%', xs: '100%' },
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              display: 'flex',
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
        </Box>
      </Fade>}
    </>
  )
}
