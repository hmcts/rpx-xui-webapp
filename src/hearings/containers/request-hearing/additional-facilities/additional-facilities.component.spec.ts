import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalFacilitiesComponent } from './additional-facilities.component';

describe('AdditionalFacilitiesComponent', () => {
  let component: AdditionalFacilitiesComponent;
  let fixture: ComponentFixture<AdditionalFacilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalFacilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
