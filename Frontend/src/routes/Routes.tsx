import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppElement from "./AppElement";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import Auth from "../components/Auth/Auth";
import Home from "../components/Home/Home";
import Book from "../components/Book/Book";
import NewBook from "../components/NewBook/NewBook";
import Purchased from "../components/Purchased/Purchased";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppElement />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/purchased", element: <Purchased /> },
        { path: "/new-product/:id", element: <NewBook /> },
        { path: "/book/:id", element: <Book /> },

        {
          path: "/auth",
          element: <Auth />,
          children: [
            { index: true, element: <Navigate to="login" replace /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
