import { async } from '@angular/core/testing';
import { SpecificAccessInformationComponent } from './specific-access-information.component';

describe('DescribeExclusionComponent', () => {
  let component: SpecificAccessInformationComponent;
  let mockStore: any;

  beforeEach(async(() => {
    mockStore = jasmine.createSpyObj('mockFormBuilder', ['pipe', 'dispatch']);
    component = new SpecificAccessInformationComponent(mockStore);
  }));

});
