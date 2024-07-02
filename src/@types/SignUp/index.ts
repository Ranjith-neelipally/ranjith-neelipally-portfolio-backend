import { Request } from "express";

export interface SignUpInterface extends Request {
  email: string;
  password: string;
  userName: string;
}
