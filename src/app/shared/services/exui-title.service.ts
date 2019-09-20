import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OnDestroy, Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class ExUITitleService implements OnDestroy {
  titleSubscription: Subscription;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {

    const title$ =  this.router.events.pipe(
                                      filter(event => event instanceof NavigationEnd),
                                      map(() => {
                                        let child = this.activatedRoute.firstChild;
                                        let title = '';
                                        while (child.firstChild) {
                                          child = child.firstChild;
                                          if (child.snapshot.data.title) {
                                            title = child.snapshot.data.title;
                                          }
                                        }
                                        return title;
                                      })
                                    );

    this.titleSubscription = title$.subscribe((ttl: string) => {
                                                this.titleService.setTitle(ttl);
                                              });
  }
  ngOnDestroy() {
    if (this.titleSubscription) {
      this.titleSubscription.unsubscribe();
    }
  }
}
