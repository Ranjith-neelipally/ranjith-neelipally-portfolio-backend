import { Request } from "express";

export interface LoginHandler extends Request {
  email?: string;
  password?: string;
}