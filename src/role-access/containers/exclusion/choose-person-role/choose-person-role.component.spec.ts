import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';

import { State } from '../../../../app/store';
import { ChooseRoleComponent } from '../../../components/choose-role/choose-role.component';
import { ExclusionNavigationEvent } from '../../../models';
import { RoleAllocationType } from '../../../models/enums';
import { ChoosePersonRoleComponent } from './choose-person-role.component';

describe('ChoosePersonRoleComponent', () => {
  let component: ChoosePersonRoleComponent;
  let fixture: ComponentFixture<ChoosePersonRoleComponent>;
  let mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseRoleComponent, ChoosePersonRoleComponent],
      providers: [
        { provide: Store, useValue: mockStore}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePersonRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly set the allocation', () => {
    expect(component.roleAllocation).toBe(RoleAllocationType.Exclusion);
  });

  it('should correctly navigate on click of continue', () => {
    const navEvent = ExclusionNavigationEvent.CONTINUE;
    component.navigationHandler(navEvent);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
