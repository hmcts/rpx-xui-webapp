import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInstructionComponent } from './additional-instruction.component';

describe('AdditionalInstructionComponent', () => {
  let component: AdditionalInstructionComponent;
  let fixture: ComponentFixture<AdditionalInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
