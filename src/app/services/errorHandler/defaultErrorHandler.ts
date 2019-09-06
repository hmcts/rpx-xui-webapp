import { ErrorHandler, Injectable} from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class DefaultErrorHandler implements ErrorHandler {
  constructor(
    private loggerService: LoggerService
  ) { }

    handleError(error: Error) {
        this.loggerService.error(error);
   }
}
