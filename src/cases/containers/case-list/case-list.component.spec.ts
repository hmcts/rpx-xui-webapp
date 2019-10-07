import {State} from './../../../app/store/reducers/index';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CaseListComponent} from './case-list.component';
import {AppConfig} from '../../../app/services/ccd-config/ccd-case.config';
import {DefinitionsService} from '@hmcts/ccd-case-ui-toolkit/dist/shared/services/definitions/definitions.service';
import {Store} from '@ngrx/store';
import {AppConfigService} from '../../../app/services/config/configuration.services';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CaseFilterToggle, FindCaselistPaginationMetadata} from '../../store/actions/case-list.action';
import {provideMockStore, MockStore} from '@ngrx/store/testing';

describe('CaseListComponent', () => {
  let component: CaseListComponent;
  let fixture: ComponentFixture<CaseListComponent>;
  let store: MockStore<State>;

  /**
   * Spies
   */
  const mockService = jasmine.createSpy();
  let spyOnDispatchToStore = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AppConfigService,
          useClass: mockService
        },
        {
          provide: AppConfig,
          useClass: mockService
        },
        {
          provide: DefinitionsService,
          useClass: mockService
        },
        provideMockStore(),
      ]
    });
    store = TestBed.get(Store);
    spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(CaseListComponent);
    component = fixture.componentInstance;
  }));

  it('should return the toggle button name as \'Hide Filter\' if we have shown ' +
    'the filter', () => {
    expect(component.getToggleButtonName(true)).toEqual('Hide Filter');
  });

  it('should return the toggle button name as \'Show Filter\' if we do not show ' +
    'the filter', () => {
    expect(component.getToggleButtonName(false)).toEqual('Show Filter');
  });

  // TODO: event should show the shape of event object.
  it('should dispatch an action to find the case list pagination metadata.', () => {
    const event = {
      test: 'test',
    };
    component.findCaseListPaginationMetadata(event);
    expect(spyOnDispatchToStore).toHaveBeenCalledWith(new FindCaselistPaginationMetadata(event));
  });

  // TODO: We should always give the payload a proper name, not just payload.
  it('should dispatch an action on toggle of the filter to show and hide the filter.', () => {
    component.toggleFilter();
    expect(spyOnDispatchToStore).toHaveBeenCalledWith(new CaseFilterToggle(true));
  });
});

