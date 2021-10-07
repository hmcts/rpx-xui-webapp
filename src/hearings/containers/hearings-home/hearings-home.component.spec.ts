import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingsHomeComponent } from './hearings-home.component';

describe('HearingsHomeComponent', () => {
  let component: HearingsHomeComponent;
  let fixture: ComponentFixture<HearingsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
