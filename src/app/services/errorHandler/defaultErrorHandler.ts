import { ErrorHandler, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class DefaultErrorHandler implements ErrorHandler {
  constructor(
    private readonly loggerService: LoggerService
  ) {}

  public handleError(error: Error) {
    console.error('Handling error with DefaultErrorHandler.');
    console.error(error);
    this.loggerService.error(error);
  }
}
