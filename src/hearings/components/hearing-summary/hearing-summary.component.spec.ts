import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../hearing.test.data';
import {HearingsPipesModule} from '../../pipes/hearings.pipes.module';
import {HearingSummaryComponent} from './hearing-summary.component';

describe('HearingSummaryComponent', () => {
  const routerMock = jasmine.createSpyObj('Router', [
    'navigate'
  ]);
  let component: HearingSummaryComponent;
  let fixture: ComponentFixture<HearingSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingSummaryComponent],
      imports: [
        HearingsPipesModule
      ],
      providers: [
        provideMockStore({initialState}),
        {
          provide: Router,
          useValue: routerMock
        },
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HearingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
