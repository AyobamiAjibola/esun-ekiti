import { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { Modal } from '@mui/material'
import Spinner from './Spinner'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 300,
  bgcolor: 'transparent',
  borderRadius: '10px',
  outline: 'none'
}
const Loader = () => {
  const [open, setOpen] = useState(false)
  // const handleClose = () => {
  //   setOpen(false);
  // };
  useEffect(() => {
    setOpen(!open)
  }, [])

  return (
        <Box>
            <Modal
                open={open}
                // onClose={}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                    >
                        <Spinner/>
                    </Box>
                </Box>

            </Modal>
        </Box>
  )
}

export default Loader
