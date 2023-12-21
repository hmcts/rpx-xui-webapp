import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { CaseShareComponent } from './case-share.component';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('CaseShareComponent', () => {
  let component: CaseShareComponent;
  let fixture: ComponentFixture<CaseShareComponent>;

  let mockStore: any;
  let dispatchSpy: jasmine.Spy;
  const mockFeatureToggleService = jasmine.createSpyObj('FeatureToggleService', ['getValue']);

  const sharedCases = [{
    caseId: '9417373995765133',
    caseTitle: 'Sam Green Vs Williams Lee',
    sharedWith: [
      {
        idamId: 'u666666',
        firstName: 'Kate',
        lastName: 'Grant',
        email: 'kate.grant@lambbrooks.com'
      }]
  }];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CaseShareComponent, RpxTranslateMockPipe],
      providers: [
        provideMockStore(),
        {
          provide: FeatureToggleService,
          useValue: mockFeatureToggleService
        }
      ]
    }).compileComponents();
    mockStore = TestBed.inject(Store);
    mockFeatureToggleService.getValue.and.returnValue(of(true));
    dispatchSpy = spyOn(mockStore, 'dispatch');
    fixture = TestBed.createComponent(CaseShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deselect case', () => {
    component.deselect(sharedCases);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should synchronize to store', () => {
    component.synchronizeStore(sharedCases);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
