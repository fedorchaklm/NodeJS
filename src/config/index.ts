import dotenv from "dotenv";

const environment = process.env.NODE_ENV ?? "production";
const isLocal = process.env.LOCAL === 'true';

dotenv.config({
  path: `.env.${environment}`,
});

export default {
  environment,
  port: process.env.PORT ?? 80,
  logFile: process.env.LOG_FILE ?? "logs.log",
  secretKey: process.env.SECRET_KEY!,
  secretKeyForRefreshToken: process.env.SECRET_KEY_FOR_REFRESH_TOKEN!,
  adminName: process.env.NAME!,
  adminEmail: process.env.EMAIL!,
  adminPassword: process.env.PASSWORD!,
  mongoDBConnection: process.env.MONGO_DB_CONNECTION!,
  mongoURI: isLocal ? process.env.MONGO_URI_LOCAL! : process.env.MONGO_URI!,
};
