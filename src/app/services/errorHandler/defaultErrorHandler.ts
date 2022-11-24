import { ErrorHandler, Injectable} from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class DefaultErrorHandler implements ErrorHandler {
  constructor(
    private readonly loggerService: LoggerService
  ) { }

    public handleError(error: Error) {
        this.loggerService.error(error);
   }
}
