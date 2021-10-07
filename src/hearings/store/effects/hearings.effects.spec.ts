import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HearingsService } from '../../services/hearings.service';
import { HearingsEffects } from './hearings.effects';

describe('Hearings Effects', () => {
  let actions$;
  let effects: HearingsEffects;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'getAllHearings',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HearingsService,
          useValue: hearingsServiceMock,
        },
        HearingsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(HearingsService);

  });

});
