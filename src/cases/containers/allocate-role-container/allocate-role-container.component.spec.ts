import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs/internal/observable/of';

import { State } from '../../../app/store';
import { AllocationType } from '../../../cases/enums';
import { AllocationConstants } from '../../components/constants';

import { AllocateRoleContainerComponent } from '..';

describe('AllocateRoleContainerComponent', () => {
  let component: AllocateRoleContainerComponent;
  let fixture: ComponentFixture<AllocateRoleContainerComponent>;
  let store: MockStore<State>;

  let spyOnPipeToStore = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule
      ],
      providers: [provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue:
          {
            snapshot: {
              data: AllocationConstants.Exclusion,
            },
          }
        }],
      declarations: [AllocateRoleContainerComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOnPipeToStore = spyOn(store, 'pipe').and.callThrough();
    fixture = TestBed.createComponent(AllocateRoleContainerComponent);
    component = fixture.componentInstance;
    spyOnPipeToStore.and.returnValue(of([{isCaseAllocator: true}, {}]));
    fixture.detectChanges();

  });

  describe('entering page', () => {

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should check whether user is a case allocator', () => {
      expect(component.includeOther).toBe(true);
      spyOnPipeToStore.and.returnValue(of([{isCaseAllocator: false}, {}]));
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.includeOther).toBe(false);
    });

    it('should correctly set the allocation', () => {
      expect(component.allocationType).toBe(AllocationType.Exclusion);
    });

  });

});
