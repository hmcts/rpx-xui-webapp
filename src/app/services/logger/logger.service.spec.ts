import { LoggerService } from './logger.service';

describe('Logger service', () => {
    const mockedMonitoringService = jasmine.createSpyObj('mockedMonitoringService', ['logEvent', 'logException', 'enableCookies']);
    const mockedNgxLogger = jasmine.createSpyObj('mockedNgxLogger', ['trace', 'debug', 'info',
    'log', 'warn', 'error', 'fatal']);
    const mockedSessionStorageService = jasmine.createSpyObj('mockedCookieService', ['getItem']);
    const mockedCryptoWrapper = jasmine.createSpyObj('mockedCryptoWrapper', ['encrypt', 'decrypt']);

    it('should be Truthy', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedSessionStorageService,
        mockedCryptoWrapper);
        expect(service).toBeTruthy();
    });

    it('should be able to call info', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedSessionStorageService,
        mockedCryptoWrapper);
        service.info('message');
        expect(mockedMonitoringService.logEvent).toHaveBeenCalled();
        expect(mockedNgxLogger.info).toHaveBeenCalled();
    });

    it('should be able to call log', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedSessionStorageService,
        mockedCryptoWrapper);
        service.log('message');
        expect(mockedMonitoringService.logEvent).toHaveBeenCalled();
        expect(mockedNgxLogger.log).toHaveBeenCalled();
    });

    it('should be able to call warn', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedSessionStorageService,
        mockedCryptoWrapper);
        service.warn('message');
        expect(mockedMonitoringService.logEvent).toHaveBeenCalled();
        expect(mockedNgxLogger.warn).toHaveBeenCalled();
    });

    it('should be able to call error', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedSessionStorageService,
        mockedCryptoWrapper);
        service.error('message');
        expect(mockedMonitoringService.logException).toHaveBeenCalled();
        expect(mockedNgxLogger.error).toHaveBeenCalled();
    });

    it('should be able to call fatal', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedSessionStorageService,
        mockedCryptoWrapper);
        service.fatal('message');
        expect(mockedMonitoringService.logException).toHaveBeenCalled();
        expect(mockedNgxLogger.fatal).toHaveBeenCalled();
    });

    it('should be able to call debug', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedSessionStorageService,
        mockedCryptoWrapper);
        service.debug('message');
        expect(mockedMonitoringService.logEvent).toHaveBeenCalled();
    });

    it('should be able to call trace', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedSessionStorageService,
        mockedCryptoWrapper);
        service.trace('message');
        expect(mockedMonitoringService.logEvent).toHaveBeenCalled();
        expect(mockedNgxLogger.trace).toHaveBeenCalled();
    });

    it('should be able to get a message', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedSessionStorageService,
        mockedCryptoWrapper);
        // slice off the last two characters of string to ensure no accidental discrepancies
        const expectedMessage = `Message - message, Timestamp - ${Date.now()}`.slice(0, -2);
        const returnedMessage = service.getMessage('message');
        expect(mockedMonitoringService.logEvent).toHaveBeenCalled();
        expect(returnedMessage).not.toBeNull();
        expect(returnedMessage.slice(0, -2)).toBe(expectedMessage);
    });

    describe('enableCookies()', () => {

        it('should make a call to monitoringService', () => {
            const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedSessionStorageService,
            mockedCryptoWrapper);
            service.enableCookies();
            expect(mockedMonitoringService.enableCookies).toHaveBeenCalled();
        });
    });
});
