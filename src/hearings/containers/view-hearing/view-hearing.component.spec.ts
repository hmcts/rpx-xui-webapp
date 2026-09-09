import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { MockRpxTranslatePipe } from '../../../app/shared/test/mock-rpx-translate.pipe';
import { initialState } from '../../hearing.test.data';
import { ViewHearingComponent } from './view-hearing.component';

describe('ViewHearingComponent', () => {
  let component: ViewHearingComponent;
  let fixture: ComponentFixture<ViewHearingComponent>;
  const mockLocation = jasmine.createSpyObj('Location', ['back']);
  const mockRouter = jasmine.createSpyObj('Router', ['getCurrentNavigation', 'navigate']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHearingComponent, MockRpxTranslatePipe],
      providers: [
        {
          provide: Location,
          useValue: mockLocation,
        },
        { provide: Router, useValue: mockRouter },
        provideMockStore({ initialState }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockLocation.back.calls.reset();
    mockRouter.navigate.calls.reset();
    mockRouter.getCurrentNavigation.and.returnValue(null);
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

  it('should return to the case hearings tab after exiting a finalised hearing edit', () => {
    (component as any).returnToCaseHearings = true;

    component.onBack();

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/',
      'cases',
      'case-details',
      'IA',
      'Asylum',
      '1111222233334444',
      'hearings',
    ]);
    expect(mockLocation.back).not.toHaveBeenCalled();
  });
});
