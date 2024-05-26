export const DB = {
  HOST: process.env.DB_HOST! as string,
  PORT: Number(process.env.DB_PORT!) as number,
  USER: process.env.DB_USERNAME! as string,
  PASSWORD: process.env.DB_PASSWORD! as string,
  DATABASE: process.env.DB_NAME! as string,
};
