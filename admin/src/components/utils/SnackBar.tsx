import React, { useContext } from 'react'
import { SnackContext } from '../../context';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar () {
  const [state, setState] = useContext(SnackContext);

  const closeSnacky = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setState(
      {
        ...state,
        success: false,
        imgSuccess: false,
        addSuccess: false,
        updSuccess: false,
        updPassSuccess: false
      }
    );
  };
  return (
    <>
        <Snackbar
          open={
            state.imgSuccess ||
            state.success ||
            state.addSuccess ||
            state.updSuccess ||
            state.updPassSuccess
          } autoHideDuration={6000} onClose={closeSnacky}
        >
          <Alert onClose={closeSnacky} severity="success" sx={{ width: '100%' }}>
            { state.success && 'Successfully deleted' }
            { state.imgSuccess && 'Successfully uploaded image' }
            { state.addSuccess && 'Successfully created' }
            { state.updSuccess && 'Successfully updated' }
            { state.updPassSuccess && 'Successfully changed your password' }
          </Alert>
        </Snackbar>
    </>
  )
}
