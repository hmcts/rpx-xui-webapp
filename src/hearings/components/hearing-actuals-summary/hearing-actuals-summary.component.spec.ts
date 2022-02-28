import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';
import {caseFlagsRefData, initialState} from '../../hearing.test.data';
import {HearingsPipesModule} from '../../pipes/hearings.pipes.module';
import {HearingActualsSummaryComponent} from './hearing-actuals-summary.component';

describe('HearingActualsComponent', () => {
  const routerMock = jasmine.createSpyObj('Router', [
    'navigate'
  ]);
  let component: HearingActualsSummaryComponent;
  let fixture: ComponentFixture<HearingActualsSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingActualsSummaryComponent],
      imports: [
        HearingsPipesModule,
        RouterTestingModule
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
              params: {
                id: '123'
              },
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
    fixture = TestBed.createComponent(HearingActualsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
