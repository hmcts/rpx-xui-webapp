import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ScreenNavigationModel} from '../models/screenNavigation.model';

@Injectable()
export abstract class AbstractPageFlow {
  public abstract getCurrentPage(): string;

  public abstract getNextPage(screensNavigations$: Observable<ScreenNavigationModel[]>): string;

  public abstract getLastPage(screensNavigations$: Observable<ScreenNavigationModel[]>): string;
}
