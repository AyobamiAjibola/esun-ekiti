import React from 'react';
import { ArrowCircleUp, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, IconButton, styled, Typography } from '@mui/material';

const Input = styled('input')({
  display: 'none'
});

interface Props {
  onChangeFile: any
  fileName: any
  errImg: any
  onSubmit: any
  isLoading: any
}

export default function AddImg ({ onChangeFile, fileName, errImg, onSubmit, isLoading }: Props) {
  return (
    <>
        <Box component='form' encType="multipart/form-data"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%'
            }}
        >
            <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "left",
                  mb: 0.5
                }}
            >
                <Typography
                    variant='body2'
                    component="span"
                    sx={{ color: "black", fontSize: 15 }}
                >
                Upload image (500kb max. Dimension: 700 X 750).
                </Typography>
            </Box>
            <Box
                sx={{
                  width: "100%",
                  border: "2px dashed #B8B7BC",
                  backgroundColor: "#F9F9F9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: 'column'
                }}
            >
                <label htmlFor="icon-button-file">
                    <Input id="icon-button-file" type="file" name="image" onChange={onChangeFile}/>
                    <IconButton color="primary" aria-label="upload picture" component="span"
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        <ArrowCircleUp sx={{ fontSize: '3rem' }} />
                        <Typography component="span" variant="body2" sx={{ fontSize: 15 }}>Upload Image</Typography>
                    </IconButton>
                </label>
                <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'left',
                      alignItems: 'center',
                      flexDirection: 'column',
                      m: '5px 0px'
                    }}
                >
                    { errImg && //eslint-disable-line
                        <Typography variant='body2' mt={1}
                            component='span' sx={{ color: 'red', textAlign: 'left' }}
                        >
                            { errImg }
                        </Typography>
                    }
                    {fileName && //eslint-disable-line
                    <Typography
                        variant='body2'
                        component="span"
                        sx={{ color: "5F5E5E", fontWeight: 400, fontSize: 11 }}
                    >
                        <span>file name: </span>{fileName.name}
                    </Typography>}
                    {fileName && //eslint-disable-line
                    <Typography
                        variant='body2'
                        component="span"
                        sx={{ color: "#5F5E5E", fontWeight: 400, fontSize: 11 }}
                    >
                        <span>file size: </span> {fileName.size}
                    </Typography>}
                </Box>

                <LoadingButton
                    onClick={ onSubmit }
                    size="small"
                    endIcon={<Save />}
                    loading={isLoading}
                    loadingIndicator="Saving..."
                    variant="contained"
                    sx={{
                      m: '15px 0px',
                      backgroundColor: 'green',
                      color: 'white',
                      fontSize: '12px',
                      p: '5px 10px',
                      fontWeight: 500,
                      boxShadow: 5,
                      '&:hover': {
                        backgroundColor: 'white',
                        color: 'green'
                      }
                    }}
                >
                    save image
                </LoadingButton>
            </Box>
        </Box>
    </>
  )
}
