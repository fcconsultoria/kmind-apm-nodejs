import { logger } from '../logger';
import { config } from '../config';

export function requestLogger(req: any, res: any, next: any) {
  if (config.logging.debugHttp) {
    logger.info('Incoming HTTP request', {
      method: req.method,
      url: req.originalUrl || req.url,
      headers: req.headers
    });
  }
  next();
}