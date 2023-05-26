import { createLogger, format, transports } from 'winston';
const { combine, timestamp, colorize, errors, json } = format;

export const productionLogger = () => {
  return createLogger({
    level: 'debug',
    format: combine(errors({ stack: true }), timestamp(), json()),
    transports: [
      new transports.Console(),
      new transports.File({
        dirname: 'logs',
        level: 'debug',
        filename: 'reports.log',
        format: combine(errors({ stack: true }), timestamp(), json()),
      }),
    ],
  });
};
