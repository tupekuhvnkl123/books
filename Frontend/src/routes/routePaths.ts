// src/routes/routePaths.ts
export const ROUTES = {
  HOME: "/",
  PURCHASED: "/purchased",
  BOOK: (id: string = ":id") => `/book/${id}`,
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
