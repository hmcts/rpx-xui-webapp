import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { CaseViewerContainerComponent } from './case-viewer-container.component';


@Component({
  // tslint:disable-next-line
  selector: 'ccd-case-viewer',
  template: '<p>Tasks Container</p>'
})
class CaseViewerComponent {
  @Input() public caseDetails: CaseView;
}

describe('CaseViewerContainerComponent', () => {
  let component: CaseViewerContainerComponent;
  let fixture: ComponentFixture<CaseViewerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
