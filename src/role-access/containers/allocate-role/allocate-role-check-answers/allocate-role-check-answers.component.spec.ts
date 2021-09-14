import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AnswersComponent } from '../../../components';
import { AllocateRoleNavigationEvent } from '../../../models';
import { ConfirmAllocation } from '../../../store/actions';
import { AllocateRoleCheckAnswersComponent } from './allocate-role-check-answers.component';

describe('AllocateRoleCheckAnswersComponent', () => {
  let component: AllocateRoleCheckAnswersComponent;
  let fixture: ComponentFixture<AllocateRoleCheckAnswersComponent>;
  let mockStore: any;
  const pipeSubject: Subject<any> = new Subject<any>();

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
    mockStore.pipe.and.returnValue(pipeSubject);
    TestBed.configureTestingModule({
      declarations: [ AnswersComponent, AllocateRoleCheckAnswersComponent ],
      providers: [
        {provide: Store, useValue: mockStore}
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AllocateRoleCheckAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the confirm exclusion action with an undefined payroll', () => {
    component.navigationHandler(AllocateRoleNavigationEvent.CONFIRM);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new ConfirmAllocation(undefined));
  });

  it('should throw an error if there is an invalid navigation action', () => {
    expect(() => { component.navigationHandler(AllocateRoleNavigationEvent.CONTINUE); }).toThrow(new Error('Invalid option'));
  });
});
