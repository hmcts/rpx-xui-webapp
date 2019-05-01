import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCaseComponent } from './create-case.component';

describe('CreateCaseComponent', () => {
  let component: CreateCaseComponent;
  let fixture: ComponentFixture<CreateCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
