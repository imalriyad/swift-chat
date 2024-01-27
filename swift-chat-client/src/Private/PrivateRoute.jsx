/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Login from "../Authentication/Login";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return; // Early return if still loading
    }

    if (!user && !modalOpened) {
      openModal();
      setModalOpened(true);
    }
  }, [user, modalOpened, isLoading]);

  const openModal = () => {
    document.getElementById("my_modal_4")?.showModal();
  };

  if (isLoading) {
    return (
      <div className="w-16 my-[20%] h-16 mx-auto border-4 border-dashed border-black rounded-full animate-spin border-mainColor"></div>
    );
  }

  if (user) {
    return children;
  }

  if (!user) {
    return (
      <>
        <Login />
      </>
    );
  }
};

export default PrivateRoute;
