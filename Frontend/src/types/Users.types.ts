import { JwtPayload } from "jwt-decode";

export type UserType = {
  id: string;
  name: string;
};

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export type UserJwtPayload = JwtPayload & {
  user: {
    id: string;
    role: UserRole;
  };
};
