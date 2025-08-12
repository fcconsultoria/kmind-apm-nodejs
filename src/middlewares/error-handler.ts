import { logger } from '../logger';
import * as stackTraceParser from 'stacktrace-parser';

export function errorHandler(err: any, req: any, res: any, next: any) {
  const parsedStack = stackTraceParser.parse(err.stack || '');
  logger.error('Unhandled request error', {
    method: req.method,
    url: req.url,
    error: err.message,
    stack: parsedStack.map(frame => ({
      file: frame.file,
      methodName: frame.methodName,
      lineNumber: frame.lineNumber,
      column: frame.column
    })),
  });

  if (!res.headersSent) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
