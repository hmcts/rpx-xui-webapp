import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseShareComponent } from './case-share.component';
import { MockStore } from '@ngrx/store/testing';
import { State } from '../../../app/store/reducers';

describe('CaseShareComponent', () => {
  let component: CaseShareComponent;
  let fixture: ComponentFixture<CaseShareComponent>;
  let store: MockStore<State>;

  /**
   * Spies
   */
  let spyOnDispatchToStore = jasmine.createSpy();
  let spyOnPipeToStore = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
