import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QueryManagementContainerComponent } from './query-management-container.component';

@Component({
  selector: 'ccd-write-query-management-field',
  template: `
    <p>Query Management write component</p>
  `
})
class WriteQueryManagementFieldComponent { }

describe('QueryManagementContainerComponent', () => {
  let component: QueryManagementContainerComponent;
  let fixture: ComponentFixture<QueryManagementContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QueryManagementContainerComponent, WriteQueryManagementFieldComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryManagementContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Query Management write component in container', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    const writeQueryManagementFieldComponentElement = nativeElement.querySelector('p');
    expect(writeQueryManagementFieldComponentElement.textContent).toContain('Query Management write component');
  });
});
