import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs/internal/observable/of';

import { State } from '../../../../app/store';
import { ChooseRadioOptionComponent } from '../../../components/choose-radio-option/choose-radio-option.component';
import { ExclusionNavigationEvent } from '../../../models';
import { ChooseExclusionComponent } from './choose-exclusion.component';

describe('ChooseExclusionComponent', () => {
  let component: ChooseExclusionComponent;
  let fixture: ComponentFixture<ChooseExclusionComponent>;
  let store: MockStore<State>;

  let spyOnPipeToStore = jasmine.createSpy();
  let spyOnStoreDispatch = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseRadioOptionComponent, ChooseExclusionComponent],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOnPipeToStore = spyOn(store, 'pipe').and.callThrough();
    spyOnStoreDispatch = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(ChooseExclusionComponent);
    component = fixture.componentInstance;
    spyOnPipeToStore.and.returnValue(of([{isCaseAllocator: true}, {}]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check whether user is a case allocator', () => {
    expect(component.options.length).toBe(2);
    spyOnPipeToStore.and.returnValue(of([{isCaseAllocator: false}, {}]));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.options.length).toBe(1);
  });

  it('should correctly navigate on click of continue', () => {
    const navEvent = ExclusionNavigationEvent.CONTINUE;
    component.navigationHandler(navEvent);
    expect(spyOnStoreDispatch).toHaveBeenCalled();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
