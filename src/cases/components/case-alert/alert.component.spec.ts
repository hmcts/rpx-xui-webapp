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
      providers: [
        AlertService
      ]
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

  it('should unsubscribe onDestroy', () => {
    spyOn(component.alertMessageSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.routeSubscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.alertMessageSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.routeSubscription.unsubscribe).toHaveBeenCalled();
  });

});
