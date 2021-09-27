import { ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { appRoutePaths } from 'src/app/app.routes';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class DefaultErrorHandler implements ErrorHandler {
   private router: Router;
   constructor(
     private loggerService: LoggerService,
     private injector: Injector,
     private zone: NgZone) { }

   public handleError(error: Error) {
      this.loggerService.error(error);
      this.router =  this.injector.get(Router);
      this.zone.run(() => this.router.navigate([`/${appRoutePaths.mainError}`]));
   }
}
