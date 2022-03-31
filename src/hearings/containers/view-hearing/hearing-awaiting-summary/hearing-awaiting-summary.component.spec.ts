import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../../hearing.test.data';
import { HearingAwaitingSummaryComponent } from './hearing-awaiting-summary.component';

describe('HearingAwaitingSummaryComponent', () => {
  let component: HearingAwaitingSummaryComponent;
  let fixture: ComponentFixture<HearingAwaitingSummaryComponent>;
  let router: Router;
  let mockStore: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HearingAwaitingSummaryComponent],
      providers: [
        provideMockStore({ initialState }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
    mockStore = TestBed.get(Store);
    mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
    fixture = TestBed.createComponent(HearingAwaitingSummaryComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
