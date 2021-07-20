import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs/internal/observable/of';

import { State } from '../../../../app/store';
import { AllocateRoleComponent } from '../../../components/allocate-role/allocate-role.component';
import { ExclusionNavigationEvent } from '../../../models';
import { RoleAllocationType } from '../../../models/enums';
import { ChooseExclusionComponent } from './choose-exclusion.component';

fdescribe('ChooseExclusionComponent', () => {
  let component: ChooseExclusionComponent;
  let fixture: ComponentFixture<ChooseExclusionComponent>;
  let store: MockStore<State>;

  let spyOnPipeToStore = jasmine.createSpy();
  let spyOnStoreDispatch = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllocateRoleComponent, ChooseExclusionComponent],
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
    expect(component.includeOther).toBe(true);
    spyOnPipeToStore.and.returnValue(of([{isCaseAllocator: false}, {}]));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.includeOther).toBe(false);
  });

  it('should correctly set the allocation', () => {
    expect(component.roleAllocation).toBe(RoleAllocationType.Exclusion);
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
