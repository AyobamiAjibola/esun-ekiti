import { Box } from "@mui/material";
import { useLayoutEffect } from 'react';

export default function AdminStructure () {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            width: '90%',
            height: 'auto',
            backgroundColor: `${process.env.REACT_APP_BG_COLOR as string}`,
            boxShadow: 5,
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            m: 2,
            p: 4
          }}
        >
          <img
            src="assets/STRUCTURE.jpg"
            crossOrigin="anonymous"
            alt='structure-img'
            style={{
              width: "100%",
              height: '100%',
              objectFit: "fill"
            }}
          />
        </Box>
      </Box>
    </>
  )
}
