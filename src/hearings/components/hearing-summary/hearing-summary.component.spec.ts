import {HttpClientTestingModule} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable, of} from 'rxjs';
import {caseFlagsRefData, initialState} from '../../hearing.test.data';
import {HearingConditions} from '../../models/hearingConditions';
import {Mode} from '../../models/hearings.enum';
import {HearingsPipesModule} from '../../pipes/hearings.pipes.module';
import * as fromHearingStore from '../../store';
import {HearingSummaryComponent} from './hearing-summary.component';

describe('HearingSummaryComponent', () => {
  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl'
  ]);
  let component: HearingSummaryComponent;
  let fixture: ComponentFixture<HearingSummaryComponent>;
  let store: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingSummaryComponent],
      imports: [
        HearingsPipesModule,
        HttpClientTestingModule
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
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
    fixture = TestBed.createComponent(HearingSummaryComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe', () => {
    component.sub = new Observable().subscribe();
    spyOn(component.sub, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.sub.unsubscribe).toHaveBeenCalled();
  });

  it('should change answer', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.mode = Mode.CREATE_EDIT;
    component.changeAnswer('venue', 'hearing/request/venue');
    const hearingCondition: HearingConditions = {
      fragmentId: 'venue',
      mode: Mode.CREATE_EDIT,
    };
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.SaveHearingConditions(hearingCondition));
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('hearing/request/venue');
  });
});
