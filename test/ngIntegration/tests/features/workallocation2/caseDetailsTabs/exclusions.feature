@ng @ignore @test
Feature: WA Release 2: Exclusions

    Scenario Outline: Roles and access - "<Useridentifier>" - Exclusion work flow with option "Exclude another person"
        Given I set MOCK with user "<Useridentifier>" and roles "<Roles>"

        Given I set MOCK find person response for jurisdictions
            | jurisdiction | domain | id   | email                   | name           |
            | 1            | 1      | 1231 | judge_user1@gov.uk      | user1 j        |
            | 1            | 1      | 1232 | judge_user2@gov.uk      | user2 j        |
            | 2            | 2      | 1233 | caseworker_user1@gov.uk | caseworker1 cw |
            | 2            | 2      | 1234 | caseworker_user1@gov.uk | caseworker2 cw |
            | 3            | 3      | 1235 | admin_user1@gov.uk      | admin1 a       |
            | 3            | 3      | 1236 | admin_user1@gov.uk      | admin2 a       |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        # Then I see case details tab label "Roles and access" is displayed is "true"

        # Then I see Roles and access page is displayed
        # Then I see exclusions table displayed in role and access pag
        # When I click Add link for exclusions in role and access page
        Given I navigate page route "/role-access/exclusion"

        Then I see Add an exclusion work flow page "Choose who the exclusion is for" is displayed
        When I select Choose who the exclusion is for option "Exclude another person" in add exclusion work flow
        When I click continue in add exclusion work flow page "Choose who the exclusion is for"
        Then I see Add an exclusion work flow page "Choose the person's role" is displayed
        When I select Choose the person's role option "<ExclusionRole>" in add exclusion work flow
        When I click continue in add exclusion work flow page "Choose the person's role"
        Then I see Add an exclusion work flow page "Find the person" is displayed
        When I search with text "<findPersonSearchWith>" in Find the person page
        Then I see following options returned to Select in Find person search result
            | Person              |
            | <findPersonResult1> |
            | <findPersonResult2> |
        When I select Person "<findPersonResult1>" from Find person search result
        When I click continue in add exclusion work flow page "Find the person"
        Then I see Add an exclusion work flow page "Describe the exclusion" is displayed
        When I enter description "<ExclusionDescription>" in add exclusion Describe the exclusion page
        When I click continue in add exclusion work flow page "Describe the exclusion"
        Then I see Add an exclusion work flow page "Check your answers" is displayed
        Then I see Check your answers page has total 4 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                 | Answer                 |
            | Who is the exclusion for | Exclude another person |
            | What's the person's role | <ExclusionRole>        |
            | Person                   | <findPersonResult1>    |
            | Describe the exclusion   | <ExclusionDescription> |

        When I click button with label "Confirm exclusion" in add exclusion work Check your answers page
        Then I see case details page displayed with tab "Role and access" selected


        Examples:
            | Useridentifier     | Roles                                              | ExclusionRole | findPersonSearchWith | findPersonResult1       | findPersonResult2       | ExclusionDescription           |
            | IAC_CaseOfficer_R2 | caseworker-ia-caseofficer,caseworker-ia-admofficer | Judicial      | Judge                | judge_user1@gov.uk      | judge_user2@gov.uk      | Judicial role user exclusion   |
            # | IAC_Judge_WA_R2    | caseworker-ia-iacjudge,caseworker-ia,caseworker    | Legal Ops     | caseworker           | caseworker_user1@gov.uk | caseworker_user2@gov.uk | caseworker role user exclusion |
            # | IAC_CaseOfficer_R2 | caseworker-ia-caseofficer,caseworker-ia-admofficer | Admin         | admin                | admin_user1@gov.uk      | admin_user2@gov.uk      | admin role user exclusion      |

