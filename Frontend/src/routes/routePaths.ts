// src/routes/routePaths.ts
export const ROUTES = {
  HOME: "/",
  PURCHASED: "/purchased",
  BOOK: (id: string = ":id") => `/book/${id}`,
  ADMIN: {
    ROOT: "/admin",
    NEW_BOOK: "new-book",
  },
  AUTH: {
    ROOT: "/auth",
    LOGIN: "login",
    REGISTER: "register",
  },
};
