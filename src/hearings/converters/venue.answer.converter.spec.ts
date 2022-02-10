import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import {VenueAnswerConverter} from './venue.answer.converter';

describe('VenueAnswerConverter', () => {

  let venueAnswerConverter: VenueAnswerConverter;

  beforeEach(() => {
    venueAnswerConverter = new VenueAnswerConverter();
  });

  it('should transform type', () => {
    const STATE: State = initialState.hearings;
    const result$ = venueAnswerConverter.transformAnswer(of(STATE));
    const type = '<ul><li>LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL</li><li>ABERDEEN TRIBUNAL HEARING CENTRE</li></ul>';
    const expected = cold('(b|)', {b: type});
    expect(result$).toBeObservable(expected);
  });

});
