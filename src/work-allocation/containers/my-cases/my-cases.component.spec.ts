import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, LoadingService, PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule, FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { InfoMessageCommService } from 'src/app/shared/services/info-message-comms.service';
import { SessionStorageService } from '../../../app/services';
import { reducers } from '../../../app/store';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Case } from '../../models/cases';
import { CaseworkerDataService, WorkAllocationCaseService, WorkAllocationFeatureService } from '../../services';
import { getMockCases } from '../../tests/utils.spec';
import { WorkCaseListComponent } from '../work-case-list/work-case-list.component';
import { MyCasesComponent } from './my-cases.component';

@Component({
  template: `<div>Nothing</div>`
})
class NothingComponent { }

@Component({ template: `<exui-my-cases></exui-my-cases>` })

class WrapperComponent {
  @ViewChild(MyCasesComponent, {static: true}) public appComponentRef: MyCasesComponent;
}

xdescribe('MyCasesComponent', () => {
  let component: MyCasesComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  let router: Router;
  const mockCaseService = jasmine.createSpyObj('mockCaseService', ['searchCase', 'getMyCases', 'getMyAccess']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['destroy']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
  const mockCaseworkerService = jasmine.createSpyObj('mockCaseworkerService', ['getAll']);
  const mockFeatureService = jasmine.createSpyObj('mockFeatureService', ['getActiveWAFeature']);
  const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
  const mockFeatureToggleService = jasmine.createSpyObj('mockLoadingService', ['isEnabled']);
  const sessionStorageService = jasmine.createSpyObj('sessionStorageService', ['getItem']);
  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['']);
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        StoreModule.forRoot({...reducers}),
        WorkAllocationComponentsModule,
        PaginationModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'service-down', component: NothingComponent },
          ]
        )
      ],
      declarations: [MyCasesComponent, WrapperComponent, WorkCaseListComponent, NothingComponent],
      providers: [
        { provide: WorkAllocationCaseService, useValue: mockCaseService },
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: CaseworkerDataService, useValue: mockCaseworkerService },
        { provide: WorkAllocationFeatureService, useValue: mockFeatureService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: FeatureToggleService, useValue: mockFeatureToggleService },
        {
          provide: SessionStorageService, useValue: sessionStorageService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    router = TestBed.inject(Router);
    const cases: Case[] = getMockCases();
    mockCaseService.getMyCases.and.returnValue(of({ cases }));
    mockCaseworkerService.getAll.and.returnValue(of([]));
    mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease2'));
    mockFeatureToggleService.isEnabled.and.returnValue(of(false));
    sessionStorageService.getItem.and.callFake((key) => {
      return undefined;
    });
    fixture.whenStable();
    fixture.detectChanges();
  });

 // on merge bookingUi and WA service isPaginationEnabled$ seems not part of component so at this stage it s deactivated
  xit('should make a call to load cases using the default search request my-cases', () => {
    const searchRequest = component.getSearchCaseRequestPagination();
    const payload = { searchRequest, view: component.view };
    expect(mockCaseService.getMyCases).toHaveBeenCalledWith(payload);
    expect(component.cases).toBeDefined();
    expect(component.cases.length).toEqual(2);
  });
  // on merge bookingUi and WA service isPaginationEnabled$ seems not part of component so at this stage it s deactivated
  xit('should have all column headers, including "Manage +"', () => {
    const element = fixture.debugElement.nativeElement;
    const headerCells = element.querySelectorAll('.govuk-table__header');
    const fields = component.fields;
    expect(headerCells).toBeDefined();
    expect(headerCells.length).toEqual(fields.length + 1); // Extra one for Manage +;
    for (let i = 0; i < fields.length; i++) {
      // ensure derivedIcon has no header and every other field does
      if (fields[i].columnLabel) {
        expect(headerCells[i].textContent).toEqual(fields[i].columnLabel);
      } else {
        expect(headerCells[i].textContent).toEqual('');
      }
    }
    // Make sure Manage + heading is blank.
    expect(headerCells[headerCells.length - 1].textContent.trim()).toEqual('');
  });

  xit('should not show the footer when there are cases', () => {
    const element = fixture.debugElement.nativeElement;
    const footerRow = element.querySelector('.footer-row');
    expect(footerRow).toBeDefined();
    const footerRowClass = footerRow.getAttribute('class');
    expect(footerRowClass).toContain('footer-row');
    expect(footerRowClass).not.toContain('shown');
  });

  it('should show the footer when there are no cases', () => {
    spyOnProperty(component, 'cases').and.returnValue([]);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    const footerRow = element.querySelector('.footer-row');
    expect(footerRow).toBeDefined();
    const footerRowClass = footerRow.getAttribute('class');
    expect(footerRowClass).toContain('footer-row');
    expect(footerRowClass).toContain('shown');
    const footerCell = element.querySelector('.cell-footer');
    expect(footerCell).toBeDefined();
    expect(footerCell.textContent.trim()).toEqual(component.emptyMessage);
  });
// took out action handler test as is handled by wrapper component
  afterEach(() => {
    fixture.destroy();
  });
});
