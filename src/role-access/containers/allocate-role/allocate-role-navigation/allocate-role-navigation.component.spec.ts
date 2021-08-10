import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import * as fromStore from '../../../store';
import { AllocateRoleNavigationComponent } from './allocate-role-navigation.component';

describe('AllocateRoleNavigationComponent', () => {
  let component: AllocateRoleNavigationComponent;
  let fixture: ComponentFixture<AllocateRoleNavigationComponent>;
  let store: Store<fromStore.State>;
  let storePipeMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AllocateRoleNavigationComponent
      ],
      providers: [
        provideMockStore(),
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    storePipeMock = spyOn(store, 'pipe');
    fixture = TestBed.createComponent(AllocateRoleNavigationComponent);
    component = fixture.componentInstance;
    storePipeMock.and.returnValue(of(0));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
