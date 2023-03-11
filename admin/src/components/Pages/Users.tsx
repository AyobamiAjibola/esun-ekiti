import RegisterUser from "./RegisterUser";
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import Unauthorized from "./Unauthorized";
import { useLayoutEffect } from 'react';

export default function Users () {
  const { auth } = useAuth();

  const decoded: any = auth?.access //eslint-disable-line
    ? jwt_decode(auth.access)
    : undefined

  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'transparent'
  })

  return (
    <>
      { decoded.role === "admin" ? <RegisterUser /> : <Unauthorized /> }
    </>
  )
}
