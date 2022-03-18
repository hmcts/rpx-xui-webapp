import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewHearingComponent } from './view-hearing.component';

describe('ViewHearingComponent', () => {
  let component: ViewHearingComponent;
  let fixture: ComponentFixture<ViewHearingComponent>;
  const mockLocation = jasmine.createSpyObj('Location', ['back']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHearingComponent],
      providers: [
        {
          provide: Location,
          useValue: mockLocation,
        },
      ],
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

  it('should call back', () => {
    component.onBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
