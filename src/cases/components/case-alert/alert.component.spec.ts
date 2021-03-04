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

  it('should have updated the value of message and level in ngOnInit', async () => {
    const alertService = fixture.debugElement.injector.get<AlertService>(AlertService);
    alertService.push({message: 'message', level: 'success'});
    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.message).toEqual('message');
    expect(component.level).toEqual('success');
  });

  it('should unsubscribe onDestroy', () => {
    spyOn(component.alertMessageSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.routeSubscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.alertMessageSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.routeSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('should hyphenate every 4th digit of alert', () => {
    component.message = '1234567890123456';
    expect(component.hyphenate('1234567890123456')).toBe('1234-5678-9012-3456');
  });

});
