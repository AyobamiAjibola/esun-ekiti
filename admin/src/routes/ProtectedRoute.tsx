/* eslint-disable */
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../components/hooks/useAuth";
import jwt_decode from "jwt-decode";

export default function ProtectedRoute () {
  const { auth } = useAuth();

  const decoded: any = auth?.access
    ? jwt_decode(auth.access)
    : undefined

  const roles = decoded?.isAdmin || ""
  const location = useLocation()

  return (
    auth?.access
      ? <Outlet />
      : <Navigate to="/"/>
  )
}
