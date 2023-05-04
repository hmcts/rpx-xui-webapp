import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import { HearingActualsFinalConfirmationComponent } from './hearing-actuals-final-confirmation.component';

describe('HearingActualsFinalConfirmationComponent', () => {
  let component: HearingActualsFinalConfirmationComponent;
  let fixture: ComponentFixture<HearingActualsFinalConfirmationComponent>;
  let mockStore: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HearingActualsFinalConfirmationComponent],
      providers: [
        provideMockStore({ initialState }), LoadingService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingActualsFinalConfirmationComponent);
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
    component.sub = new Observable().subscribe();
    spyOn(component.sub, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.sub.unsubscribe).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
