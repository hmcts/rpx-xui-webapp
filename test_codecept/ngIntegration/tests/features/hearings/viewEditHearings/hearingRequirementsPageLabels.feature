
@ng @functional_enabled 
Feature: Hearings CR84: Edit Hearing requirement page labels


    Scenario: Amended and Acion needed labels
        Given I set MOCK with user details with user identifier "HEARING_MANAGER_CR84_ON"
            | roles        | caseworker-privatelaw,caseworker-privatelaw-courtadmin,case-allocator,hearing-manager |
            | roleCategory | LEGAL_OPERATIONS                                                                      |

        # Given I set MOCK person with user "IAC_CaseOfficer_R2" and roles "<Roles>,task-supervisor,case-allocator"

        Given I set MOCK case "hearingCase" details with reference "Hearing_case"
        # Given I set MOCK case details "WA_Case" property "jurisdiction.id" as "IA"
        # Given I set MOCK case details "WA_Case" property "case_type.id" as "Asylum"
        Given I set mock case hearings
            | hmcStatus        | hearingType           | hearingRequestDateTime | lastResponseReceivedDateTime | hearingDaySchedule.hearingStartDateTime | hearingDaySchedule.hearingEndDateTime |
            | LISTED           | TEST_TYPE             | -3                     | 0                            | -3                                      | 2                                     |
            | COMPLETED        | TEST_TYPE             | -5                     | -1                           | 2                                       | 4                                     |
            | CANCELLED        | TEST_TYPE             | -5                     | -1                           | 2                                       | 4                                     |
            | AWAITING_ACTUALS | TEST_AWAITING_HEARING | -5                     | -1                           | 2                                       | 4                                     |

        Given I set mock get hearing with with status "LISTED" and values at jsonpath
            | jsonpath                            | value                 |
            | $.caseDetails.hmctsInternalCaseName | 1234567812345678      |
            | $.caseDetails.publicCaseName        | Mock case public name |
            | $.hearingDetails.hearingType        | ABA5-ABC              |
            | $.hearingDetails.hearingType        | ABA5-ABC              |
        Given I set parties in mock hearing data for state "LISTED"
            | type | partyName       | partyID                  |
            | IND | Party1 name | party_1 |
            | IND | Party2 name | party_2 |
            | ORG  | party3 org name | 1234-uytr-7654-asdf-0003 |

        Given I set mock hearings service hearing values with ref "partiesUpdated"
        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "parties"
            | partyName   | partyID |
            | Party1 name | party_1 |
            | Party2 name | party_2 |
        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "caseFlags"
            | partyID | partyName   | flagParentId | flagId | flagDescription | flagStatus |
            | party_1 | Party1 name | PARENT_0     | RA001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | RA001  | Party2 comment  | ACTIVE     |
            | party_1 | Party1 name | PARENT_0     | OT001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | OT001  | Party2 comment  | ACTIVE     |

       

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Hearings" is displayed is "true"


        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "caseFlags"
            | partyId | partyName   | flagParentId | flagId | flagDescription | flagStatus |
            | party_1 | Party1 name | PARENT_0     | RA001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | RA001  | Party2 comment  | ACTIVE     |
            | party_1 | Party1 name | PARENT_0     | OT001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | OT001  | Party2 comment  | ACTIVE     |
            # | party_1 | Party1 name | PARENT_0     | RA0042 | Party1 comment  | ACTIVE     |

        Given I update mock hearings service hearing values with ref "partiesUpdated" at jsonpaths
            | jsonpath                                             | value    |
            | $.parties[0].individualDetails.reasonableAdjustments | [RA0042] |


        When In hearings tab, I click action "View details" for hearing "TEST_TYPE" under table "Current and upcoming"


        Then I validate view hearing page displayed
        Then I validate view hearing page Edit hearing button displayed is "true"
        When In view hearing page, I click Edit hearing button
        Then I validate Edit hearing page displayed


        Then I validate fields displayed in view or edit hearing page
            | field                                 | value  | changeLinkDisplay | amendedFlagDisplay |
            | Status                                | LISTED | false             | false              |
            | Will additional security be required? | No     | true              | false              |


        When In view or edit hearing page, I click change link for field "Reasonable adjustments"
        Then I am on hearings workflow page "Hearing requirements"


        Then debug sleep minutes 30

        Then In hearings requirements page, I see case flags displayed for parties
            | partyName   |
            | Party1 name |
            | Party2 name |
       