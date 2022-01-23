import winston, { format, transports } from 'winston';

const logger = winston.createLogger({
  format: format.combine(
    format.splat(),
    format.simple(),
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      (info) => `${info.timestamp}  ${info.level} : ${info.message}`,
    ),
  ),
  transports: [new transports.Console()],
});

export { logger };
