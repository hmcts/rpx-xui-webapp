import { ALL_LOCATIONS } from '../../constants/locations';
import { By } from '@angular/platform-browser';
import { CdkTableModule } from '@angular/cdk/table';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { LocationDataService } from '../../services';
import { MyCasesFilterComponent } from './my-cases-filter.component';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: `<exui-my-cases-filter></exui-my-cases-filter>`
})
class WrapperComponent {
  @ViewChild(MyCasesFilterComponent) public appComponentRef: MyCasesFilterComponent;
}

describe('MyCasesFilterComponent', () => {
  let component: MyCasesFilterComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let router: Router;
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask']);
  const SELECTED_LOCATIONS = { id: 'locations', fields: [ { name: 'locations', value: ['231596', '698118'] }] };
  const mockFilterService: any = {
    getStream: () => of(SELECTED_LOCATIONS),
    get: () => SELECTED_LOCATIONS,
    persist: (setting, persistence) => null,
    givenErrors: {
      subscribe: () => null,
      next: () => null,
      unsubscribe: () => null
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        ExuiCommonLibModule
      ],
      declarations: [MyCasesFilterComponent, WrapperComponent ],
      providers: [
        { provide: LocationDataService, useValue: { getLocations: () => of(ALL_LOCATIONS) } },
        {
          provide: FilterService, useValue: mockFilterService
        },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    router = TestBed.get(Router);
    spyOn(mockFilterService.givenErrors, 'unsubscribe');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show the toggle filter button', () => {
    const button = fixture.debugElement.query(By.css('.govuk-button.hmcts-button--secondary'));
    expect(button.nativeElement.innerText).toContain('Show work filter');
  });

  it('should select two locations', fakeAsync(() => {
    const button = fixture.debugElement.query(By.css('.govuk-button.hmcts-button--secondary'));
    button.nativeElement.click();

    fixture.detectChanges();
    const checkBoxes = fixture.debugElement.query(By.css('.govuk-checkboxes'));
    const firstLocation = checkBoxes.nativeElement.children[0];
    const secondLocation = checkBoxes.nativeElement.children[1];

    firstLocation.click();
    secondLocation.click();

    fixture.detectChanges();
    const applyButton = fixture.debugElement.query(By.css('#applyFilter'));
    applyButton.nativeElement.click();
    expect(component.selectedLocations.length).toEqual(2);

  }));

});
