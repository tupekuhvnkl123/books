// src/routes/Routes.tsx
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
import NewBook from "../components/Admin/NewBook/NewBook";
import Purchased from "../components/Purchased/Purchased";
import { ROUTES } from "./routePaths";

const Routes = () => {
  const router = createBrowserRouter(
    [
      {
        path: ROUTES.HOME,
        element: <AppElement />,
        children: [
          { path: ROUTES.HOME, element: <Home /> },
          { path: ROUTES.PURCHASED, element: <Purchased /> },
          { path: ROUTES.BOOK(), element: <Book /> },

          {
            path: ROUTES.ADMIN.ROOT,
            children: [
              { index: true, element: <Navigate to={ROUTES.HOME} replace /> },
              {
                path: ROUTES.ADMIN.NEW_BOOK,
                element: <NewBook />,
              },
            ],
          },

          {
            path: ROUTES.AUTH.ROOT,
            element: <Auth />,
            children: [
              {
                index: true,
                element: <Navigate to={ROUTES.AUTH.LOGIN} replace />,
              },
              {
                path: ROUTES.AUTH.LOGIN,
                element: <Login />,
              },
              {
                path: ROUTES.AUTH.REGISTER,
                element: <Register />,
              },
            ],
          },
        ],
      },
    ],
    {
      future: {
        v7_skipActionErrorRevalidation: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
      },
    }
  );

  return <RouterProvider router={router} />;
};

export default Routes;
