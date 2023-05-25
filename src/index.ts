import 'module-alias/register';

import { Backoffice } from './config/Backoffice.config';

try {
  new Backoffice().start().catch(handleError);
} catch (error) {
  handleError(error);
}

function handleError(e: any) {
  console.log(e);
}
