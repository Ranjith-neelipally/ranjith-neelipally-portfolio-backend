import { Request } from "express";

export interface TestimonialsInterface extends Request {
  userName?: string;
  email?: string;
  designation?: string;
  message?: string;
  canEdit?: boolean;
}
