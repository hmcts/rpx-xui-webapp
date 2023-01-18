import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '@hmcts/rpx-xui-common-lib';
import { StaffEditUserContainerComponent } from './staff-edit-user-container.component';

describe('StaffEditUserContainerComponent', () => {
  let component: StaffEditUserContainerComponent;
  let fixture: ComponentFixture<StaffEditUserContainerComponent>;
  const FORM_ID = 'FORM_ID';
  const mockFilterService = {
    givenErrors: {
      next: jasmine.createSpy(),
    },
    clearSessionAndLocalPersistance: jasmine.createSpy()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffEditUserContainerComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                formId: FORM_ID
              }
            }
          }
        },
        { provide: FilterService, useValue: mockFilterService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffEditUserContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set formId from activatedRoute', () => {
    expect(component.formId).toEqual(FORM_ID);
  });

  it('should call clearSessionAndLocalPersistance and clear error from FilterService', () => {
    component.ngOnDestroy();
    expect(mockFilterService.clearSessionAndLocalPersistance).toHaveBeenCalled();
    expect(mockFilterService.givenErrors.next).toHaveBeenCalledWith(null);
  });
});
