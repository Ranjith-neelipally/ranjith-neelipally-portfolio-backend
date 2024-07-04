import { Request } from "express";

export interface VerifyTokenInterface extends Request {
  authorization?: string;
}
