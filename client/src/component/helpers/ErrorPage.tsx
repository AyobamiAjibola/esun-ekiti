import React from 'react';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export default function ErrorPage () {
  return (
    <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 'auto',
          flexDirection: 'column'
        }}
    >
        <Typography variant='h6' mb={4}>
            Oops Something Went Wrong
        </Typography>
        <Typography>
            Reload the page or go back to <Link to='/home'>Home page</Link>
        </Typography>
    </Box>
  )
}
