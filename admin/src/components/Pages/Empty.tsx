/* eslint-disable */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { HourglassEmpty } from '@mui/icons-material';

export default function Empty () {
  return (
        <>
            <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '20rem',
                  flexDirection: 'column'
                }}
            >
                <HourglassEmpty
                    sx={{
                       color: '#585858',
                       fontSize:'9rem'
                    }}
                />
                <Typography
                    component='em'
                    variant='body1'
                    sx={{
                        fontWeight: 600,
                        mt: 3,
                        color: '#585858'
                    }}
                >
                    Click New Oba to add Oba Elesun&apos;s details
                </Typography>
            </Box>
        </>
  )
}
