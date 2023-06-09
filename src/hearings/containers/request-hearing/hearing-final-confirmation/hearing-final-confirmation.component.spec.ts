import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import { HearingFinalConfirmationComponent } from './hearing-final-confirmation.component';

describe('HearingFinalConfirmationComponent', () => {
  let component: HearingFinalConfirmationComponent;
  let fixture: ComponentFixture<HearingFinalConfirmationComponent>;
  let mockStore: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HearingFinalConfirmationComponent],
      providers: [
        provideMockStore({ initialState }), LoadingService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingFinalConfirmationComponent);
    component = fixture.componentInstance;
    mockStore = jasmine.createSpyObj('mockStore', ['pipe']);
    mockStore.pipe.and.returnValue(of(initialState.hearings.hearingList));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.caseId).toEqual('1111222233334444');
  });

  it('should unsubscribe', () => {
    component.sub = of().subscribe();
    spyOn(component.sub, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.sub.unsubscribe).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
