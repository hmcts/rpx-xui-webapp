import { TypeOfRole } from '../../../src/role-access/models';
import { CaseRole } from '../interfaces/caseRole';

export const CASEROLES: CaseRole[] = [
  {
    actions: [
      {'id': 'reallocate', 'title': 'Reallocate'},
      {'id': 'remove', 'title': 'Remove Allocation'},
    ],
    email: 'Judge.Beech@mail.com',
    end: "2021-07-23T00:29:10.656Z",
    id: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
    location: 'Taylor House',
    name: 'Judge Beech',
    role: TypeOfRole.LEAD_JUDGE,
    start: '2021-07-13T00:29:10.656Z',
  },
  {
    actions: [
      {'id': 'reallocate', 'title': 'Reallocate'},
      {'id': 'remove', 'title': 'Remove Allocation'},
    ],
    email: 'Kuda.Nyamainashe@mail.com',
    end: null,
    id: 'd90ah606-98e8-47f8-b53c-a7ab77fde22b',
    location: 'Milton Keynes',
    name: 'Kuda Nyamainashe',
    role: TypeOfRole.LEAD_JUDGE,
    start: '2021-05-19T00:29:10.656Z',
  },
  {
    actions: [
      {'id': 'reallocate', 'title': 'Reallocate'},
      {'id': 'remove', 'title': 'Remove Allocation'},
    ],
    email: 'Bisa.Bulter@mail.com',
    end: '2021-08-22T00:29:10.656Z',
    id: 'd90ah606-98e8-47r8-b53c-a7ab77fde22b',
    location: 'Taylor House',
    name: 'Bisa Bulter',
    role: TypeOfRole.CASE_MANAGER,
    start: '2021-08-19T00:29:10.656Z',
  },
];
