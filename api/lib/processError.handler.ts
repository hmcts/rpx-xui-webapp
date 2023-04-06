import * as process from 'process';
import * as log4jui from './log4jui';
import {JUILogger} from './models';

const logger: JUILogger = log4jui.getLogger('ProcessErrorHandler');

export const processErrorInit = () => {
  process.on('exit', code => {
    logger.info('Process exit event with code: ', code);
  });

  process.on('uncaughtException', err => {
    // tslint:disable-next-line:new-parens
    logger._logger.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    logger._logger.error(err.stack);
  });

  process.on('unhandledRejection', (reason, promise) => {
    // tslint:disable-next-line:new-parens
    logger._logger.error((new Date).toUTCString() + 'Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
  });
};
