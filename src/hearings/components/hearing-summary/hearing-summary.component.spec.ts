import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';
import {caseFlagsRefData, initialState} from '../../hearing.test.data';
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
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                caseFlags: caseFlagsRefData,
              },
            },
            fragment: of('point-to-me'),
          },
        }
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
