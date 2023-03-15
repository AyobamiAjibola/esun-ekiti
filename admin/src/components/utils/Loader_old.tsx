import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

export default function Loader_old () {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(!open);
  }, [])

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {/* <CircularProgress color="inherit" /> */}
        <Spinner />
      </Backdrop>
    </div>
  );
}
