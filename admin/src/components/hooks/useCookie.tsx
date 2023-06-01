// import axios from "../../interceptors/axios_api";
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useCookie () {
  const [isLoggedIn, setIsLoggedIn] = useState<string>("Loading...")

  // const isCookie = async () => {
  //     const response = await axios.get('auth/get_cookie', {
  //       withCredentials: true
  //     })

  //     return response.data.refreshToken;
  // }

  // useEffect(() => {
  //   void (async (): Promise<void> => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/auth/get_cookie', {
  //         withCredentials: true,
  //       });

  //       setIsLoggedIn(response.data.cookies);
  //     } catch (error) {
  //       // Handle error case
  //       console.error('Error retrieving cookie:', error);
  //       setIsLoggedIn('Error');
  //     }
  //     // return response.data.cookies
  //   })()
  // }, [])
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}auth/get_cookie`, {
          withCredentials: true,
        });

        const refreshToken = response.data.cookie;

        setIsLoggedIn(refreshToken);
      } catch (error) {
        console.error(error);
        setIsLoggedIn('');
      }
    })();
  }, []);
  return isLoggedIn
}
