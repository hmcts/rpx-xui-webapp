import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ScreenNavigationModel} from '../models/screenNavigation.model';

@Injectable()
export abstract class AbstractPageFlow {
  abstract getCurrentPage(): string;

  abstract getNextPage(screensNavigations$: Observable<ScreenNavigationModel[]>): string;

  abstract getLastPage(): string;
}
