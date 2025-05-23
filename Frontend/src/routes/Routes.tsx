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
import { getBookRoute, ROUTES } from "./routePaths";
import PermissionGate from "../components/HOC/PermissionGate";
import { UserRole } from "../types/Users.types";

const Routes = () => {
  const router = createBrowserRouter(
    [
      {
        path: ROUTES.HOME,
        element: <AppElement />,
        children: [
          { path: ROUTES.HOME, element: <Home /> },
          {
            path: ROUTES.PURCHASED,
            element: (
              <PermissionGate
                roles={[UserRole.USER, UserRole.ADMIN]}
                redirectRoute={ROUTES.AUTH.LOGIN}
              >
                <Purchased />
              </PermissionGate>
            ),
          },
          { path: getBookRoute(":id"), element: <Book /> },

          {
            path: ROUTES.ADMIN.ROOT,
            children: [
              { index: true, element: <Navigate to={ROUTES.HOME} replace /> },
              {
                path: ROUTES.ADMIN.NEW_BOOK,
                element: (
                  <PermissionGate
                    roles={[UserRole.ADMIN]}
                    redirectRoute={ROUTES.HOME}
                  >
                    <NewBook />
                  </PermissionGate>
                ),
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
