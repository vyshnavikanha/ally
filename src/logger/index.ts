import winston from 'winston';

export class Logger {
  private winston: winston.Logger;
  requestId: string = '';
  client: string = '';

  constructor() {
    this.winston = winston.createLogger({
      level: 'info',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
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
    this.winston.info(message, this.buildMeta(meta));
  }

  error(message: string, meta?: object) {
    this.winston.error(message, this.buildMeta(meta));
  }

  warn(message: string, meta?: object) {
    this.winston.warn(message, this.buildMeta(meta));
  }

  private buildMeta(meta?: object) {
    const info = { requestId: this.requestId, client: this.client };
    if (!meta) return info;
    if (typeof meta !== 'object') {
      return { message: meta ?? '', ...info };
    }
    return { ...meta, ...info };
  }
}
