import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ViewHearingComponent } from './view-hearing.component';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('ViewHearingComponent', () => {
  let component: ViewHearingComponent;
  let fixture: ComponentFixture<ViewHearingComponent>;
  const mockLocation = jasmine.createSpyObj('Location', ['back']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHearingComponent, RpxTranslateMockPipe],
      providers: [
        {
          provide: Location,
          useValue: mockLocation
        }
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
