import { getTraceContext } from './tracing';

function log(level: 'info' | 'error', message: string, extra: Record<string, any> = {}, stream: NodeJS.WriteStream) {
  const { traceId, spanId } = getTraceContext();
  stream.write(JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    traceId,
    spanId,
    ...extra
  }) + '\n');
}

export const logger = {
  info: (message: string, extra?: Record<string, any>) => log('info', message, extra, process.stdout),
  error: (message: string, extra?: Record<string, any>) => log('error', message, extra, process.stderr),
};

export function initOtelLogger() {
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception', { error: err.message, stack: err.stack });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any) => {
    logger.error('Unhandled promise rejection', { reason });
  });
}
