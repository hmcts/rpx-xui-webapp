import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StaffUserCheckAnswersComponent } from './staff-user-check-answers.component';
import { FilterService } from '@hmcts/rpx-xui-common-lib';
import { Router } from '@angular/router';

describe('StaffUserCheckAnswersComponent', () => {
  let component: StaffUserCheckAnswersComponent;
  let fixture: ComponentFixture<StaffUserCheckAnswersComponent>;
  const mockFilterService: any = {
    getStream: () => jasmine.createSpy(),
    get: () => null,
    persist: jasmine.createSpy(),
    clearSessionAndLocalPersistance: jasmine.createSpy(),
    givenErrors: {
      subscribe: () => null,
      next: () => null,
      unsubscribe: () => null
    }
  };
  const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffUserCheckAnswersComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FilterService, useValue: mockFilterService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUserCheckAnswersComponent);
    component = fixture.componentInstance;
    spyOn(mockFilterService.givenErrors, 'unsubscribe');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resetForm method button call the clearSessionAndLocalPersistance', () => {
    (component as any).resetForm();
    expect(
      mockFilterService.clearSessionAndLocalPersistance
    ).toHaveBeenCalled();
  });

  it('cancel button should call the staff url', () => {
    component.cancel();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/staff');
  });
});
