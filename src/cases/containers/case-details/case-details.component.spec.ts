import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CaseDetailsComponent } from './case-details.component';


class MockSortService {
  public features = {};
  public getFeatureToggle() { }
  public cgetEditorConfiguration() { }
}
describe('CaseDetailsComponent', () => {
  let component: CaseDetailsComponent;
  let fixture: ComponentFixture<CaseDetailsComponent>;
  const storeMock = jasmine.createSpyObj('mockStore', ['pipe']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CaseDetailsComponent],
      providers: [
        {
          provide: Store,
          useValue: storeMock
        }

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseDetailsComponent);
    component = fixture.componentInstance;
    storeMock.pipe.and.returnValue(of('dummy'));
    fixture.detectChanges();
  });

  it('should assign case id', () => {
    expect(component.caseId).toEqual('dummy');
  });

  it('should unsubscribe', () => {
    spyOn(component.$caseIdSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.$caseIdSubscription.unsubscribe).toHaveBeenCalled();
  });

});
