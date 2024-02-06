import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import App from "../App";
import PrivateRoute from "../Private/PrivateRoute";
import ErrorPage from "../Components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/inbox",
    element: (
      <PrivateRoute>
        <App></App>
      </PrivateRoute>
    ),
  },
]);

export default router;
