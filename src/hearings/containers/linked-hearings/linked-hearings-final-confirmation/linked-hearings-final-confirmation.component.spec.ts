import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import { LinkedHearingsFinalConfirmationComponent } from './linked-hearings-final-confirmation.component';

describe('LinkedHearingsFinalConfirmationComponent', () => {
  let component: LinkedHearingsFinalConfirmationComponent;
  let fixture: ComponentFixture<LinkedHearingsFinalConfirmationComponent>;
  let mockStore: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinkedHearingsFinalConfirmationComponent],
      providers: [
        provideMockStore({initialState})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedHearingsFinalConfirmationComponent);
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
