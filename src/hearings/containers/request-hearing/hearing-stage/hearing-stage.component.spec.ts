import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingStageComponent } from './hearing-stage.component';

describe('HearingStageComponent', () => {
  let component: HearingStageComponent;
  let fixture: ComponentFixture<HearingStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
