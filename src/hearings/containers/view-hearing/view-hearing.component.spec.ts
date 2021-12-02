import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewHearingComponent } from './view-hearing.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ViewHearingComponent', () => {
  let component: ViewHearingComponent;
  let fixture: ComponentFixture<ViewHearingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHearingComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
