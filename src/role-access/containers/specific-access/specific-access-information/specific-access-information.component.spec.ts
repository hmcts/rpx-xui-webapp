import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorMessageComponent } from '@hmcts/ccd-case-ui-toolkit/dist/shared';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SpecificAccessNavigationEvent, SpecificAccessState, SpecificAccessStateData } from '../../../models';
import { AccessReason} from '../../../models/enums';
import { SpecificAccessInformationComponent } from './specific-access-information.component';

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
    const specificAccessState: SpecificAccessStateData = {
      state: SpecificAccessState.SPECIFIC_ACCESS_REVIEW,
      accessReason: AccessReason.REQUEST_MORE_INFORMATION,
      typeOfRole: {id: 'specific-access-denied', name: 'specific-access-denied'},
      caseId: '1613568559071553',
      requestId: 'eb7b412d-9e8e-4e1e-8e6f-ad540d455945',
      taskId: '9b440fc1-d9cb-11ec-a8f0-eef41c565753',
      jurisdiction: 'IA',
      comment: 'test',
      roleCategory: 'LEGAL_OPERATIONS',
      requestedRole: 'specific-access-legal-operations',
      person: {id: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8', name: null, domain: null},
    }
    it('should correctly navigate on click of back link in the navigation handler', () => {
      component.specificAccessBody = specificAccessState ;
      component.infoCtrl = new FormControl('');
      mockStore.pipe.and.returnValue(of(specificAccessState));
      component.navigationHandler(SpecificAccessNavigationEvent.CONTINUE);
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
