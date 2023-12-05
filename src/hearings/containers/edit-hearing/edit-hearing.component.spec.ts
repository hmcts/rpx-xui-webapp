import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { caseFlagsRefData, initialState } from '../../hearing.test.data';
import { EditHearingChangeConfig } from '../../models/editHearingChangeConfig.model';
import { HearingConditions } from '../../models/hearingConditions';
import { Mode } from '../../models/hearings.enum';
import * as fromHearingStore from '../../store';
import { EditHearingComponent } from './edit-hearing.component';

fdescribe('EditHearingComponent', () => {
  let component: EditHearingComponent;
  let fixture: ComponentFixture<EditHearingComponent>;
  let store: any;
  const routeMock = {
    snapshot: {
      data: {
        caseFlags: caseFlagsRefData
      }
    },
    fragment: of('point-to-me')
  };
  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [EditHearingComponent],
      providers: [
        LoadingService,
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: ActivatedRoute,
          useValue: routeMock
        }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(EditHearingComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe', () => {
    component.hearingStateSub = of().subscribe();
    spyOn(component.hearingStateSub, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.hearingStateSub.unsubscribe).toHaveBeenCalled();
  });

  it('should focus on the element', () => {
    spyOn(component, 'fragmentFocus');
    component.ngAfterViewInit();
    expect(component.fragmentFocus).toHaveBeenCalled();
  });

  it('should save hearing condition and navigate to change link', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    const hearingCondition: HearingConditions = {
      fragmentId: 'point-to-me',
      mode: Mode.CREATE_EDIT
    };
    const editHearingChangeConfig: EditHearingChangeConfig = {
      fragmentId: 'point-to-me',
      changeLink: 'hearing/request/venue'
    };
    component.onChange(editHearingChangeConfig);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.SaveHearingConditions(hearingCondition));
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('hearing/request/venue');
  });
});
