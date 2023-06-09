import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { UserService } from '../../app/services/user/user.service';
import { ListedHearingViewerHiddenConverter } from './listed-hearing-viewer.hidden.converter';

const userDetails = {
  sessionTimeout: {
    idleModalDisplayTime: 10,
    totalIdleTime: 1
  },
  canShareCases: true,
  userInfo: {
    id: 'someId',
    forename: 'foreName',
    surname: 'surName',
    email: 'email@email.com',
    active: true,
    roles: ['pui-case-manager']
  }
};

describe('ListedHearingViewerHiddenConverter', () => {
  let listedHiddenConverter: ListedHearingViewerHiddenConverter;
  const storeMock = jasmine.createSpyObj('Store', [
    'dispatch', 'pipe'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        {
          provide: UserService,
          useValue: {
            getUserDetails: () => of({
              userInfo: {
                roles: ['roleA', 'roleB']
              }
            })
          }
        }
      ]
    });
    storeMock.pipe.and.returnValue(of(userDetails));
    listedHiddenConverter = new ListedHearingViewerHiddenConverter(storeMock);
  });

  it('should transform hidden of true answer', () => {
    const result$ = listedHiddenConverter.transformHidden();
    const showAnswer = false;
    const expected = cold('(b|)', { b: showAnswer });
    expect(result$).toBeObservable(expected);
  });
});
