/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-12 my-[20%] h-12 mx-auto border-4 border-dashed border-black rounded-full animate-spin border-mainColor"></div>
    );
  }

  if (user) {
    return children;
  }
};

export default PrivateRoute;
