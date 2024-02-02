import { useContext } from "react";
import { AuthProvider } from "../Context/AuthContext";

const useAuth = () => {
  const authInfo = useContext(AuthProvider);
  return authInfo;
};

export default useAuth;
