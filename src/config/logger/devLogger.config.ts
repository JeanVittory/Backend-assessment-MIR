import { createLogger, format, transports } from 'winston';
const { printf, combine, timestamp, colorize, errors } = format;

export const developmentLogger = () => {
  const messageFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });
  return createLogger({
    level: 'debug',
    format: combine(colorize(), errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), messageFormat),
    transports: [new transports.Console()],
  });
};
