import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractPageFlow} from './abstract-page-flow';
import {Observable} from 'rxjs';
import {ScreenNavigationModel} from '../models/screenNavigation.model';
import {take} from 'rxjs/operators';

@Injectable()
export class PageFlow implements AbstractPageFlow {
  constructor(private readonly router: Router) {
  }

  public getCurrentPage(): string {
    const urlPaths: string[] = this.router.url.split('/');
    return urlPaths[urlPaths.length - 1];
  }

  public getNextPage(screensNavigations$: Observable<ScreenNavigationModel[]>): string {
    console.log('this.getCurrentPage', this.getCurrentPage());
    let nextPage = '';
    screensNavigations$.pipe(take(1)).subscribe(screenNavigationModels => {
      console.log('screenNavigationModel', screenNavigationModels);
      const screenModel = screenNavigationModels.find(screenNavigationModel =>
        screenNavigationModel.screenName === this.getCurrentPage());
      if (!screenModel.conditionKey) {
        nextPage = screenModel.navigation[0].resultValue;
      } else {
      }
    });
    return nextPage;
  }

  public getLastPage(): string {
    return '';
  }

}
