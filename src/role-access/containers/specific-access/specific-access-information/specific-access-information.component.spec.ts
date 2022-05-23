import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorMessageComponent } from '@hmcts/ccd-case-ui-toolkit/dist/shared';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SpecificAccessNavigationEvent } from '../../../models';
import { SpecificAccessInformationComponent } from './specific-access-information.component';
import { StoreModule } from '@ngrx/store';

describe('DescribeExclusionComponent', () => {
  let component: SpecificAccessInformationComponent;
  let mockStore: any;
  let mockFormBuilder: any;
  let formGroup: any;
  mockStore = jasmine.createSpyObj('mockFormBuilder', ['pipe', 'dispatch']);
  mockFormBuilder = jasmine.createSpyObj('mockFormBuilder', ['group']);
  formGroup = jasmine.createSpyObj('formGroup', ['get']);
  formGroup = new FormBuilder().group({
    infoCtrl: 'test',
  });
  mockFormBuilder.group.and.returnValue(formGroup);
  component = new SpecificAccessInformationComponent(
    mockStore,
    mockFormBuilder
  );
  component.error = {};
  component.formGroup = formGroup;
  let fixture: ComponentFixture<SpecificAccessInformationComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterModule, StoreModule.forRoot({})],
      declarations: [SpecificAccessInformationComponent, ErrorMessageComponent],
      providers: [
        FormBuilder,
        {
          provide: Store,
          useValue: mockStore,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SpecificAccessInformationComponent);
    mockStore.pipe.and.returnValue(of({}));
    fixture.detectChanges();
  }));

  afterEach(() => {
    fixture.destroy();
  });

  describe('navigation', () => {
    it('should correctly navigate on click of back link in the navigation handler', () => {
      mockStore.pipe.and.returnValue(of({}));
      component.navigationHandler(SpecificAccessNavigationEvent.BACK);
      expect(mockStore.dispatch).toHaveBeenCalled();
    });
  });

  describe('onDestroy()', () => {
    it('should unsubscribe', () => {
      mockStore.pipe.and.returnValue(of({}));
      component.subscription = new Observable().subscribe();
      spyOn(component.subscription, 'unsubscribe').and.callThrough();
      component.ngOnDestroy();
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
