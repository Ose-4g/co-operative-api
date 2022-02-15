//holds all our environment variables.
//makes it easier to access them withtheir types.

interface Env {
  PORT: string;
  NODE_ENV: string;
  JWT_SECRET: string;
  JWT_EXPIRES: string;
}

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES,
} as Env;
