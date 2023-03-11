import axios from "../../interceptors/axios_api";
import useAuth from "./useAuth";

export default function useLogout () {
  const { setAuth } = useAuth();

  const logoutUser = async () => {
    setAuth({});
    try {
      await axios.get('auth/logout', {
        withCredentials: true
      })
    } catch (error: any) {
      console.error(error)
    }
  }
  return logoutUser
}
