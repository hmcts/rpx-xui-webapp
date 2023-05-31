import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QueryManagementContainerComponent } from './query-management-container.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rpxTranslate' })
class MockRpxTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

@Component({
  selector: 'ccd-query-write-raise-query',
  template: ''
})
class MockQueryWriteRespondToQueryComponent {}

@Component({
  selector: 'ccd-query-write-raise-query',
  template: ''
})
class MockQueryWriteRaiseQueryComponent {}

describe('QueryManagementContainerComponent', () => {
  let component: QueryManagementContainerComponent;
  let fixture: ComponentFixture<QueryManagementContainerComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        QueryManagementContainerComponent,
        MockQueryWriteRespondToQueryComponent,
        MockQueryWriteRaiseQueryComponent,
        MockRpxTranslatePipe
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: { } } } }
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
      activatedRoute.snapshot = { data: { qid: '123' } } as unknown as ActivatedRouteSnapshot;
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
