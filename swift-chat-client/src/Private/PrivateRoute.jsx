/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-16 max-w-screen-sm mx-auto text-center my-[20%] border-indigo-400 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
    );
  }

  if (user) {
    return children;
  }
};

export default PrivateRoute;
