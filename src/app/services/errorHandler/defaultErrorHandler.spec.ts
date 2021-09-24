import { Injector, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DefaultErrorHandler } from './defaultErrorHandler';

describe('Default Error Handler', () => {
  const mockedLoggerService = jasmine.createSpyObj('mockedLoggerService', ['error']);

  const injector = {
    get: () => {
    }
  } as unknown as Injector;
  const zone = {
    run: () => {
    }
  } as unknown as NgZone;

  beforeEach(() => {
    spyOn(TestBed.get(Injector), 'get').and.callFake((token) => {
      return token;
    });
  });
  it('Should call Default Error Handler and be returned a DEH instance', () => {
    const errorHandler = new DefaultErrorHandler(mockedLoggerService, injector, zone);
    expect(errorHandler).toBeTruthy();
  });

  it('should be able to call error', () => {
    const errorHandler = new DefaultErrorHandler(mockedLoggerService, injector, zone);
    errorHandler.handleError(new Error('Some Error Message'));
    expect(mockedLoggerService.error).toHaveBeenCalledWith(new Error('Some Error Message'));
  });
});
