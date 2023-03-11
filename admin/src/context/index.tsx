/* eslint-disable */
import { createContext, useState } from "react";

interface Snack {
  success: boolean;
  error: boolean;
  imgSuccess: boolean;
  addSuccess: boolean;
  updSuccess: boolean;
  newChief: boolean;
  newOlori: boolean;
  newNews: boolean;
  newProject: boolean;
  newUser: boolean;
  updPassSuccess: boolean;
  newEvent: boolean;
}

const AuthContext = createContext({} as any);
const SnackContext = createContext<
    [Snack, React.Dispatch<React.SetStateAction<Snack>>]
>([
    {
      success: false,
      error: false,
      imgSuccess: false,
      addSuccess: false,
      updSuccess: false,
      newChief: false,
      newOlori: false,
      newNews: false,
      newProject: false,
      newUser: false,
      updPassSuccess: false,
      newEvent: false
    },
    () => {}

])

const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState<any>({});
    const [state, setState] = useState<Snack>({
      success: false,
      error: false,
      imgSuccess: false,
      addSuccess: false,
      updSuccess: false,
      newChief: false,
      newOlori: false,
      newNews: false,
      newProject: false,
      newUser: false,
      updPassSuccess: false,
      newEvent: false
     });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <SnackContext.Provider value={[state, setState]}>
        {children}
      </SnackContext.Provider>
    </AuthContext.Provider>
  )
};

export { AuthContext, AuthProvider, SnackContext };