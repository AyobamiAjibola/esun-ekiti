import axios from "../../interceptors/axios_api";
import { useState, useEffect } from 'react';

export default function useCookie () {
  const [isLoggedIn, setIsLoggedIn] = useState<string>("Loading...")

  // const isCookie = async () => {
  //     const response = await axios.get('auth/get_cookie', {
  //       withCredentials: true
  //     })

  //     return response.data.refreshToken;
  // }

  useEffect(() => {
    void (async (): Promise<void> => {
      const response = await axios.get('auth/get_cookie', {
        withCredentials: true
      })

      setIsLoggedIn(response.data.cookies);
      // return response.data.cookies
    })()
  }, [])
  return isLoggedIn
}
