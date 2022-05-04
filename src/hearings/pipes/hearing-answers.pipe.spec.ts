import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {caseFlagsRefData, hearingPriorityRefData, initialState, partyChannelsRefData} from '../hearing.test.data';
import {AnswerSource, RadioOptions} from '../models/hearings.enum';
import {LocationByEPIMMSModel} from '../models/location.model';
import {LocationsDataService} from '../services/locations-data.service';
import {State} from '../store/reducers';
import {HearingAnswersPipe} from './hearing-answers.pipe';

describe('HearingAnswersPipe', () => {
  const FOUND_LOCATIONS: LocationByEPIMMSModel[] = [{
    epimms_id: '196538',
    site_name: 'Liverpool Social Security and Child Support Tribunal',
    court_name: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
    open_for_public: 'YES',
    region_id: '5',
    region: 'North West',
    cluster_id: '3',
    cluster_name: 'Cheshire and Merseyside',
    court_status: 'Open',
    court_open_date: null,
    closed_date: null,
    postcode: 'L2 5UZ',
    court_address: 'PRUDENTIAL BUILDING, 36 DALE STREET, LIVERPOOL',
    phone_number: '',
    court_location_code: '',
    dx_address: '',
    welsh_site_name: '',
    welsh_court_address: '',
    venue_name: 'Liverpool',
    is_case_management_location: 'Y',
    is_hearing_location: 'Y'
  }, {
    epimms_id: '234850',
    site_name: 'Cardiff Civil and Family Justice Centre',
    court_name: 'CARDIFF CIVIL AND FAMILY JUSTICE CENTRE',
    open_for_public: 'YES',
    region_id: '8',
    region: 'Wales',
    cluster_id: null,
    cluster_name: null,
    court_status: 'Open',
    court_open_date: null,
    closed_date: null,
    postcode: 'CF10 1ET',
    court_address: 'PARK STREET, CARDIFF',
    phone_number: '',
    court_location_code: '',
    dx_address: '99500 CARDIFF 6',
    welsh_site_name: '',
    welsh_court_address: '',
    venue_name: '',
    is_case_management_location: '',
    is_hearing_location: ''
  }];
  const STATE: State = initialState.hearings;
  let hearingAnswersPipe: HearingAnswersPipe;
  let router: any;
  const locationsDataService = jasmine.createSpyObj('LocationsDataService', ['getLocationById']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingPriorities: hearingPriorityRefData,
                caseFlags: caseFlagsRefData,
                partyChannels: partyChannelsRefData,
              },
            },
          },
        },
        {
          provide: LocationsDataService,
          useValue: locationsDataService
        }
      ]
    });
    router = TestBed.get(ActivatedRoute);
    hearingAnswersPipe = new HearingAnswersPipe(router, locationsDataService);
    locationsDataService.getLocationById.and.returnValue(of(FOUND_LOCATIONS));
  });

  it('should transform additional instructions', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.ADDITIONAL_INSTRUCTION, of(STATE));
    const listingComments = 'blah blah blah';
    const expected = cold('(b|)', {b: listingComments});
    expect(result$).toBeObservable(expected);
  });

  it('should transform case name', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.CASE_NAME, of(STATE));
    const caseName = 'Jane vs DWP';
    const expected = cold('(b|)', {b: caseName});
    expect(result$).toBeObservable(expected);
  });

  it('should transform case number', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.CASE_NUMBER, of(STATE));
    const caseNumber = '1111-2222-3333-4444';
    const expected = cold('(b|)', {b: caseNumber});
    expect(result$).toBeObservable(expected);
  });

  it('should transform type', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.Type, of(STATE));
    const type = 'Personal Independence Payment \n<ul><li>- Conditions of Entitlement</li><li>- Good cause</li><li>- Rate of Assessment / Payability Issues - complex</li></ul>';
    const expected = cold('(b|)', {b: type});
    expect(result$).toBeObservable(expected);
  });

  it('should transform type from request', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.TYPE_FROM_REQUEST, of(STATE));
    const type = 'Personal Independence Payment \n<ul><li>- Conditions of Entitlement</li><li>- Good cause</li><li>- Rate of Assessment / Payability Issues - complex</li></ul>';
    const expected = cold('(b|)', {b: type});
    expect(result$).toBeObservable(expected);
  });

  it('should transform case flag', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.CASE_FLAGS, of(STATE));
    const caseFlags = '<strong class=\'bold\'>Jane and Smith</strong>\n<ul><li>Sign Language Interpreter</li><li>Hearing Loop</li><li>Larger font size</li><li>Reading documents for customer</li><li>Sign Language Interpreter</li><li>Language Interpreter</li></ul><br><strong class=\'bold\'>DWP</strong>\n<ul><li>Physical access and facilities</li></ul><br>';
    const expected = cold('(b|)', {b: caseFlags});
    expect(result$).toBeObservable(expected);
  });

  it('should transform party flags', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.HOW_ATTENDANT, of(STATE));
    const partyFlags = '<ul><li>Jane and Smith - In person</li><li>DWP - By video</li></ul>';
    const expected = cold('(b|)', {b: partyFlags});
    expect(result$).toBeObservable(expected);
  });

  it('should transform number of attendees', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.ATTENDANT_PERSON_AMOUNT, of(STATE));
    const expected = cold('(b|)', {b: '3'});
    expect(result$).toBeObservable(expected);
  });

  it('should transform venue', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.VENUE, of(STATE));
    const caseFlags = '<ul><li>LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL</li><li>CARDIFF CIVIL AND FAMILY JUSTICE CENTRE</li></ul>';
    const expected = cold('(b|)', {b: caseFlags});
    expect(result$).toBeObservable(expected);
  });

  it('should transform need welsh', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.NEED_WELSH, of(STATE));
    const needWelsh = 'Yes';
    const expected = cold('(b|)', {b: needWelsh});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing length', () => {
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 60;
    const result$ = hearingAnswersPipe.transform(AnswerSource.HEARING_LENGTH, of(STATE));
    const hearingDuration = '1 hour(s)';
    const expected = cold('(b|)', {b: hearingDuration});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing specific date', () => {
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow = {
      dateRangeStart: '2022-12-12T09:00:00.000Z',
      dateRangeEnd: '2022-12-12T09:00:00.000Z',
      firstDateTimeMustBe: '',
    };
    const result$ = hearingAnswersPipe.transform(AnswerSource.HEARING_SPECIFIC_DATE, of(STATE));
    const hearingDateRange = `${RadioOptions.CHOOSE_DATE_RANGE}<dt class="heading-h3 bottom-0">Earliest hearing date</dt>12 December 2022<dt class="heading-h3 bottom-0">Latest hearing date</dt>12 December 2022`;
    const expected = cold('(b|)', {b: hearingDateRange});
    expect(result$).toBeObservable(expected);
  });

  it('should transform need hearing priority', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.HEARING_PRIORITY, of(STATE));
    const hearingPriority = 'Standard';
    const expected = cold('(b|)', {b: hearingPriority});
    expect(result$).toBeObservable(expected);
  });

  it('should transform linked hearings', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.LINKED_HEARINGS, of(STATE));
    const linkedHearings = 'No';
    const expected = cold('(b|)', {b: linkedHearings});
    expect(result$).toBeObservable(expected);
  });
});
