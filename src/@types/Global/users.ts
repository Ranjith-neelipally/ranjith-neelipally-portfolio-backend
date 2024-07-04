import { Request } from "express";


declare global {
  namespace Express {
    interface Request {
      user: {
        id: any;
        name: string;
        verified: boolean;
        projects: string[];
        email?: string;
      };

      token: string;
    }
  }
}
