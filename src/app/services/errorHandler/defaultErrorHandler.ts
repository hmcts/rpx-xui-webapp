import { ErrorHandler, Injectable} from '@angular/core';
import { XuiLoggerService } from '../logger/xui-logger.service';

@Injectable()
export class DefaultErrorHandler implements ErrorHandler {
  constructor(
    private loggerService: XuiLoggerService
  ) { }

    handleError(error: Error) {
        this.loggerService.error(error);
   }
}
