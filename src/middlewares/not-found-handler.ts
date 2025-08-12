import { logger } from '../logger';

export function notFoundHandler(req: any, res: any) {
  logger.error('Route not found', {
    method: req.method,
    url: req.originalUrl || req.url,
    statusCode: 404
  });

  res.status(404).json({
    message: `Cannot ${req.method} ${req.originalUrl || req.url}`,
    error: "Not Found", 
    statusCode: 404
  });
}
