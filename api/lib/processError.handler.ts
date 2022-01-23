import * as process from 'process';
import * as log4jui from './log4jui';
import {JUILogger} from './models';

const logger: JUILogger = log4jui.getLogger('ProcessErrorHandler');

export const processErrorInit = (exitHandler: any) => {

    process.on('exit', code => {
        logger.info('Process exit event with code: ', code);
    });

    process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
    process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
    process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
    process.on('SIGINT', exitHandler(0, 'SIGINT'));

};
