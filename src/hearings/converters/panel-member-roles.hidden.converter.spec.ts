import { of } from 'rxjs';
import { MemberType, RequirementType } from '../models/hearings.enum';
import { PanelMemberRolesHiddenConverter } from './panel-member-roles.hidden.converter';

describe('PanelMemberRolesHiddenConverter', () => {
  let panelMemberRolesHiddenConverter: PanelMemberRolesHiddenConverter;
  let mockState;

  beforeEach(() => {
    panelMemberRolesHiddenConverter = new PanelMemberRolesHiddenConverter();
  });

  it('should transform hidden of false answer', () => {
    mockState = {
      hearingRequest: {
        hearingRequestMainModel: {
          hearingDetails: {
            panelRequirements: {
              panelPreferences: [],
              roleType: ['role1', 'role2']
            }
          }
        }
      }
    };
    const result$ = panelMemberRolesHiddenConverter.transformHidden(of(mockState));
    result$.subscribe((result) => {
      expect(result).toBe(false);
    });
  });

  it('should transform hidden of true answer', () => {
    mockState = {
      hearingRequest: {
        hearingRequestMainModel: {
          hearingDetails: {
            panelRequirements: {
              panelPreferences: [{
                memberID: '123',
                memberType: MemberType.JUDGE,
                requirementType: RequirementType.MUSTINC
              }],
              roleType: []
            }
          }
        }
      }
    };
    const result$ = panelMemberRolesHiddenConverter.transformHidden(of(mockState));
    result$.subscribe(result => {
      expect(result).toBe(true);
    });
  });

  it('should transform hidden of true answer', () => {
    mockState = {
      hearingRequest: {
        hearingRequestMainModel: {
          hearingDetails: {
            panelRequirements: {
              panelPreferences: [{
                memberID: '123',
                memberType: MemberType.JUDGE,
                requirementType: RequirementType.MUSTINC
              }],
              roleType: ['Role1']
            }
          }
        }
      }
    };
    const result$ = panelMemberRolesHiddenConverter.transformHidden(of(mockState));
    result$.subscribe(result => {
      expect(result).toBe(false);
    });
  });
});
