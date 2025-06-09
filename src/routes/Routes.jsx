import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddService from "../pages/AddService";
import axios from "axios";
import AllServices from "../pages/AllServices";
import PrivateRoute from "./PrivateRoute";
import ServiceDetails from "../pages/ServiceDetails";
import MyServices from "../pages/MyServices";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/add-service",
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-services",
        element: (
          <PrivateRoute>
            <MyServices></MyServices>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-services",
        loader: () => axios(`${import.meta.env.VITE_API_URL}/services`),
        Component: AllServices,
      },
      {
        path: "/services/:id",
        loader: ({ params }) =>
          axios(`${import.meta.env.VITE_API_URL}/services/${params.id}`),
        Component: ServiceDetails,
      },
    ],
  },
]);
