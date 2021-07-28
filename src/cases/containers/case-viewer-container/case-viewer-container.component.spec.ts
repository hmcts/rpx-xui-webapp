import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseView, CaseTab } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { CaseViewerContainerComponent } from './case-viewer-container.component';
import {StoreModule} from '@ngrx/store';


@Component({
  // tslint:disable-next-line
  selector: 'ccd-case-viewer',
  template: '<p>Tasks Container</p>'
})
class CaseViewerComponent {
  @Input() public caseDetails: CaseView;
  @Input() public prependedTabs: CaseTab[] = [];
}

describe('CaseViewerContainerComponent', () => {
  let component: CaseViewerContainerComponent;
  let fixture: ComponentFixture<CaseViewerContainerComponent>;
  const mockFeatureToggleService = jasmine.createSpyObj('mockFeatureToggleService', ['getValue'])

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: FeatureToggleService, useValue: mockFeatureToggleService },
      ],
      declarations: [ CaseViewerContainerComponent, CaseViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseViewerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
