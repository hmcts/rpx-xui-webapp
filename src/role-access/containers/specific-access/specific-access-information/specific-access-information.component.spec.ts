import { async } from '@angular/core/testing';
import { SpecificAccessInformationComponent } from './specific-access-information.component';

describe('DescribeExclusionComponent', () => {
  let component: SpecificAccessInformationComponent;
  let mockStore: any;
  let mockFormBuilder: any;

  beforeEach(async(() => {
    mockStore = jasmine.createSpyObj('mockFormBuilder', ['pipe', 'dispatch']);
    mockFormBuilder = jasmine.createSpyObj('mockFormBuilder', ['group']);
    component = new SpecificAccessInformationComponent(mockStore, mockFormBuilder);
  }));

});
