import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { provideMockStore } from '@ngrx/store/testing';
import { MockRpxTranslatePipe } from '../../../../app/shared/test/mock-rpx-translate.pipe';
import { initialState } from '../../../hearing.test.data';
import { HearingCompletedSummaryComponent } from './hearing-completed-summary.component';

describe('HearingCompletedSummaryComponent', () => {
  let component: HearingCompletedSummaryComponent;
  let fixture: ComponentFixture<HearingCompletedSummaryComponent>;

  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HearingCompletedSummaryComponent, MockRpxTranslatePipe],
      providers: [
        provideMockStore({ initialState }),
        LoadingService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingStageOptions: [],
              },
              params: {
                id: 'h100010',
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue(null);
  });

  function createComponent(navigationState?: { showEditButton?: boolean; caseRef?: string }): void {
    history.replaceState({}, '');
    (router.getCurrentNavigation as jasmine.Spy).and.returnValue(
      navigationState
        ? ({
            extras: {
              state: navigationState,
            },
          } as any)
        : null
    );
    fixture = TestBed.createComponent(HearingCompletedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should show the edit button when the previous page allows editing', () => {
    createComponent({ showEditButton: true, caseRef: '1111222233334444' });

    const editButton = fixture.debugElement.query(By.css('#edit-hearing-actuals button')).nativeElement;

    expect(component.showEditButton).toBeTrue();
    expect(editButton.textContent).toContain('Edit');
  });

  it('should hide the edit button when the previous page does not allow editing', () => {
    createComponent();

    const editButton = fixture.debugElement.query(By.css('#edit-hearing-actuals button'));

    expect(component.showEditButton).toBeFalse();
    expect(editButton).toBeNull();
  });

  it('should navigate to add/edit actuals when editing', () => {
    createComponent({ showEditButton: true, caseRef: '1111222233334444' });
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.onEdit();

    expect(router.navigate).toHaveBeenCalledWith(['/', 'hearings', 'actuals', 'h100010', 'hearing-actual-add-edit-summary'], {
      state: { caseId: '1111222233334444', hideConfirmButtons: true },
    });
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });
});
