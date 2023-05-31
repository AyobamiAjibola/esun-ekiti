import React from 'react';
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

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
        <article
          style={{
            padding: "100px",
            width: '100%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <h1>Oops!</h1>
          <p>You are not authorized to view this page</p>
          <div className="flexGrow">
            <Button onClick={ goBack }>...go back</Button>
          </div>
        </article>
    </Box>
  </>
  )
}

export default Unauthorized
