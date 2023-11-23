
@ng @functional_enabled
Feature: Hearings: Semi automatic updates

    @functional_debug
    Scenario: Hearing semi automatic updates Parties
        Given I set MOCK with user details
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

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Hearings" is displayed is "true"

        Given I set mock hearings service hearing values with ref "partiesUpdated"

        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "parties"
            | partyName   |
            | Party1 name |
            | Party2 name |

        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "caseFlags"
            | partyID | partyName   | flagParentId | flagId | flagDescription | flagStatus |
            | party_1 | Party1 name | PARENT_0     | RA001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | RA001  | Party2 comment  | ACTIVE     |

        When In hearings tab, I click action "View or edit" for hearing "TEST_TYPE" under table "Current and upcoming"

        Then I validate view or edit hearing page displayed
        Then I validate fields displayed in view or edit hearing page
            | field                                 | value     | changeLinkDisplay | amendedFlagDisplay |
            | Status                                | COMPLETED | false             | false              |
            | Will additional security be required? | No        | true              | false              |


        When In view or edit hearing page, I click change link for field "Will this be a paper hearing?"
        Then I am on hearings workflow page "Participant attendance"
        When In create hearing page "Participant attendance", I input values
            | field                         | value |
            | Will this be a paper hearing? | No    |
        Then In hearings Participant attendance page, I see parties
            | partyName   |
            | Party1 name |
            | Party2 name |
        
        When In hearing page "Participant attendance", I input values
            | field                                                    | value                                                      |
            | Will this be a paper hearing?                            | No                                                         |
            | What will be the methods of attendance for this hearing? | Hearing channel 1,Hearing channel 2                        |
            | How will each participant attend the hearing?            | Party1 name,Hearing channel 1    |
            | How will each participant attend the hearing?            | Party2 name,Hearing channel 1 |
            | How many people will attend the hearing in person?       | 2                                                         |
        When I click continue in hearing workflow
        Then I validate view or edit hearing page displayed
        When I click button with label "Submit updated request"



    Scenario: Hearing semi automatic updates to Case flags in Reasonable adjustments
        Given I set MOCK with user details
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

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Hearings" is displayed is "true"

        Given I set mock hearings service hearing values with ref "partiesUpdated"

        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "parties"
            | partyName              |
            | Test updated part name |

        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "caseFlags"
            | partyID | partyName | flagParentId | flagId | flagDescription | flagStatus |
            | party_1 | Party1 name | PARENT_0 | RA001 |Party1 comment|ACTIVE|
            | party_2 | Party2 name | PARENT_0 | RA001 | Party2 comment | ACTIVE |

        When In hearings tab, I click action "View or edit" for hearing "TEST_TYPE" under table "Current and upcoming"

        Then I validate view or edit hearing page displayed
        Then I validate fields displayed in view or edit hearing page
            | field  | value     | changeLinkDisplay | amendedFlagDisplay |
            | Status | COMPLETED | false             | false              |
            | Will additional security be required? | No | true | false |


        When In view or edit hearing page, I click change link for field "Reasonable adjustments"
        Then I am on hearings workflow page "Hearing requirements"
        Then In hearings requirements page, I see case flags displayed for parties
            | partyName |
            | Party1 name 1 |
            | Party2 name 1 |

        # Then debug sleep minutes 30


    Scenario: Hearing semi automatic updates to Case flags in Additional facilities
        Given I set MOCK with user details
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

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Hearings" is displayed is "true"

        Given I set mock hearings service hearing values with ref "partiesUpdated"

        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "parties"
            | partyName              |
            | Test updated part name |

        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "caseFlags"
            | partyID | partyName   | flagParentId | flagId | flagDescription | flagStatus |
            | party_1 | Party1 name | PARENT_0 | OT001 | Party1 comment | ACTIVE |
            | party_2 | Party2 name | PARENT_0 | OT001 | Party2 comment | ACTIVE |

        When In hearings tab, I click action "View or edit" for hearing "TEST_TYPE" under table "Current and upcoming"

        Then I validate view or edit hearing page displayed
        Then I validate fields displayed in view or edit hearing page
            | field                                 | value     | changeLinkDisplay | amendedFlagDisplay |
            | Status                                | COMPLETED | false             | false              |
            | Will additional security be required? | No        | true              | false              |


        When In view or edit hearing page, I click change link for field "Select any additional facilities required"
        Then I am on hearings workflow page "Do you require any additional facilities?"
        Then In additional facilities page, I see case flags displayed for parties
            | partyName   |
            | Party1 name 1 |
            | Party2 name 1 |

# Then debug sleep minutes 30


