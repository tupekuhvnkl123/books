import { Request } from "express";

export type ReqAuth = Request & { user: { userId: string; role: string } };

// declare global {
//   namespace Express {
//     interface Request {
//       user?: { userId: string }; // Add the type of your user here
//     }
//   }
// }

export type UserPayloadType = {
  id: string;
  role: string;
};

export type ReqProvidersAuth = Request & {
  user?: {
    id: string;
    role: string;
  };
};
