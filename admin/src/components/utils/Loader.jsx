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
  bgcolor: 'transparent',
  borderRadius: '10px',
  outline: 'none',
  p: 4
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
                          marginBottom: '30px',
                          width: '100%',
                          height: '100%'
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
