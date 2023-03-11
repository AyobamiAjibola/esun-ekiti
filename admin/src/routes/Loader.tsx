// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
// import { useEffect, useState } from 'react';

// export default function Loader () {
//   const [open, setOpen] = useState(false);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   useEffect(() => {
//     setOpen(!open);
//   }, [])

//   return (
//     <div>
//       <Backdrop
//         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={open}
//         onClick={handleClose}
//       >
//         <CircularProgress color="inherit" />
//         <h1>&nbsp;&nbsp;Please wait loading the page...</h1>
//       </Backdrop>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function Loader () {
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
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
        <h1>&nbsp;&nbsp;Please wait loading the page...</h1>
      </Backdrop>
    </div>
  );
}
