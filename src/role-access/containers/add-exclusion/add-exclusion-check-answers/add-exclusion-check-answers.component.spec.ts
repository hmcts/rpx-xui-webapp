import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { AnswersComponent } from '../../../components';
import { AddExclusionCheckAnswersComponent } from './add-exclusion-check-answers.component';

describe('AddExclusionCheckAnswersComponent', () => {
  let component: AddExclusionCheckAnswersComponent;
  let fixture: ComponentFixture<AddExclusionCheckAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnswersComponent, AddExclusionCheckAnswersComponent],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExclusionCheckAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
