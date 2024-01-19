
@ng @functional_enabled     
Feature: Hearings CR84: Semi automatic and automatic update labels EUI-8905
    https://tools.hmcts.net/jira/browse/EUI-8905
    https://tools.hmcts.net/jira/browse/EUI-9504
    All scenarios from JIRA

    Background: Setup
        Given I set MOCK with user details with user identifier "HEARING_MANAGER_CR84_ON"
            | roles        | caseworker-privatelaw,caseworker-privatelaw-courtadmin,case-allocator,hearing-manager |
            | roleCategory | LEGAL_OPERATIONS                                                                      |

        Given I set MOCK case "hearingCase" details with reference "Hearing_case"

        Given I set mock case hearings from file "viewEditHearings/caseHearings"

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed

        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Hearings" is displayed is "true"

        # Given I set mock hearing data for state "LISTED"
        Given I set mock hearing HMC response from file "viewEditHearings/mock_HMC_setup"
        Given I set mock hearing SHV response from file "viewEditHearings/mock_SHV_setup"



    Scenario: SCR_1: CAT1 and CAT 2 ,Ameded and ACTION NEEDED labels  (Conditions (1) & (4))
        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        # CAT 1 chnages
        Given I set mock hearing SHV response from file "viewEditHearings/mock_SHV_SCR_1"

        When In hearings tab, I click action "View or edit" for hearing "TEST_TYPE" under table "Current and upcoming"
        Then I validate view hearing page displayed
        Then I validate view hearing page Edit hearing button displayed is "true"
        When In view hearing page, I click Edit hearing button
        Then I validate Edit hearing page displayed

        Then I validate edit hearing section heading labels
            | Heading                                    | Label         |
            | Hearing requirements                       | ACTION NEEDED |
            | Participant attendance                     | ACTION NEEDED |
            | Additional facilities                      | ACTION NEEDED |
            | Length, date and priority level of hearing | ACTION NEEDED |

        Then I validate fields displayed in view or edit hearing page
            | field                    | value                                      | changeLinkDisplay | amendedFlagDisplay |
            | Case internal name       | 1234567812345678 update case internal name | false             | AMENDED            |
            | Case public name         | Case public name                           | false             | AMENDED            |
            | Case restriction         | Yes                                        | false             | AMENDED            |
            | Private hearing required | Yes                                        | false             | AMENDED            |
            | Reasonable adjustments   | Party1 name updated                        | true              | AMENDED            |
            | Reasonable adjustments   | Party2 name                                | true              |                    |


    Scenario: SCR 2: CAT1 only ,Ameded labels (Conditions (1) & (6))
        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        # CAT 1 chnages
        Given I set mock hearing SHV response from file "viewEditHearings/mock_SHV_SCR_2"

        When In hearings tab, I click action "View or edit" for hearing "TEST_TYPE" under table "Current and upcoming"
        Then I validate view hearing page displayed
        Then I validate view hearing page Edit hearing button displayed is "true"
        When In view hearing page, I click Edit hearing button
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heading labels
            | Heading                                    | Label         |
            | Hearing requirements                       |               |
            | Participant attendance                     | ACTION NEEDED |
            | Additional facilities                      | ACTION NEEDED |
            | Length, date and priority level of hearing | ACTION NEEDED |

        Then I validate fields displayed in view or edit hearing page
            | field                    | value                    | changeLinkDisplay | amendedFlagDisplay |
            | Case internal name       | 1234567812345678 updated | false             | AMENDED            |
            | Case public name | Mock case public name updated | false | AMENDED |
            | Case restriction         | Yes                      | false             | AMENDED            |
            | Private hearing required | Yes                      | false             | AMENDED            |
            | Reasonable adjustments   | Party1 name updated      | true              | AMENDED            |
            | Reasonable adjustments   | Party2 name              | true              |                    |



    Scenario: SCR 3: CAT2 only ,ACTION NEEDED labels (Conditions (3) & (4))
        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        # CAT 1 chnages no changes, this setting to match with SHV

        # CAT 2 change
        Given I set mock hearing SHV response from file "viewEditHearings/mock_SHV_SCR_3"


        When In hearings tab, I click action "View or edit" for hearing "TEST_TYPE" under table "Current and upcoming"
        Then I validate view hearing page displayed
        Then I validate view hearing page Edit hearing button displayed is "true"
        When In view hearing page, I click Edit hearing button
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heading labels
            | Heading                                    | Label         |
            | Hearing requirements                       | ACTION NEEDED |
            | Participant attendance                     |               |
            | Additional facilities                      | ACTION NEEDED |
            | Length, date and priority level of hearing |               |

        Then I validate fields displayed in view or edit hearing page
            | field                    | value                 | changeLinkDisplay | amendedFlagDisplay |
            | Case internal name       | 1234567812345678      | false             |                    |
            | Case public name         | Mock case public name | false             |                    |
            | Case restriction         | No                    | false             |                    |
            | Private hearing required | No                    | false             |                    |
            | Reasonable adjustments   | Party1 name           | true              |                    |
            | Reasonable adjustments   | Party2 name           | true              |                    |



    Scenario: SCR 4: CAT1 and CAT2 with CAT2 accepted,AMENDED labels (Conditions (2) & (5))
        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        # CAT 1 chnages
        Given I set mock hearing SHV response from file "viewEditHearings/mock_SHV_SCR_4"

        When In hearings tab, I click action "View or edit" for hearing "TEST_TYPE" under table "Current and upcoming"
        Then I validate view hearing page displayed
        Then I validate view hearing page Edit hearing button displayed is "true"
        When In view hearing page, I click Edit hearing button
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heading labels
            | Heading                                    | Label         |
            | Hearing requirements                       | ACTION NEEDED |
            | Participant attendance                     | ACTION NEEDED |
            | Additional facilities                      | ACTION NEEDED |
            | Length, date and priority level of hearing | ACTION NEEDED |


        # Accept Hearing requirements
        When In view or edit hearing page, I click change link for field "Reasonable adjustments"
        Then I am on hearings workflow page "Hearing requirements"

        Then In hearings requirements page, I see case flags displayed for parties
            | partyName           |
            | Party1 name updated |
            | Party2 name         |

        Then In hearing requirements page, I see party "Party1 name updated" with case flags
            | flag | label         |
            | A    |               |
            | B    | ACTION NEEDED |
        When I click continue in hearing workflow
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heading labels
            | Heading                                    | Label         |
            | Hearing requirements                       | AMENDED       |
            | Participant attendance                     | ACTION NEEDED |
            | Additional facilities                      | ACTION NEEDED |
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
        Then I validate edit hearing section heading labels
            | Heading                                    | Label         |
            | Hearing requirements                       | AMENDED       |
            | Additional facilities                      | ACTION NEEDED |
            | Participant attendance                     | ACTION NEEDED |
            | Length, date and priority level of hearing | ACTION NEEDED |
        # end of Accept participant attendance

        # end of Accept Additional facilities

        # Accept Additional facilities

        When In view or edit hearing page, I click change link for field "Will additional security be required?"
        Then I am on hearings workflow page "Do you require any additional facilities?"
        When In create hearing page "Do you require any additional facilities?", I input values
            | field                                 | value |
            | Will additional security be required? | No    |

        Then In Additional facilities page, I see case flags displayed for parties
            | partyName           |
            | Party1 name updated |
            | Party2 name         |

        Then In Additional facilities page, I see party "Party1 name updated" with case flags
            | flag                          | label         |
            | B.A                           |               |
            | Vulnerable user               | ACTION NEEDED |
            | disruptive customer behaviour | ACTION NEEDED |
            | Complex Case                  | ACTION NEEDED |
            | Urgent case                   | ACTION NEEDED |
        # Then In hearings Participant attendance page, I see parties
        #     | partyName   |
        #     | Party1 name |
        #     | Party2 name |

        # When In hearing page "Participant attendance", I input values
        #     | field                                                    | value                               |
        #     | Will this be a paper hearing?                            | No                                  |
        #     | What will be the methods of attendance for this hearing? | Hearing channel 1,Hearing channel 2 |
        #     | How will each participant attend the hearing?            | Party1 name,Hearing channel 1       |
        #     | How will each participant attend the hearing?            | Party2 name,Hearing channel 1       |
        #     | How many people will attend the hearing in person?       | 2                                   |
        When I click continue in hearing workflow
        Then I validate Edit hearing page displayed
        Then I validate edit hearing section heading labels
            | Heading                                    | Label         |
            | Hearing requirements                       | AMENDED       |
            | Additional facilities                      | ACTION NEEDED |
            | Participant attendance                     | ACTION NEEDED |
            | Length, date and priority level of hearing | ACTION NEEDED |
        # end of Additional facilities

        # end of Additional facilities



        Then I validate fields displayed in view or edit hearing page
            | field                    | value                                      | changeLinkDisplay | amendedFlagDisplay |
            | Case internal name       | 1234567812345678 update case internal name | false             | AMENDED            |
            | Case public name         | Case public name                           | false             | AMENDED            |
            | Case restriction         | Yes                                        | false             | AMENDED            |
            | Private hearing required | Yes                                        | false             | AMENDED            |
            | Reasonable adjustments   | Party1 name updated                        | true              | AMENDED            |
            | Reasonable adjustments   | Party2 name                                | true              |                    |

