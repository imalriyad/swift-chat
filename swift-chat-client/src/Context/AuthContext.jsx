/* eslint-disable react/prop-types */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

export const AuthProvider = createContext(null);
const AuthContext = ({ children }) => {
  const axiosPublic = useAxios();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPeople, setShowPeople] = useState(true);
  const [peoples, setPeoples] = useState([]);
  const [createConvo, setConvo] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");


  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubScribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubScribe();
  }, []);

  useEffect(() => {
    axiosPublic.get("/get-user").then((res) => {
      const users = res?.data.filter((people) => people?.email !== user?.email);
      setPeoples(users);
    });
  }, [axiosPublic, user?.email]);

  const authInfo = {
    signUp,
    signIn,
    user,
    loading,
    showPeople,
    setShowPeople,
    peoples,
    createConvo,
    setConvo,
    logout,
    receiverEmail,
    setReceiverEmail,
  
  };
  return (
    <div>
      <AuthProvider.Provider value={authInfo}>{children}</AuthProvider.Provider>
    </div>
  );
};

export default AuthContext;
