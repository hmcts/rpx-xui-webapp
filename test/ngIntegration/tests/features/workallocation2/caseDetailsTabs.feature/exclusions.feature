@ng @ignore
Feature: WA Release 2: Exclusions

    Scenario Outline: Roles and access, Exclusions table
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        Then I see case details tab label "Roles and access" is displayed is "true"

        # Then I see Roles and access page is displayed
        # Then I see exclusions table displayed in role and access pag
        # When I click Add link for exclusions in role and access page
        Then I see Add an exclusion work flow page "Choose who the exclusion is for" is displayed
        When I select Choose who the exclusion is for option "<WhoTheExclusionFor>" in add exclusion work flow
        When I click continue in add exclusion work flow page "Choose who the exclusion is for"
        Then I see Add an exclusion work flow page "Choose the person's role" is displayed
        When I select Choose the person's role option "<ExclusionRole>" in add exclusion work flow
        When I click continue in add exclusion work flow page "Choose the person's role"
        Then I see Add an exclusion work flow page "Find the person" is displayed
        When I enter text "<FindpersonSearchText>" in Find the person page
        Then I see following options returned to Select in Find person search result
            | Person          |
            | <Selectperson1> |
            | <Selectperson2> |
        When I select Person "<Selectperson1>" from Find person search result
        When I click continue in add exclusion work flow page "Find the person"
        Then I see add exclusion work flow page "Describe the exclusion" is displayed
        When I enter description "<ExclusionDescription>" in add exclusion Describe the exclusion page
        When I click continue in add exclusion work flow page "Describe the exclusion"
        Then I see add exclusion work flow page "Check your answers" is displayed
        Then I see add exclusion work flow page "Check your answers" has following questions and answers
            | Question | Answer | 
            |          |         | 
            |          |         | 
            |          |         |  
            |          |         |

        When I click button with label "Confirm exclusion" in add exclusion work Check your answers page
        Then I see case details page with tab "Role and access" selected is displayed


        Examples:
            | UserIdentifier     | UserType   | Roles                                              | TabLabel | isDisplayed |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | Tasks    | false       |

