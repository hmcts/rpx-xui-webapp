import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { NocNavigationEvent, NocState } from '../../models';
import { UtilsModule } from '../noc-field/utils/utils.module';
import { NocCaseRefComponent } from './noc-case-ref.component';

@Pipe({
  standalone: false,
  name: 'rpxTranslate',
})
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('NocCaseRefComponent', () => {
  let fixture: ComponentFixture<NocCaseRefComponent>;
  let component: NocCaseRefComponent;
  let store;
  let spyOnPipeToStore = jasmine.createSpy();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, UtilsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NocCaseRefComponent, RpxTranslateMockPipe],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(Store);

    spyOnPipeToStore = spyOn(store, 'pipe').and.callThrough();
    spyOnPipeToStore.and.returnValue(of(NocState.START));
    fixture = TestBed.createComponent(NocCaseRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('onSubmit', () => {
    it('should call navigationHandler', () => {
      const navigationHandlerSpy = spyOn(component, 'navigationHandler');
      component.nocNavigationCurrentState = NocState.START;
      component.navEvent = {
        event: NocNavigationEvent.CONTINUE,
        timestamp: 0,
      };
      component.onSubmit();
      expect(navigationHandlerSpy).toHaveBeenCalledWith(NocNavigationEvent.CONTINUE);
    });
  });

  describe('ngAfterViewChecked', () => {
    beforeEach(() => {
      component.errorContainer = jasmine.createSpyObj('errorContainer', ['nativeElement']);
      component.errorContainer.nativeElement = jasmine.createSpyObj('nativeElement', ['scrollIntoView', 'focus']);
    });

    it('should do nothing if there is no scrollToError set', () => {
      component.scrollToError = false;
      component.ngAfterViewChecked();
      expect(component.scrollToError).toBe(false);
      expect(component.errorContainer.nativeElement.scrollIntoView).not.toHaveBeenCalled();
      expect(component.errorContainer.nativeElement.focus).not.toHaveBeenCalled();
    });

    it('should set the component focus on the error messages when relevant', () => {
      component.scrollToError = true;
      component.ngAfterViewChecked();
      expect(component.scrollToError).toBe(false);
      expect(component.errorContainer.nativeElement.scrollIntoView).toHaveBeenCalled();
      expect(component.errorContainer.nativeElement.focus).toHaveBeenCalled();
    });
  });

  describe('navigationHandler', () => {
    it('should dispatch an action when yes is selected', () => {
      const storeDispatchMock = spyOn(store, 'dispatch');
      component.caseRefForm.controls.representing.setValue('yes');
      component.navigationHandler(NocNavigationEvent.CONTINUE);

      expect(storeDispatchMock).toHaveBeenCalled();
    });

    it('should show an inline error and not dispatch when no is selected', () => {
      const storeDispatchMock = spyOn(store, 'dispatch');

      component.caseRefForm.controls.representing.setValue('no');
      component.navigationHandler(NocNavigationEvent.CONTINUE);

      expect(component.cannotProceedErrorMessage).toBe(
        'You cannot continue.\nYou can only use this service if you are representing your client on the Divorce or Dissolution case.'
      );
      expect(storeDispatchMock).not.toHaveBeenCalled();
    });

    it('should show a validation error and not dispatch when no radio option is selected', () => {
      const storeDispatchMock = spyOn(store, 'dispatch');

      component.caseRefForm.controls.representing.setValue(null);
      component.navigationHandler(NocNavigationEvent.CONTINUE);

      expect(component.cannotProceedErrorMessage).toBe('You must select an option to proceed.');
      expect(storeDispatchMock).not.toHaveBeenCalled();
    });
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
