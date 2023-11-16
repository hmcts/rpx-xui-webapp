import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { ReasonableAdjustmentsAmendedConverter } from './reasonable-adjustments.amended.converter';
import { PartyDetailsModel } from '../models/partyDetails.model';
import * as _ from 'lodash';
import { fakeAsync, tick } from '@angular/core/testing';

fdescribe('ReasonableAdjustmentsAmendedConverter', () => {
  let reasonableAdjustmentsAmendedConverter: ReasonableAdjustmentsAmendedConverter;

  beforeEach(() => {
    reasonableAdjustmentsAmendedConverter = new ReasonableAdjustmentsAmendedConverter();
  });

  it('should be created', () => {
    expect(reasonableAdjustmentsAmendedConverter).toBeTruthy();
  });

  describe('transformIsAmended', () => {
    it('should call checkReasonableAdjustments with correct arguments', () => {
      // Arrange
      let STATE: State = _.cloneDeep(initialState.hearings);
      const mockHearingState$ = of(STATE);
      spyOn(reasonableAdjustmentsAmendedConverter, 'checkReasonableAdjustments').and.callThrough();

      // Act
      reasonableAdjustmentsAmendedConverter.transformIsAmended(mockHearingState$);

      // Assert
      expect(reasonableAdjustmentsAmendedConverter.checkReasonableAdjustments).toHaveBeenCalledWith(
        STATE.hearingRequest.hearingRequestMainModel.partyDetails,
        STATE.hearingRequestToCompare.hearingRequestMainModel.partyDetails
      );
    });

    it('should transform is amended for reasonable adjustment flags if flags are different', () => {
      // Arrange
      reasonableAdjustmentsAmendedConverter = new ReasonableAdjustmentsAmendedConverter();

      let STATE: State = _.cloneDeep(initialState.hearings);
      STATE.hearingRequest.hearingRequestMainModel.partyDetails[0].individualDetails.reasonableAdjustments =  ['RA0042', 'RA0053', 'RA0013', 'RA0016', 'RA0042'];
      STATE.hearingRequestToCompare.hearingRequestMainModel.partyDetails[0].individualDetails.reasonableAdjustments =  ['RA0042', 'RA0053'];

      // Act
      const result$ = reasonableAdjustmentsAmendedConverter.transformIsAmended(of(STATE));
      const isAmended = true;
      const expected = cold('(b|)', { b: isAmended });

      // Assert
      expect(result$).toBeObservable(expected);
    });

    it('should transform is amended for reasonable adjustment flags if flags are the same', () => {
      // Arrange

      let STATE: State = _.cloneDeep(initialState.hearings);
      STATE.hearingRequest.hearingRequestMainModel.partyDetails[0].individualDetails.reasonableAdjustments =  ['RA0042', 'RA0053', 'RA0013', 'RA0016', 'RA0042'];
      STATE.hearingRequestToCompare.hearingRequestMainModel.partyDetails[0].individualDetails.reasonableAdjustments =  ['RA0042', 'RA0053', 'RA00131', 'RA0016', 'RA0042'];

      // Act
      const result$ = reasonableAdjustmentsAmendedConverter.transformIsAmended(of(STATE));
      const isAmended = false;
      const expected = cold('(b|)', { b: isAmended });

      // Assert
      expect(result$).toBeObservable(expected);
    });

  });

  describe('checkReasonableAdjustments', () => {

    it('should return true when reasonable adjustments are not equal for individual party', () => {
      // Arrange

      let STATE: State = _.cloneDeep(initialState.hearings);
      let originalPartyDetails: PartyDetailsModel[] = STATE.hearingRequest.hearingRequestMainModel.partyDetails;
      let partyDetailsToCompare: PartyDetailsModel[] = STATE.hearingRequestToCompare.hearingRequestMainModel.partyDetails;
      originalPartyDetails[0].individualDetails.reasonableAdjustments = ['RA0042', 'RA0053', 'RA0013', 'RA0016', 'RA0042'];
      partyDetailsToCompare[0].individualDetails.reasonableAdjustments = ['RA0042', 'RA0053',];

      // Act
      const result = reasonableAdjustmentsAmendedConverter['checkReasonableAdjustments'](originalPartyDetails, partyDetailsToCompare);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when reasonable adjustments are equal for individual party', () => {
      // Arrange

      let STATE: State = _.cloneDeep(initialState.hearings);
      let originalPartyDetails: PartyDetailsModel[] = STATE.hearingRequest.hearingRequestMainModel.partyDetails;
      let partyDetailsToCompare: PartyDetailsModel[] = STATE.hearingRequestToCompare.hearingRequestMainModel.partyDetails;
      originalPartyDetails[0].individualDetails.reasonableAdjustments = ['RA0042', 'RA0053', 'RA0013', 'RA0016', 'RA0042'];
      partyDetailsToCompare[0].individualDetails.reasonableAdjustments = ['RA0042', 'RA0053', 'RA0013', 'RA0016', 'RA0042'];

      // Act
      const result = reasonableAdjustmentsAmendedConverter['checkReasonableAdjustments'](originalPartyDetails, partyDetailsToCompare);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false if individual party cannot be found', () => {
      // Arrange

      let STATE: State = _.cloneDeep(initialState.hearings);
      let originalPartyDetails: PartyDetailsModel[] = [STATE.hearingRequest.hearingRequestMainModel.partyDetails[1]];
      let partyDetailsToCompare: PartyDetailsModel[] = STATE.hearingRequestToCompare.hearingRequestMainModel.partyDetails;

      // Act
      const result = reasonableAdjustmentsAmendedConverter['checkReasonableAdjustments'](originalPartyDetails, partyDetailsToCompare);

      // Assert
      expect(result).toBe(false);
    });
  });
});
