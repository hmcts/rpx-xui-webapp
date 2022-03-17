import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ChooseRadioOptionComponent } from '../../../components';
import { SpecificAccessDurationComponent } from './specific-access-duration.component';

describe('SpecificAccessDurationComponent', () => {
  let component: SpecificAccessDurationComponent;
  let fixture: ComponentFixture<SpecificAccessDurationComponent>;
  const mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ChooseRadioOptionComponent, SpecificAccessDurationComponent],
      imports: [ ],
      providers: [
        { provide: Store, useValue: mockStore },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificAccessDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
