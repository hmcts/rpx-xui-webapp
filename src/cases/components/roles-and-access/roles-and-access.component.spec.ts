import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { CASEROLES } from '../../../../api/workAllocation2/constants/roles.mock.data';
import { CaseRolesTableComponent } from '../../../role-access/components/case-roles-table/case-roles-table.component';
import { ExclusionsTableComponent } from '../../../role-access/components/exclusions-table/exclusions-table.component';
import { initialMockState } from '../../../role-access/testing/app-initial-state.mock';
import { ShowAllocateLinkDirective } from '../../directives/show-allocate-link.directive';
import { RolesAndAccessComponent } from './roles-and-access.component';

describe('RolesAndAccessComponent', () => {
  let component: RolesAndAccessComponent;
  let fixture: ComponentFixture<RolesAndAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), ExuiCommonLibModule],
      declarations: [
        RolesAndAccessComponent,
        CaseRolesTableComponent,
        ShowAllocateLinkDirective,
        ExclusionsTableComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesAndAccessComponent);
    component = fixture.componentInstance;
    component.roles = CASEROLES;
    component.locationInfo = initialMockState.appConfig.locationInfo[0];
    fixture.detectChanges();
  });

  it('should display case-roles-table', () => {
    const container: HTMLElement = fixture.debugElement.nativeElement as HTMLElement;
    expect(container.querySelector('exui-case-roles-table')).not.toBeNull();
  });
});
