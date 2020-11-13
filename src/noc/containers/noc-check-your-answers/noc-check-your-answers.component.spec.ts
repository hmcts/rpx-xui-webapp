import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocCheckYourAnswersComponent } from './noc-check-your-answers.component';

describe('NocCheckYourAnswersComponent', () => {
  let component: NocCheckYourAnswersComponent;
  let fixture: ComponentFixture<NocCheckYourAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocCheckYourAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocCheckYourAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
