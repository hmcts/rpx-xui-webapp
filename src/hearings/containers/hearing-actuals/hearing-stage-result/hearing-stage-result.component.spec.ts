import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingStageResultComponent } from './hearing-stage-result.component';

describe('HearingStageResultComponent', () => {
  let component: HearingStageResultComponent;
  let fixture: ComponentFixture<HearingStageResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingStageResultComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingStageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
