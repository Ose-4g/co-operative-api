import http from 'http';
import connectDB from './db/connectDB';
import app from './app';
import env from './env.config';
import logger from './utils/logger';

const { PORT }: { PORT: string } = env;

const server = http.createServer(app);

//function to ensure database connects before server starts.
const startServer = async (): Promise<void> => {
  logger.info('connecting to the databse');
  await connectDB();
  server.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`
        ################################################
        🛡️  Server listening on port: ${PORT} 🛡️
        ################################################
        SERVER IN ${process.env.NODE_ENV as string} MODE
      `);
    }
  });
};

startServer();
