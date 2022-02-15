import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    username: process.env.USERNAME as string,
    password: process.env.PASSWORD as string,
    database: process.env.DB as string,
    host: process.env.HOST as string,
    dialect: process.env.DIALECT as string,
  },
};

export default config;
