import { RoleType } from '../../../api/workAllocation2/interfaces/caseRole';
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
    directive.userType = 'judicial';
    directive.ngOnInit();
    expect(element.nativeElement.style.display).toBe('');
  });

  it('should hide the show-allocate-link host ', () => {
    const element = new MockElementRef();
    const directive = new ShowAllocateLinkDirective(element);
    directive.showAllocateRoleLink = true;
    directive.roles = [
      {
        actions: [
          {id: 'reallocate', title: 'Reallocate'},
          {id: 'remove', title: 'Remove Allocation'},
        ],
        end: null,
        id: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
        location: 'Taylor House',
        name: 'Judge Beech',
        role: RoleType.CASE_MANAGER,
        start: '2021-07-13T00:29:10.656Z',
      },
    ];
    directive.userType = 'legalOps';
    directive.ngOnInit();
    expect(element.nativeElement.style.display).toBe('none');
  });
});
