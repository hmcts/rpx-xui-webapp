import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainErrorPageComponent } from './main-error-page.component';

describe('MainErrorPageComponent', () => {
  let component: MainErrorPageComponent;
  let fixture: ComponentFixture<MainErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainErrorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
