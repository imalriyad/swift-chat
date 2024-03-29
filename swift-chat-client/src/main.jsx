import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.jsx";
import MainLayout from "./MainLayout/MainLayout.jsx";
import AuthContext from "./Context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <Toaster />
        <RouterProvider router={router}>
          <MainLayout></MainLayout>
        </RouterProvider>
      </AuthContext>
    </QueryClientProvider>
  </React.StrictMode>
);
