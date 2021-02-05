import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { AlertIconClassPipe } from '@hmcts/ccd-case-ui-toolkit/dist/components/banners/alert/alert-icon-class.pipe';
import {
  AlertComponent as CCDAlertComponent,
} from '@hmcts/ccd-case-ui-toolkit/dist/components/banners/alert/alert.component';

import { AlertComponent } from './alert.component';

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

  it('should have updated the value of message in ngOnInit for error, success and warning methods', async () => {
    const alertService = fixture.debugElement.injector.get<AlertService>(AlertService);
    alertService.error('error message');
    alertService.success('success message');
    alertService.warning('warning message');
    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.errorMessage).toEqual('error message');
    expect(component.successMessage).toEqual('success message');
    expect(component.warningMessage).toEqual('warning message');
  });

  it('should unsubscribe onDestroy', () => {
    spyOn(component.errorMessageSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.successMessageSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.warningMessageSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.routeSubscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.errorMessageSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.successMessageSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.warningMessageSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.routeSubscription.unsubscribe).toHaveBeenCalled();
  });

});
