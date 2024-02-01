/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="mx-auto max-w-screen-sm text-center py-[20%]">
        <span className="loading loading-spinner text-info"></span>
      </div>
     
    );
  }

  if (user) {
    return children;
  }
};

export default PrivateRoute;
