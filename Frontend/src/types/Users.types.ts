import { JwtPayload } from "jwt-decode";

export type UserType = {
  id: string;
  name: string;
};

export type UserJwtPayload = JwtPayload & {
  user: {
    id: string;
    role: "admin" | "user";
  };
};
