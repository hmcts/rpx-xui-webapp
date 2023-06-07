import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { QueryWriteRaiseQueryComponent, QueryWriteRespondToQueryComponent } from '@hmcts/ccd-case-ui-toolkit';
import { QueryManagementContainerComponent } from './query-management-container.component';

@Pipe({ name: 'rpxTranslate' })
class MockRpxTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('QueryManagementContainerComponent', () => {
  let component: QueryManagementContainerComponent;
  let fixture: ComponentFixture<QueryManagementContainerComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        QueryManagementContainerComponent,
        QueryWriteRaiseQueryComponent,
        QueryWriteRespondToQueryComponent,
        MockRpxTranslatePipe
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: { }, params: { } } } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryManagementContainerComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('showResponseForm - should not show summary', () => {
    component.showResponseForm();
    expect(component.showSummary).toBeFalsy();
  });

  it('confirmDetails - should show summary', () => {
    component.confirmDetails(component.formGroup);
    expect(component.showSummary).toBeTruthy();
  });

  describe('when it does not have a query id', () => {
    it('should not set the query item', () => {
      expect(component.queryItem).toBeUndefined();
    });

    it('should have the ccd-query-write-raise-query component', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('ccd-query-write-raise-query')).toBeTruthy();
    });
  });

  describe('when it has a query id', () => {
    beforeEach(() => {
      activatedRoute.snapshot = { params: { qid: '123' } } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should set the query item', () => {
      expect(component.queryItem).toBeDefined();
    });

    it('should have the ccd-query-write-respond-to-query component', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('ccd-query-write-respond-to-query')).toBeTruthy();
    });
  });
});
