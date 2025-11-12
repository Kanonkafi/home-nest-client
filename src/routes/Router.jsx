import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties";
import AddProperty from "../pages/AddProperty";
import MyProperties from "../pages/MyProperties";
import MyRatings from "../pages/MyRatings";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PropertyDetails from "../pages/PropertyDetails";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import UpdateProperty from "../pages/UpdateProperty";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    errorElement: <ErrorPage />, 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-properties",
        element: <AllProperties />,
      },
      {
        path: "/add-property",
        element: (
          <PrivateRoute>
            <AddProperty />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-properties",
        element: (
          <PrivateRoute>
            <MyProperties />
          </PrivateRoute>
        ),
      },

      {
          path: "/update-property/:id",
                    
          element: <PrivateRoute>
            <UpdateProperty />
            </PrivateRoute>,
          
        },

      {
        path: "/my-ratings",
        element: (
          <PrivateRoute>
            <MyRatings />
          </PrivateRoute>
        ),
      },
      {
        path: "/property/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
