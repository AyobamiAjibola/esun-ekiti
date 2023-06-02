import React from 'react';
import { Facebook, Copyright } from "@mui/icons-material";
import { Box, IconButton, Typography, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  links: {
    textDecoration: 'none',
    listStyle: 'none',
    fontWeight: 600,
  },
  unordered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%'
  }
}));

export default function Footer () {
  const classes = useStyles();

  const d = new Date();
  const year = d.getFullYear();
  const location = useLocation();
  const currentPath = location.pathname;

  const style = {
    color: currentPath === '/' || currentPath === '/council' ? '#712E1E' : 'white',
    fontWeight: 600
  };

  return (
    <>
      <Stack
        direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
        sx={{
          borderTop: currentPath === '/' || currentPath === '/council' ? '#712E1E solid 4px' : 'white solid 1px',
          boxShadow: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: currentPath === '/' || currentPath === '/council' ? 'white' : '#712E1E'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            width: { lg: '20%', sm: '100%' },
            flexDirection: 'column',
            padding: '20px 0px'
          }}
        >
          <Typography variant='body1'
            sx={{
              fontWeight: 600,
              color: currentPath === '/' || currentPath === '/council' ? '#712E1E' : 'white'
            }}
          >
            Awa lomo Esun Ekiti
          </Typography>
          <Typography variant='body1'
            sx={{
              fontWeight: 600,
              color: currentPath === '/' || currentPath === '/council' ? '#712E1E' : 'white'
            }}
          >
            Elesun Oyinbo
          </Typography>
        </Box>
        <Box
          sx={{
            display: { lg: 'flex', sm: 'none', xs: 'none' },
            justifyContent: 'center', alignItems: 'center', pt: 2,
            width: { lg: '40%', sm: '100%' }
          }}
        >
          <ul className={classes.unordered}>
            <li><Link to='/' className={classes.links} style={style}> home </Link></li>
            <li><Link to='/history' className={classes.links} style={style}> history </Link></li>
            <li><Link to='/council' className={classes.links} style={style}> council </Link></li>
            <li><Link to='/news' className={classes.links} style={style}> news </Link></li>
            <li><Link to='/project' className={classes.links} style={style}> project </Link></li>
          </ul>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { lg: '20%', sm: '100%' },
            paddingTop: '0px', mb: {md: 0, xs: 2}
          }}
        >
          <IconButton
            href="https://www.facebook.com/esunekiti"
          >
            <Facebook
              sx={{
                fontSize: '30px',
                color: currentPath === '/' || currentPath === '/council' ? 'blue' : 'white',
                '&:hover': {
                  color: process.env.REACT_APP_HOVER_COLOR as string
                }
              }}
            />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right', mr: 2,
            alignItems: 'center',
            width: { lg: '20%', sm: '100%' },
            mb: {md: 0, xs: 3}
          }}
        >
          <Typography variant='body1'
            sx={{
              backgroundColor: 'transparent',
              fontWeight: 600,
              color: currentPath === '/' || currentPath === '/council' ? '#712E1E' : 'white'
            }}
          >
            <Copyright/> esun ekiti { year }
          </Typography>
        </Box>
      </Stack>
    </>
  )
}
