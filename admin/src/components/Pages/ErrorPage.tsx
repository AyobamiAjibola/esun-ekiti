import React from 'react';
import { Box, Typography } from '@mui/material';
import { Error } from '@mui/icons-material';

interface Props {
  error: string
}
export default function ErrorPage ({ error }: Props) {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: '10px 0'
        }}
      >
        <Error sx={{ fontSize: '10rem' }} />
        <Typography variant='body2'
            sx={{
              color: 'red',
              fontWeight: 600,
              fontSize: '1rem'
            }}
        >
            { error }
        </Typography>
      </Box>
    </>
  )
}
