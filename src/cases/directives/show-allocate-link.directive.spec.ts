import { TypeOfRole } from '../../role-access/models';
import { UserType } from '../../../api/user/interfaces/user-type';
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
    directive.userType = UserType.JUDICIAL;
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
          {id: 'reallocate', title: 'Reallocate'},
          {id: 'remove', title: 'Remove Allocation'},
        ],
        end: null,
        id: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
        location: 'Taylor House',
        name: 'Judge Beech',
        role: TypeOfRole.CASE_MANAGER,
        start: '2021-07-13T00:29:10.656Z',
        email: 'test@mail.com'
      },
    ];
    directive.userType = UserType.LEGAL_OPS;
    directive.ngOnInit();
    expect(element.nativeElement.style.display).toBe('none');
  });
});
