import { Injector, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DefaultErrorHandler } from './defaultErrorHandler';

describe('Default Error Handler', () => {
    const mockedLoggerService = jasmine.createSpyObj('mockedLoggerService', ['error']);

    fit('Should call Default Error Handler and be returned a DEH instance', () => {
        const injector = Injector.create([]);
        const ngZone = TestBed.get(NgZone);
        spyOn(ngZone, 'runOutsideAngular').and.callFake((fn: Function) => fn());
       const errorHandler = new DefaultErrorHandler(mockedLoggerService, injector, ngZone);
       expect(errorHandler).toBeTruthy();
    });

    it('should be able to call error', () => {
        const injector = Injector.create([]);
        const ngZone = TestBed.get(NgZone);
        spyOn(ngZone, 'runOutsideAngular').and.callFake((fn: Function) => fn());
        const errorHandler = new DefaultErrorHandler(mockedLoggerService, injector, ngZone);
        errorHandler.handleError(new Error('Some Error Message'));
        expect(mockedLoggerService.error).toHaveBeenCalledWith(new Error('Some Error Message'));
    });
});
