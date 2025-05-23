export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export type UserJwtPayloadType = {
  id: string;
  role: string;
};
