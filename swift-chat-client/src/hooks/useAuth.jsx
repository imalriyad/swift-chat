import { useContext } from "react";
import { AuthProvider } from "../Context/AuthContext";

const useAuth = () => {
  const { user, signUp, signIn, loading } = useContext(AuthProvider);

  return {user, signUp, signIn, loading};
};

export default useAuth;
