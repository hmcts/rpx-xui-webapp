import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { staffFilterOptionsTestData } from '../../test-data/staff-filter-options.test.data';
import { StaffAddEditUserContainerComponent } from './staff-add-edit-user-container.component';
import SpyObj = jasmine.SpyObj;

describe('StaffAddEditUserContainerComponent', () => {
  let component: StaffAddEditUserContainerComponent;
  let fixture: ComponentFixture<StaffAddEditUserContainerComponent>;
  let mockRouter: SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['getCurrentNavigation']);

    await TestBed.configureTestingModule({
      declarations: [StaffAddEditUserContainerComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                userTypes: staffFilterOptionsTestData.userTypes,
                jobTitles: staffFilterOptionsTestData.jobTitles,
                skills: staffFilterOptionsTestData.skills,
                services: staffFilterOptionsTestData.services
              }
            }
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAddEditUserContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should patch form values from navigation extras state', () => {
      const formValuesFromState = { name: 'John Doe', email: 'johndoe@example.com' };
      mockRouter.getCurrentNavigation.and.returnValue({
        extras: {
          state: {
            formValues: formValuesFromState
          }
        }
      } as unknown as Navigation);

      // @ts-expect-error - private property
      spyOn(component.staffAddEditFormService, 'patchFormValues');
      // @ts-expect-error - private property
      component.setValuesToFormFromState();
      // @ts-expect-error - private property
      expect(component.staffAddEditFormService.patchFormValues).toHaveBeenCalledWith(formValuesFromState);
    });

    it('should not patch form values if there are no form values in navigation extras state', () => {
      mockRouter.getCurrentNavigation.and.returnValue(null);
      // @ts-expect-error - private property
      spyOn(component.staffAddEditFormService, 'patchFormValues');

      // @ts-expect-error - private property
      component.setValuesToFormFromState();
      // @ts-expect-error - private property
      expect(component.staffAddEditFormService.patchFormValues).not.toHaveBeenCalled();
    });
  });
});
