import React from 'react';
import { Facebook, Copyright } from "@mui/icons-material";
import { Box, IconButton, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  links: {
    textDecoration: 'none',
    listStyle: 'none',
    color: '#521414',
    fontWeight: 600,
    '&:hover': { color: '#521414', fontWeight: 500 }
  },
  unordered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    paddingBottom: '0px'
  }
}));

export default function Footer () {
  const classes = useStyles();

  const d = new Date();
  const year = d.getFullYear();

  return (
    <>
      <Stack
        direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
        spacing={2}
        sx={{
          borderTop: '#712E1E solid 4px',
          boxShadow: 4,
          backgroundColor: 'white'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { lg: '20%', sm: '100%' },
            flexDirection: 'column',
            padding: '20px 0px'
          }}
        >
          <Typography variant='body1' sx={{ fontWeight: 600, color: '#712E1E' }}>Awa lomo Esun Ekiti</Typography>
          <Typography variant='body1' sx={{ fontWeight: 600, color: '#712E1E' }}>Elesun Oyinbo</Typography>
        </Box>
        <Box
          sx={{
            display: { lg: 'flex', sm: 'none', xs: 'none' },
            justifyContent: 'center',
            width: { lg: '40%', sm: '100%' }
          }}
        >
          <ul className={classes.unordered}>
            <li><Link to='/' className={classes.links}> home </Link></li>
            <li><Link to='/history' className={classes.links}> history </Link></li>
            <li><Link to='/council' className={classes.links}> council </Link></li>
            <li><Link to='/news' className={classes.links}> news </Link></li>
            <li><Link to='/project' className={classes.links}> project </Link></li>
          </ul>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { lg: '20%', sm: '100%' },
            paddingTop: '0px'
          }}
        >
          <IconButton
            href="https://www.facebook.com/esunekiti"
          >
            <Facebook sx={{ fontSize: '30px', color: 'blue', '&:hover': { color: '#712E1E' } }}/>
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { lg: '20%', sm: '100%' },
            paddingBottom: { lg: '0px', sm: '20px', xs: '20px' }
          }}
        >
          <Typography variant='body1' sx={{ backgroundColor: 'transparent', fontWeight: 600, color: '#712E1E' }}>
            <Copyright/> esun ekiti { year }
          </Typography>
        </Box>
      </Stack>
    </>
  )
}
