import { AllocateRoleSearchPersonComponent } from './allocate-role-search-person.component';

describe('AllocateRoleSearchPersonComponent', () => {
  let component: AllocateRoleSearchPersonComponent;
  let mockStore: any;
  beforeEach((() => {
    mockStore = jasmine.createSpyObj('mockStore', ['pipe', 'dispatch']);
    component = new AllocateRoleSearchPersonComponent(mockStore);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
