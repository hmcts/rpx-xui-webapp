import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';
import {caseFlagsRefData, initialState} from '../../hearing.test.data';
import {HearingsPipesModule} from '../../pipes/hearings.pipes.module';
import {HearingActualsComponent} from './hearing-actuals.component';

describe('HearingActualsComponent', () => {
  const routerMock = jasmine.createSpyObj('Router', [
    'navigate'
  ]);
  let component: HearingActualsComponent;
  let fixture: ComponentFixture<HearingActualsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingActualsComponent],
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
    fixture = TestBed.createComponent(HearingActualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
