/* eslint-disable */
import React from 'react';
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../components/hooks/useAuth";
import jwt_decode from "jwt-decode";
import useCookie from "../components/hooks/useCookie";
import Loader from "../components/utils/Loader";
import { Box } from "@mui/material";

export default function ProtectedRoute () {
  const { auth } = useAuth();
  const cookie = useCookie()

  const decoded: any = auth?.access
    ? jwt_decode(auth.access)
    : undefined

  const roles = decoded?.isAdmin || ""
  const location = useLocation()

  return (
    <>
      {
        cookie === "Loading..." &&
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
          }}
        >
          <Loader />
        </Box>
      }
      { cookie?.length > 10 && <Outlet /> }
      { cookie === undefined && <Navigate to="/"/>}
    </>
  )
}
