import app from './app.js';
import { createDatabase } from '#config/database.js';
import logger from '#config/logger.js';
import { syncDB } from '#models/index.js';

const PORT = process.env.PORT;

process.on('unhandledRejection', reason => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', err => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

const startServer = async () => {
  try {
    await createDatabase();

    await syncDB();

    logger.info(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`📦 Database: ${process.env.DB_NAME}`);

    app.listen(PORT, () => {
      logger.info(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
