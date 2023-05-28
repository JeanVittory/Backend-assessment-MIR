import { developmentLogger } from './devLogger.config';
import { productionLogger } from './prodLogger.config';

let logger: any;

if (process.env.NODE_ENV === 'development') {
  logger = developmentLogger();
} else {
  logger = productionLogger();
}

export default logger;
