import axios from '../../interceptors/axios_api';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('auth/new_token', {
      withCredentials: true
    });

    setAuth((prev: any) => {
      return {
        ...prev,
        access: response.data.token
      }
    });

    return response.data.token;
  }

  return refresh;
};

export default useRefreshToken;
