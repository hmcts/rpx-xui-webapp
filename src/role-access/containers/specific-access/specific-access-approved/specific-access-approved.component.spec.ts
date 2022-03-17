import { SpecificAccessApprovedComponent } from './specific-access-approved.component';

describe('SpecificAccessApprovedComponent', () => {
  let component: SpecificAccessApprovedComponent;
  let mockStore: any;
  beforeEach((() => {
    mockStore = jasmine.createSpyObj('mockStore', ['pipe', 'dispatch']);
    component = new SpecificAccessApprovedComponent(mockStore);
  }));

});
