import { AlertComponent } from './alert.component';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AlertComponent as CCDAlertComponent } from '@hmcts/ccd-case-ui-toolkit/dist/components/banners/alert/alert.component';
import {AlertIconClassPipe} from '@hmcts/ccd-case-ui-toolkit/dist/components/banners/alert/alert-icon-class.pipe';
import { AlertService, Alert } from '@hmcts/ccd-case-ui-toolkit';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import {ConnectableObservable} from 'rxjs';
import { publish } from 'rxjs/internal/operators/publish';

export class AlertServiceMock {
  alerts = of({message: 'message', level: 'success'}).pipe(
    publish()
  ) as ConnectableObservable<Alert>;
}

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule,
        RouterTestingModule.withRoutes([
        ])
      ],
      declarations: [ AlertComponent, CCDAlertComponent, AlertIconClassPipe ],
      providers: [{ provide: AlertService, useClass: AlertServiceMock }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called draftService.createOrUpdateDraft on saveDraft', async () => {
    const alertService = fixture.debugElement.injector.get(AlertService);
    spyOnProperty(alertService, 'alerts', 'get').and
    .returnValue(of({message: 'message', level: 'success'}).pipe(publish()) as ConnectableObservable<Alert>);
    // spyOn(alertService, 'alerts').and.callFake(alert => {
    //   return of({message: 'message', level: 'success'}).pipe(publish()) as ConnectableObservable<Alert>;
    // });
    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.message).toEqual('message');
    expect(component.level).toEqual('success');
  });

  // it('should update alert and messages', fakeAsync(() => {
  //   const alertService = fixture.debugElement.injector.get(AlertService);
  //   const spyAlert = spyOn(alertService, 'alerts').and
  //   .returnValue(of({message: 'message', level: 'success'}).pipe(publish()) as ConnectableObservable<Alert>);
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   expect(component.message).toEqual('message');
  //   expect(component.level).toEqual('success');
  // }));

  it('should unsubscribe onDestroy', () => {
    spyOn(component.alertMessageSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.routeSubscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.alertMessageSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.routeSubscription.unsubscribe).toHaveBeenCalled();
  });

});
