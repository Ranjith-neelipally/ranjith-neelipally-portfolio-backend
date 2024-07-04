import { Request } from "express";

export interface VerifyOtpInterface extends Request {
  otp?: string;
  email?: string;
}
