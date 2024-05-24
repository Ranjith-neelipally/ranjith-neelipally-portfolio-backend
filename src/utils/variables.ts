import { config } from 'dotenv';
config();

const { env } = process as { env: { [key: string]: string } };

export const {
  MONGO_URI,
} = env;