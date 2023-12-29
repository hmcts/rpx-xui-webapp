
@ng @functional_enabled  @functional_debug
Feature: Hearings CR84: Semi automatic and automatic update labels EUI-8905
    https://tools.hmcts.net/jira/browse/EUI-8905
    All scenarios from JIRA

    Background: Setup
        Given I set MOCK with user details with user identifier "HEARING_MANAGER_CR84_ON"
            | roles        | caseworker-privatelaw,caseworker-privatelaw-courtadmin,case-allocator,hearing-manager |
            | roleCategory | LEGAL_OPERATIONS                                                                      |

        Given I set MOCK case "hearingCase" details with reference "Hearing_case"
        Given I set mock case hearings
            | hmcStatus | hearingType | hearingRequestDateTime | lastResponseReceivedDateTime | hearingDaySchedule.hearingStartDateTime | hearingDaySchedule.hearingEndDateTime |
            | LISTED    | TEST_TYPE   | -3                     | 0                            | -3                                      | 2                                     |


        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Hearings" is displayed is "true"

        Given I set mock hearing data for state "LISTED"
        Given I set parties in mock hearing data for state "LISTED"
            | type | partyName       | partyID                  |
            | IND  | Party1 name     | 1234-uytr-7654-asdf-0001 |
            | IND  | Party2 name     | 1234-uytr-7654-asdf-0002 |
            | ORG  | party3 org name | 1234-uytr-7654-asdf-0003 |

        Given I set mock get hearing with with status "LISTED" and values at jsonpath
            | jsonpath                                                  | value                 |
            | $.partyDetails[0].individualDetails.reasonableAdjustments | [RA001]               |
            | $.partyDetails[1].individualDetails.reasonableAdjustments | [RA001]               |
            | $.caseDetails.hmctsInternalCaseName                       | 1234567812345678      |
            | $.caseDetails.publicCaseName                              | Mock case public name |
            | $.hearingDetails.hearingType                              | ABA5-ABC              |
            | $.hearingDetails.hearingWindow.firstDateTimeMustBe        | 2024-12-14T00:00:00   |
            | $.hearingDetails.privateHearingRequiredFlag               | false                 |

        Given I set mock hearings service hearing values with ref "partiesUpdated"
        Given I update mock hearings service hearing values with ref "partiesUpdated" at jsonpaths
            | jsonpath          | value |
            | $.caseFlags.flags | []    |
        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "parties"
            | type | partyName       | partyID                  |
            | IND  | Party1 name     | 1234-uytr-7654-asdf-0001 |
            | IND  | Party2 name     | 1234-uytr-7654-asdf-0002 |
            | ORG  | party3 org name | 1234-uytr-7654-asdf-0003 |

        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "caseFlags"
            | partyID | partyName   | flagParentId | flagId | flagDescription | flagStatus |
            | party_1 | Party1 name | PARENT_0     | RA001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | RA001  | Party2 comment  | ACTIVE     |
            | party_1 | Party1 name | PARENT_0     | OT001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | OT001  | Party2 comment  | ACTIVE     |
        Given I update mock hearings service hearing values with ref "partiesUpdated" at jsonpaths
            | jsonpath                                             | value                 |
            | $.parties[0].individualDetails.reasonableAdjustments | [RA001]               |
            | $.parties[1].individualDetails.reasonableAdjustments | [RA001]               |
            | $.hmctsInternalCaseName                              | 1234567812345678      |
            | $.publicCaseName                                     | Mock case public name |
            | $.caserestrictedFlag                                 | false                 |
            | $.privateHearingRequiredFlag                         | false                 |
            | $.parties[0].partyName                               | Party1 name           |
            | $.hearingWindow.firstDateTimeMustBe                  | 2024-12-14T00:00:00   |



    Scenario: CAT1 and CAT 2 ,Ameded and ACTION NEEDED labels  (Conditions (1) & (4))
        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        # CAT 1 chnages

        Given I update mock hearings service hearing values with ref "partiesUpdated" at jsonpaths
            | jsonpath                            | value               |
            | $.hearingWindow.firstDateTimeMustBe | 2024-12-13T00:00:00 |

        Given I update mock hearings service hearing values with ref "partiesUpdated" at jsonpaths
            | jsonpath                     | value                                      |
            | $.hmctsInternalCaseName      | 1234567812345678 update case internal name |
            | $.publicCaseName             | Case public name                           |
            | $.caserestrictedFlag         | true                                       |
            | $.privateHearingRequiredFlag | true                                       |
            | $.parties[0].partyName       | Party1 name updated                        |

        # CAT 2 change
        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "caseFlags"
            | partyID | partyName   | flagParentId | flagId | flagDescription | flagStatus |
            | party_1 | Party1 name | PARENT_0     | RA001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | RA001  | Party2 comment  | ACTIVE     |
            | party_1 | Party1 name | PARENT_0     | OT001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | OT001  | Party2 comment  | ACTIVE     |
            | party_1 | Party1 name | PARENT_0     | RA0042 | Party1 comment  | ACTIVE     |

        When In hearings tab, I click action "View details" for hearing "TEST_TYPE" under table "Current and upcoming"
        Then I validate view hearing page displayed
        Then I validate view hearing page Edit hearing button displayed is "true"
        When In view hearing page, I click Edit hearing button
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heating labels
            | Heading                                    | Label         |
            | Hearing requirements                       | ACTION NEEDED |
            | Participant attendance                     | ACTION NEEDED |
            | Length, date and priority level of hearing | ACTION NEEDED |

        Then I validate fields displayed in view or edit hearing page
            | field                    | value                                      | changeLinkDisplay | amendedFlagDisplay |
            | Case internal name       | 1234567812345678 update case internal name | false             | true               |
            | Case public name         | Case public name                           | false             | true               |
            | Case restriction         | Yes                                        | false             | true               |
            | Private hearing required | Yes                                        | false             | true               |
            | Reasonable adjustments   | Party1 name updated                        | true              | true               |
            | Reasonable adjustments   | Party2 name                                | true              | false              |


    Scenario: CAT1 only ,Ameded labels (Conditions (1) & (6))
        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        # CAT 1 chnages

        Given I update mock hearings service hearing values with ref "partiesUpdated" at jsonpaths
            | jsonpath                            | value               |
            | $.hearingWindow.firstDateTimeMustBe | 2024-12-14T00:00:00 |

        Given I update mock hearings service hearing values with ref "partiesUpdated" at jsonpaths
            | jsonpath                     | value                                      |
            | $.hmctsInternalCaseName      | 1234567812345678 update case internal name |
            | $.publicCaseName             | Case public name                           |
            | $.caserestrictedFlag         | true                                       |
            | $.privateHearingRequiredFlag | true                                       |
            | $.parties[0].partyName       | Party1 name updated                        |

        When In hearings tab, I click action "View details" for hearing "TEST_TYPE" under table "Current and upcoming"
        Then I validate view hearing page displayed
        Then I validate view hearing page Edit hearing button displayed is "true"
        When In view hearing page, I click Edit hearing button
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heating labels
            | Heading                                    | Label         |
            | Hearing requirements                       |               |
            | Participant attendance                     | ACTION NEEDED |
            | Length, date and priority level of hearing |               |

        Then I validate fields displayed in view or edit hearing page
            | field                    | value                                      | changeLinkDisplay | amendedFlagDisplay |
            | Case internal name       | 1234567812345678 update case internal name | false             | true               |
            | Case public name         | Case public name                           | false             | true               |
            | Case restriction         | Yes                                        | false             | true               |
            | Private hearing required | Yes                                        | false             | true               |
            | Reasonable adjustments   | Party1 name updated                        | true              | true               |
            | Reasonable adjustments   | Party2 name                                | true              | false              |



    Scenario: CAT2 only ,ACTION NEEDED labels (Conditions (3) & (4))
        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        # CAT 1 chnages no changes, this setting to match with SHV

        # CAT 2 change
        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "caseFlags"
            | partyID | partyName   | flagParentId | flagId | flagDescription | flagStatus |
            | party_1 | Party1 name | PARENT_0     | RA001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | RA001  | Party2 comment  | ACTIVE     |
            | party_1 | Party1 name | PARENT_0     | OT001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | OT001  | Party2 comment  | ACTIVE     |
            | party_1 | Party1 name | PARENT_0     | RA0042 | Party1 comment  | ACTIVE     |
        # Given I update mock hearings service hearing values with ref "partiesUpdated" at jsonpaths
        #     | jsonpath                     | value                                      |
        #     | $.parties[0].partyName       | Party1 name updated                        |

        When In hearings tab, I click action "View details" for hearing "TEST_TYPE" under table "Current and upcoming"
        Then I validate view hearing page displayed
        Then I validate view hearing page Edit hearing button displayed is "true"
        When In view hearing page, I click Edit hearing button
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heating labels
            | Heading                                    | Label         |
            | Hearing requirements                       | ACTION NEEDED |
            | Participant attendance                     |               |
            | Length, date and priority level of hearing |               |

        Then I validate fields displayed in view or edit hearing page
            | field                    | value                 | changeLinkDisplay | amendedFlagDisplay |
            | Case internal name       | 1234567812345678      | false             | false              |
            | Case public name         | Mock case public name | false             | false              |
            | Case restriction         | No                    | false             | false              |
            | Private hearing required | No                    | false             | false              |
            | Reasonable adjustments   | Party1 name           | true              | false              |
            | Reasonable adjustments   | Party2 name           | true              | false              |


    Scenario: CAT1 and CAT2 with CAT2 accepted,AMENDED labels (Conditions (2) & (5))
        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        # CAT 1 chnages



        Given I update mock hearings service hearing values with ref "partiesUpdated" at jsonpaths
            | jsonpath                            | value                                      |
            | $.hmctsInternalCaseName             | 1234567812345678 update case internal name |
            | $.publicCaseName                    | Case public name                           |
            | $.caserestrictedFlag                | true                                       |
            | $.privateHearingRequiredFlag        | true                                       |
            | $.parties[0].partyName              | Party1 name updated                        |
            | $.hearingWindow.firstDateTimeMustBe | 2024-12-13T00:00:00                        |

        # CAT 2 change
        Given I update mock hearings service hearing values with ref "partiesUpdated" for field "caseFlags"
            | partyID | partyName   | flagParentId | flagId | flagDescription | flagStatus |
            | party_1 | Party1 name | PARENT_0     | RA001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | RA001  | Party2 comment  | ACTIVE     |
            | party_1 | Party1 name | PARENT_0     | OT001  | Party1 comment  | ACTIVE     |
            | party_2 | Party2 name | PARENT_0     | OT001  | Party2 comment  | ACTIVE     |
            | party_1 | Party1 name | PARENT_0     | RA0042 | Party1 comment  | ACTIVE     |

        When In hearings tab, I click action "View details" for hearing "TEST_TYPE" under table "Current and upcoming"
        Then I validate view hearing page displayed
        Then I validate view hearing page Edit hearing button displayed is "true"
        When In view hearing page, I click Edit hearing button
        Then I validate Edit hearing page displayed

        Then I validate edit hearing section heating labels
            | Heading                                    | Label         |
            | Hearing requirements                       | ACTION NEEDED |
            | Participant attendance                     | ACTION NEEDED |
            | Length, date and priority level of hearing | ACTION NEEDED |


        # Accept Hearing requirements
        When In view or edit hearing page, I click change link for field "Reasonable adjustments"
        Then I am on hearings workflow page "Hearing requirements"
        Then In hearings requirements page, I see case flags displayed for parties
            | partyName   |
            | Party1 name |
            | Party2 name |
        When I click continue in hearing workflow
        Then I validate Edit hearing page displayed

        Then I validate edit hearing section heating labels
            | Heading                                    | Label         |
            | Hearing requirements                       | AMENDED       |
            | Participant attendance                     | ACTION NEEDED |
            | Length, date and priority level of hearing | ACTION NEEDED |
        # end of Accept Hearing requirements

        # Accept participant attendance

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
            | field                                                    | value                               |
            | Will this be a paper hearing?                            | No                                  |
            | What will be the methods of attendance for this hearing? | Hearing channel 1,Hearing channel 2 |
            | How will each participant attend the hearing?            | Party1 name,Hearing channel 1       |
            | How will each participant attend the hearing?            | Party2 name,Hearing channel 1       |
            | How many people will attend the hearing in person?       | 2                                   |
        When I click continue in hearing workflow
        Then I validate Edit hearing page displayed
        Then I validate edit hearing section heating labels
            | Heading                                    | Label         |
            | Hearing requirements                       | AMENDED       |
            | Participant attendance                     | AMENDED       |
            | Length, date and priority level of hearing | ACTION NEEDED |
        # end of Accept participant attendance

        # end of Accept participant attendance

        Then I validate fields displayed in view or edit hearing page
            | field                    | value                                      | changeLinkDisplay | amendedFlagDisplay |
            | Case internal name       | 1234567812345678 update case internal name | false             | true               |
            | Case public name         | Case public name                           | false             | true               |
            | Case restriction         | Yes                                        | false             | true               |
            | Private hearing required | Yes                                        | false             | true               |
            | Reasonable adjustments   | Party1 name updated                        | true              | true               |
            | Reasonable adjustments   | Party2 name                                | true              | false              |

    @functional_debug
    Scenario: No chnages and no labels (Conditions (3) & (6)) and Scenario 6
        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page


        When In hearings tab, I click action "View details" for hearing "TEST_TYPE" under table "Current and upcoming"
        Then I validate view hearing page displayed
        Then I validate view hearing page Edit hearing button displayed is "true"
        When In view hearing page, I click Edit hearing button
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heating labels
            | Heading                                    | Label |
            | Hearing requirements                       |       |
            | Participant attendance                     |       |
            | Length, date and priority level of hearing |       |



        Then I validate fields displayed in view or edit hearing page
            | field                    | value                 | changeLinkDisplay | amendedFlagDisplay |
            | Case internal name       | 1234567812345678      | false             | false              |
            | Case public name         | Mock case public name | false             | false              |
            | Case restriction         | No                    | false             | false              |
            | Private hearing required | No                    | false             | false              |
            | Reasonable adjustments   | Party1 name           | true              | false              |
            | Reasonable adjustments   | Party2 name           | true              | false              |


        # Accept Hearing requirements
        When In view or edit hearing page, I click change link for field "Reasonable adjustments"
        Then I am on hearings workflow page "Hearing requirements"
        Then In hearings requirements page, I see case flags displayed for parties
            | partyName   |
            | Party1 name |
            | Party2 name |
        When I click continue in hearing workflow
        Then I validate Edit hearing page displayed

        Then I validate edit hearing section heating labels
            | Heading                                    | Label |
            | Hearing requirements                       |       |
            | Participant attendance                     |       |
            | Length, date and priority level of hearing |       |
# end of Accept Hearing requirements
