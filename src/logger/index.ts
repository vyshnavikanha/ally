import winston from 'winston';

export class Logger {
  private winston: winston.Logger;
  requestId: string = '';
  client: string = '';

  constructor() {
    const formatMeta = winston.format(info => {
      info.client = this.client;
      info.requestId = this.requestId;
      return info;
    });

    this.winston = winston.createLogger({
      level: 'info',
      format: winston.format.combine(winston.format.timestamp(), formatMeta(), winston.format.json()),
      transports: [new winston.transports.Console()],
    });
  }

  setRequestId(requestId: string) {
    this.requestId = requestId;
  }

  setClient(client: string) {
    this.client = client;
  }

  info(message: string, meta?: object) {
    this.winston.info(message, meta);
  }

  error(message: string, meta?: object) {
    this.winston.error(message, meta);
  }

  warn(message: string, meta?: object) {
    this.winston.warn(message, meta);
  }
}
