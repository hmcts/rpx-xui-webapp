import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';
import {initialState} from '../../../hearing.test.data';
import {ACTION} from '../../../models/hearings.enum';
import {CaseReferencePipe} from '../../../pipes/case-reference.pipe';
import {HearingsService} from '../../../services/hearings.service';
import {HearingLinkComponent} from './hearing-link.component';

describe('HearingLinkComponent', () => {
  let component: HearingLinkComponent;
  let fixture: ComponentFixture<HearingLinkComponent>;
  let mockStore: any;
  const mockActivatedRoute = {
    snapshot: {
      data: {},
    },
    fragment: of('point-to-me'),
  };
  const mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [CaseReferencePipe, HearingLinkComponent],
      providers: [
        provideMockStore({initialState}),
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HearingsService, useValue: hearingsService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingLinkComponent);
    mockStore = TestBed.get(Store);
    component = fixture.componentInstance;
    spyOn(component, 'isFormValid').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.hearingLinkForm).toBeTruthy();
  });

  it('should validate form and proceed to next step', () => {
    component.executeAction(ACTION.CONTINUE);
    expect(component.isFormValid).toHaveBeenCalled();
  });

  it('should not validate form and proceed to previous step', () => {
    component.executeAction(ACTION.BACK);
    expect(component.hearingRequestMainModel.hearingDetails.hearingIsLinkedFlag).toBe(false);
    expect(component.isFormValid).not.toHaveBeenCalled();
  });

  it('should set the hearing link form control', () => {
    const yesRadioButton = fixture.debugElement.nativeElement.querySelector('#yes');
    yesRadioButton.click();
    fixture.detectChanges();
    expect(component.hearingLinkForm.get('hearingLink').value).toBe('yes');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
