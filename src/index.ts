import { env } from '@/common/utils/envConfig';
import { app } from '@/server';
import logger from '@/common/utils/logger';
import helmet from 'helmet';

// Used to set sensible security headers for the application.  This is to remedy
// the code test did not include values for DEFAULT_HEADERS.
app.use(helmet());

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, DEPLOY_ENV, HOST, PORT } = env;
  logger(
    `Server is on (${DEPLOY_ENV}) on port ${HOST}:${PORT} and in ${NODE_ENV} mode`
  );
});

const onCloseSignal = () => {
  logger('sigint received, shutting down');
  server.close(() => {
    logger('server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
