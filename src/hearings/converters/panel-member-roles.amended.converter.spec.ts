import { of } from 'rxjs';
import { PanelMembersRolesAmendedConverter } from './panel-member-roles.amended.converter';
import { MemberType, RequirementType } from '../models/hearings.enum';

describe('JudgeTypesAmendedConverter', () => {
  let panelMembersRolesAmendedConverter: PanelMembersRolesAmendedConverter;
  let mockState;

  beforeEach(() => {
    panelMembersRolesAmendedConverter = new PanelMembersRolesAmendedConverter();
  });
  it('should transform panel members amended flag based on role type selection', () => {
    mockState = {
      hearingRequest: {
        hearingRequestMainModel: {
          hearingDetails: {
            panelRequirements: {
              panelPreferences: [{
                memberId: '123',
                memberType: MemberType.PANEL_MEMBER,
                requirementType: RequirementType.MUSTINC
              },
              {
                memberId: '321',
                memberType: MemberType.PANEL_MEMBER,
                requirementType: RequirementType.EXCLUDE
              }],
              roleType: ['84']
            }
          }
        }
      },
      hearingRequestToCompare: {
        hearingRequestMainModel: {
          hearingDetails: {
            panelRequirements: {
              panelPreferences: [],
              roleType: ['84', '65']
            }
          }
        }
      }
    };
    const result$ = panelMembersRolesAmendedConverter.transformIsAmended(of(mockState));
    result$.subscribe((result) => {
      expect(result).toBe(true);
    });
  });
});
