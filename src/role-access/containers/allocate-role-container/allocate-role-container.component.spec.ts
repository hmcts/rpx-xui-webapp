import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs/internal/observable/of';

import { State } from '../../../app/store';
import { RoleAllocationType } from '../../models/enums';

import { AllocateRoleContainerComponent } from './allocate-role-container.component';
import { DescribeExclusionComponent } from '../../../role-access/components';
import { ErrorMessageComponent } from '../../../app/components/error-message/error-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleAllocationConstants } from '../../../role-access/constants';

describe('AllocateRoleContainerComponent', () => {
  let component: AllocateRoleContainerComponent;
  let fixture: ComponentFixture<AllocateRoleContainerComponent>;
  let store: MockStore<State>;

  let spyOnPipeToStore = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue:
          {
            snapshot: {
              data: RoleAllocationConstants.Exclusion,
            },
          }
        }],
      declarations: [AllocateRoleContainerComponent, DescribeExclusionComponent, ErrorMessageComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOnPipeToStore = spyOn(store, 'pipe').and.callThrough();
    fixture = TestBed.createComponent(AllocateRoleContainerComponent);
    component = fixture.componentInstance;
    spyOnPipeToStore.and.returnValue(of([{isCaseAllocator: true}, {}]));
    component.describingExclusion = false;
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
      expect(component.roleAllocationType).toBe(RoleAllocationType.Exclusion);
    });

  });

  describe('describe exclusion', () => {
    it('should submit form when all values are populated', () => {
      spyOn(component, 'continue');
      const container: DebugElement = fixture.debugElement.query(By.css('#submit-button'));
      component.allocationForm.get(component.DESCRIBE_EXCLUSION_CONTROL_NAME).patchValue('some text');
      const button: HTMLButtonElement = container.nativeElement as HTMLButtonElement;
      button.click();
      expect(component.continue).toHaveBeenCalledWith({text: 'some text'}, true);
    });

    it('should set the form to an invalid state if none of the values are populated and display error', () => {
      spyOn(component, 'continue');
      component.error = {
        title: 'There is a problem',
        description: 'Enter exclusion',
        fieldId: 'exclusion-description'
      };
      fixture.detectChanges();
      const buttonDebugElement: DebugElement = fixture.debugElement.query(By.css('#submit-button'));
      const errorDebugElement: DebugElement = fixture.debugElement.query(By.css('.govuk-error-summary__list'));
      const button: HTMLButtonElement = buttonDebugElement.nativeElement as HTMLButtonElement;
      const error: HTMLElement = errorDebugElement.nativeElement as HTMLElement;
      button.click();
      expect(component.continue).toHaveBeenCalledWith({text: ''}, false);
      expect(error.firstChild.firstChild.textContent).toBe('Enter exclusion');
    });

    it('should mark the form as touched when the user submits the form', () => {
      spyOn(component.allocationForm.get('text'), 'markAsTouched');
      component.continue({text: 'some text'}, true);
      expect(component.allocationForm.get('text').markAsTouched).toHaveBeenCalled();
    });
  });

});
