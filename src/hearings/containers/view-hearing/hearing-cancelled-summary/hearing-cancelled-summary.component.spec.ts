import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockRpxTranslatePipe } from '../../../../app/shared/test/mock-rpx-translate.pipe';
import { hearingActualsMainModel, initialState } from '../../../hearing.test.data';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { HearingCancelledSummaryComponent } from './hearing-cancelled-summary.component';

describe('HearingCancelledSummaryComponent', () => {
  let component: HearingCancelledSummaryComponent;
  let fixture: ComponentFixture<HearingCancelledSummaryComponent>;
  let router: Router;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HearingCancelledSummaryComponent, MockRpxTranslatePipe],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 'h100008',
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    spyOn(router, 'getCurrentNavigation').and.returnValue(null);
  });

  function setHearingActualsMainModel(model: HearingActualsMainModel): void {
    store.setState({
      ...initialState,
      hearings: {
        ...initialState.hearings,
        hearingActuals: {
          ...initialState.hearings.hearingActuals,
          hearingActualsMainModel: model,
        },
      },
    });
  }

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
    fixture = TestBed.createComponent(HearingCancelledSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should show the edit button when the previous page allows editing and hearing actuals exist', () => {
    setHearingActualsMainModel(hearingActualsMainModel);

    createComponent({ showEditButton: true, caseRef: '1111222233334444' });

    const editButton = fixture.debugElement.query(By.css('#edit-hearing-actuals button')).nativeElement;

    expect(component.showEditButton).toBeTrue();
    expect(editButton.textContent).toContain('Edit');
  });

  it('should hide the edit button when the previous page allows editing but hearing actuals do not exist', () => {
    setHearingActualsMainModel({
      ...hearingActualsMainModel,
      hearingActuals: null,
    } as HearingActualsMainModel);

    createComponent({ showEditButton: true, caseRef: '1111222233334444' });

    const editButton = fixture.debugElement.query(By.css('#edit-hearing-actuals button'));

    expect(component.showEditButton).toBeFalse();
    expect(editButton).toBeNull();
  });

  it('should hide the edit button when the previous page does not allow editing', () => {
    setHearingActualsMainModel(hearingActualsMainModel);

    createComponent();

    const editButton = fixture.debugElement.query(By.css('#edit-hearing-actuals button'));

    expect(component.showEditButton).toBeFalse();
    expect(editButton).toBeNull();
  });

  it('should navigate to add/edit actuals when editing', () => {
    setHearingActualsMainModel(hearingActualsMainModel);
    createComponent({ showEditButton: true, caseRef: '1111222233334444' });
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.onEdit();

    expect(router.navigate).toHaveBeenCalledWith(['/', 'hearings', 'actuals', 'h100008', 'hearing-actual-add-edit-summary'], {
      state: { caseId: '1111222233334444', hideConfirmButtons: true },
    });
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });
});
