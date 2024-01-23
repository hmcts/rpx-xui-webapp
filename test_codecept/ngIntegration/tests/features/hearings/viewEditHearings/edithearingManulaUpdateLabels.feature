
@ng @functional_enabled
Feature: Hearings CR84: Manual update labels
    https://tools.hmcts.net/jira/browse/EUI-9096

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



    Scenario: SCR 1: manual updated fieldsdisplay AMENDED labels
        When I click tab with label "Hearings" in case details page, to see element with css selector "exui-case-hearings"
        Then I am on hearings tab page
        Then I see hearings table for "Current and upcoming" in hearings tab page

        When In hearings tab, I click action "View or edit" for hearing "TEST_TYPE" under table "Current and upcoming"
        Then I validate view hearing page displayed
        Then I validate view hearing page Edit hearing button displayed is "true"
        When In view hearing page, I click Edit hearing button
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heading labels
            | Heading                 | Label |
            | Stage                   |       |
            | Hearing venue           |       |
            | Language requirements   |       |
            | Judge details           |       |
            | Linked hearings         |       |
            | Additional instructions |       |

        # hearing stage start
        When In view or edit hearing page, I click change link for field "What stage is this hearing at?"
        Then I am on hearings workflow page "What stage is this hearing at?"

        When In hearing page "What stage is this hearing at?", I input values
            | field                          | value    |
            | What stage is this hearing at? | Breach 1 |


        When I click continue in hearing workflow
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heading labels
            | Heading                 | Label   |
            | Stage                   | AMENDED |
            | Hearing venue           |         |
            | Language requirements   |         |
            | Judge details           |         |
            | Linked hearings         |         |
            | Additional instructions |         |

        Then I validate fields displayed in view or edit hearing page
            | field                          | value    | changeLinkDisplay | amendedFlagDisplay |
            | What stage is this hearing at? | Breach 1 | true              | AMENDED            |

        # hearing stage end


        # Hearing venue start
        When In view or edit hearing page, I click change link for field "What are the hearing venue details"
        Then I am on hearings workflow page "What are the hearing venue details?"

        When In hearing page "What are the hearing venue details?", I input values
            | field                         | value                 |
            | Search for a location by name | cen,IA Court Center 2 |

        When I click continue in hearing workflow
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heading labels
            | Heading                 | Label   |
            | Stage                   | AMENDED |
            | Hearing venue           | AMENDED |
            | Language requirements   |         |
            | Judge details           |         |
            | Linked hearings         |         |
            | Additional instructions |         |

        Then I validate fields displayed in view or edit hearing page
            | field                              | value             | changeLinkDisplay | amendedFlagDisplay |
            | What are the hearing venue details | IA Court Center 2 | true              | AMENDED            |

        # Hearing venue end

        # Language requirements start
        When In view or edit hearing page, I click change link for field "Does this hearing need to be in Welsh?"
        Then I am on hearings workflow page "Does this hearing need to be in Welsh?"

        When In hearing page "Does this hearing need to be in Welsh?", I input values
            | field                                  | value |
            | Does this hearing need to be in Welsh? | Yes   |


        When I click continue in hearing workflow
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heading labels
            | Heading                 | Label   |
            | Stage                   | AMENDED |
            | Hearing venue           | AMENDED |
            | Language requirements   | AMENDED |
            | Judge details           |         |
            | Linked hearings         |         |
            | Additional instructions |         |

        Then I validate fields displayed in view or edit hearing page
            | field                                  | value | changeLinkDisplay | amendedFlagDisplay |
            | Does this hearing need to be in Welsh? | Yes   | true              | AMENDED            |

        # Language requirements end




        # Judge details start
        When In view or edit hearing page, I click change link for field "Do you want a specific judge?"
        Then I am on hearings workflow page "Do you want a specific judge?"

        When In hearing page "Do you want a specific judge?", I input values
            | field                             | value                     |
            | Do you want a specific judge?     | No                        |
            | Select all judge types that apply | Judge type 1,Judge type 2 |


        When I click continue in hearing workflow
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heading labels
            | Heading                 | Label   |
            | Stage                   | AMENDED |
            | Hearing venue           | AMENDED |
            | Language requirements   | AMENDED |
            | Judge details           | AMENDED |
            | Linked hearings         |         |
            | Additional instructions |         |

        Then I validate fields displayed in view or edit hearing page
            | field                             | value                      | changeLinkDisplay | amendedFlagDisplay |
            | Do you want a specific judge?     | No                         | true              |                    |
            | Select all judge types that apply | Judge type 1, Judge type 2 | true              | AMENDED            |

        # Judge details end




        # Linked hearings start
        When In view or edit hearing page, I click change link for field "Will this hearing need to be linked to other hearings?"
        Then I am on hearings workflow page "Will this hearing need to be linked to other hearings?"

        When In hearing page "Will this hearing need to be linked to other hearings?", I input values
            | field                                                  | value |
            | Will this hearing need to be linked to other hearings? | Yes    |

        When I click continue in hearing workflow
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heading labels
            | Heading                 | Label   |
            | Stage                   | AMENDED |
            | Hearing venue           | AMENDED |
            | Language requirements   | AMENDED |
            | Judge details           | AMENDED |
            | Linked hearings         | AMENDED |
            | Additional instructions |         |

        Then I validate fields displayed in view or edit hearing page
            | field                                                  | value | changeLinkDisplay | amendedFlagDisplay |
            | Will this hearing need to be linked to other hearings? | Yes    | true              | AMENDED            |

        # Linked hearings end




        # Additional instructions start
        When In view or edit hearing page, I click change link for field "Enter any additional instructions for the hearing"
        Then I am on hearings workflow page "Enter any additional instructions for the hearing"

        When In hearing page "Enter any additional instructions for the hearing", I input values
            | field                                             | value                     |
            | Enter any additional instructions for the hearing | Manual update labels test |

        When I click continue in hearing workflow
        Then I validate Edit hearing page displayed


        Then I validate edit hearing section heading labels
            | Heading                 | Label   |
            | Stage                   | AMENDED |
            | Hearing venue           | AMENDED |
            | Language requirements   | AMENDED |
            | Judge details           | AMENDED |
            | Linked hearings         | AMENDED |
            | Additional instructions | AMENDED |

        Then I validate fields displayed in view or edit hearing page
            | field                                             | value                     | changeLinkDisplay | amendedFlagDisplay |
            | Enter any additional instructions for the hearing | Manual update labels test | true              | AMENDED            |

# Additional instructions end



