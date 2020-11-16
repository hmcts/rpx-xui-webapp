import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocAnswerErrorComponent } from './noc-answer-error.component';

describe('NocAnswerErrorComponent', () => {
  let component: NocAnswerErrorComponent;
  let fixture: ComponentFixture<NocAnswerErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocAnswerErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocAnswerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
