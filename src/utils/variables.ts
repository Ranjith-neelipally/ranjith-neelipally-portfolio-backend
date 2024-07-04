import { config } from "dotenv";
config();

const { env } = process as { env: { [key: string]: string } };

export const {
  MONGO_URI,
  TOKEN_KEY,
  MAIL_TRAP_TOKEN,
  MAILTRAP_USER,
  MAILTRAP_PASSWORD,
  
  ADMIN_MAIL,
} = env;
