import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDurationComponent } from './choose-duration.component';

describe('ChooseDurationComponent', () => {
  let component: ChooseDurationComponent;
  let fixture: ComponentFixture<ChooseDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
