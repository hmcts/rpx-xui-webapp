import * as http from 'http';
import {JUILogger} from './models';
import * as log4jui from './log4jui';
const logger: JUILogger = log4jui.getLogger('Terminate');

export const terminate = (
  server: http.Server,
  options = { coredump: false, timeout: 500}
) => {
  // Exit function
  const exit = code => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code, reason) => (err, promise) => {
    if (err && err instanceof Error) {
      logger._logger.error(err.message, err.stack);
    }
    logger._logger.debug((new Date()).toUTCString() + ' Unhandled at:', promise, 'reason:', reason, 'code:', code);

    // clean up resources
    // TODO: disconnect from session store gracefully

    // Attempt a graceful shutdown
    server.close(exit);
    setTimeout(exit, options.timeout).unref();
  };
};
