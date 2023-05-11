import { RoleCategory, TypeOfRole } from '../../role-access/models';
import { ShowAllocateLinkDirective } from './show-allocate-link.directive';

describe('ShowAllocateLinkDirective', () => {
  const link = document.createElement('a');

  class MockElementRef {
    public nativeElement: HTMLElement = link;
  }

  it('should show the show-allocate-link host ', () => {
    const element = new MockElementRef();
    const directive = new ShowAllocateLinkDirective(element);
    directive.showAllocateRoleLink = true;
    directive.roles = [];
    directive.roleCategory = RoleCategory.JUDICIAL;
    directive.ngOnInit();
    expect(element.nativeElement.style.display).toBe('');
  });

  it('should hide the show-allocate-link host ', () => {
    const element = new MockElementRef();
    const directive = new ShowAllocateLinkDirective(element);
    directive.showAllocateRoleLink = true;
    directive.roles = [
      {
        actorId: '38eb0c5e-29c7-453e-b92d-f2029aaed6c3',
        actions: [
          { id: 'reallocate', title: 'Reallocate' },
          { id: 'remove', title: 'Remove Allocation' }
        ],
        end: null,
        id: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
        location: 'Taylor House',
        name: 'Judge Beech',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
        roleName: TypeOfRole.CaseManager,
        start: '2021-07-13T00:29:10.656Z',
        email: 'test@mail.com'
      }
    ];
    directive.roleCategory = RoleCategory.LEGAL_OPERATIONS;
    directive.ngOnInit();
    expect(element.nativeElement.style.display).toBe('none');
  });
});
