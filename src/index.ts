import 'module-alias/register';
import { Backoffice } from './config/Backoffice.config';
import logger from '@config/logger/logger.config';

try {
  new Backoffice().start().catch(handleError);
} catch (error) {
  handleError(error);
}

function handleError(e: any) {
  logger.error(e);
}