@functional_debug
    Scenario: SCR 5: No chnages and no labels (Conditions (3) & (6)) and Scenario 6
        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page


        When In hearings tab, I click action "View or edit" for hearing "TEST_TYPE" under table "Current and upcoming"
        Then I validate view hearing page displayed
        Then I validate view hearing page Edit hearing button displayed is "true"
        When In view hearing page, I click Edit hearing button
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heading labels
            | Heading                                    | Label |
            | Hearing requirements                       |       |
            | Participant attendance                     |       |
            | Length, date and priority level of hearing |       |


        Then I validate fields displayed in view or edit hearing page
            | field                    | value                 | changeLinkDisplay | amendedFlagDisplay |
            | Case internal name       | 1234567812345678      | false             |                    |
            | Case public name | Mock case public name | false |  |
            | Case restriction         | No                    | false             |                    |
            | Private hearing required | No                    | false             |                    |
            | Reasonable adjustments   | Party1 name           | true              |                    |
            | Reasonable adjustments   | Party2 name           | true              |                    |


        # Accept Hearing requirements
        When In view or edit hearing page, I click change link for field "Reasonable adjustments"
        Then I am on hearings workflow page "Hearing requirements"

        Then In hearings requirements page, I see case flags displayed for parties
            | partyName   |
            | Party1 name |
            | Party2 name |
        When I click continue in hearing workflow
        Then I validate Edit hearing page displayed

        Then I validate edit hearing section heading labels
            | Heading                                    | Label |
            | Hearing requirements                       |       |
            | Participant attendance                     |       |
            | Length, date and priority level of hearing |       |
# end of Accept Hearing requirements
