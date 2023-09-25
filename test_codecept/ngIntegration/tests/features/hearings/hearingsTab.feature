
@ng 
Feature: Hearings

    Scenario: Hearings tab


        Given I set MOCK with user details
            | roles | caseworker-privatelaw,caseworker-privatelaw-courtadmin,case-allocator |
            | roleCategory | LEGAL_OPERATIONS                         |

        # Given I set MOCK person with user "IAC_CaseOfficer_R2" and roles "<Roles>,task-supervisor,case-allocator"

        Given I set MOCK case "hearingCase" details with reference "Hearing_case"
        # Given I set MOCK case details "WA_Case" property "jurisdiction.id" as "IA"
        # Given I set MOCK case details "WA_Case" property "case_type.id" as "Asylum"

        Given I set mock case hearings
            | hmcStatus | hearingType | hearingRequestDateTime | lastResponseReceivedDateTime | hearingDaySchedule.hearingStartDateTime | hearingDaySchedule.hearingEndDateTime |
            | AWAITING_LISTING | TEST_TYPE | -3 | 0 | -3 | 2 |
            | COMPLETED | TEST_TYPE |-5|-1|2|4|

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Hearings" is displayed is "true"
        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        # Then I see hearings tab displayed

