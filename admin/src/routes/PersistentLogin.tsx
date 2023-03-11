import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../components/hooks/useRefreshToken";
import useAuth from "../components/hooks/useAuth";
import Loader from "./Loader";
import useLocalStorage from "../components/hooks/useLocalStorage";

export default function PersistentLogin () {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [persist] = useLocalStorage('persist', false);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error: any) { //eslint-disable-line
        console.error(error);
      } finally {
        isMounted && setIsLoading(false) // eslint-disable-line
      }
    }

    !auth?.access ? verifyRefreshToken() : setIsLoading(false); // eslint-disable-line

    return () => { isMounted = false }
  }, []);

  return (
    <>
      {!persist // eslint-disable-line
        ? <Outlet />
        : isLoading
          ? <Loader/>
          : <Outlet />
      }
    </>
  )
}
