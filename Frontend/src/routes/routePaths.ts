export const ROUTES = {
  HOME: "/",
  PURCHASED: "/purchased",
  BOOK: "/book",
  ADMIN: {
    ROOT: "/admin",
    NEW_BOOK: "/admin/new-book",
  },
  AUTH: {
    ROOT: "/auth",
    LOGIN: `/auth/login`,
    REGISTER: "/auth/register",
  },
};

export const getBookRoute = (id: string) => `${ROUTES.BOOK}/${id}`;

export const getEditBookRoute = (id: string) =>
  `${ROUTES.ADMIN.NEW_BOOK}?editId=${id}`;
