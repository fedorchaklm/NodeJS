import dotenv from 'dotenv';

const environment = process.env.NODE_ENV ?? 'production'; 

dotenv.config({
  path: `.env.${environment}`
});

export default {
  environment,
  port: process.env.PORT ?? 80,
  logFile: process.env.LOG_FILE ?? "logs.log",
};
