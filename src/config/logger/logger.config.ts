import { developmentLogger } from './devLogger.config';
import { productionLogger } from './prodLogger.config';

let logger = null;

if (process.env.NODE_ENV === 'production') {
  logger = developmentLogger();
} else {
  logger = productionLogger();
}

export default logger;
