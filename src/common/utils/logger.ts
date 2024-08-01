// Logging Utility to prevent leaking sensitive messaging in production
// environment
// TODO: Extend console methods properly.  IE: logger.error, logger.warn, etc.
import { env } from '@/common/utils/envConfig';

function logger(message: string | object): void {
  const { DEPLOY_ENV } = env;
  if (DEPLOY_ENV !== 'production') {
    console.log(message);
  }
}

export default logger;
