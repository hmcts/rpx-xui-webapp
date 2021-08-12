@ng @ignore
Feature: WA Release 2: Allocate Role Case worker - Check your answers Change link


    Scenario Outline: Roles and access - "IAC_CaseOfficer_R2" - Allocate role, Allocate to another person
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer"

        Given I set MOCK find person response for jurisdictions
            | jurisdiction | domain | id   | email                   | name           |
            | 1            | 1      | 1231 | judge_user1@gov.uk      | user1 j        |
            | 1            | 1      | 1232 | judge_user2@gov.uk      | user2 j        |
            | 2            | 2      | 1233 | caseworker_user1@gov.uk | caseworker1 cw |
            | 2            | 2      | 1234 | caseworker_user1@gov.uk | caseworker2 cw |
            | 3            | 3      | 1235 | admin_user1@gov.uk      | admin1 a       |
            | 3            | 3      | 1236 | admin_user2@gov.uk      | admin2 a       |

        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        # Then I see case details tab label "Roles and access" is displayed is "true"

        # Then I see Roles and access page is displayed
        # Then I see exclusions table displayed in role and access pag
        # When I click Add link for exclusions in role and access page
        Given I navigate page route "/role-access/allocate-role"

        Then I see Allocate role work flow page "Choose a role" with caption "Allocate a jurdiciary role" is displayed
        When I select Choose a role option "Lead Judge" in Allocate role work flow
        When I click continue in Allocate role work flow page "Choose a role"

        Then I see Allocate role work flow page "Choose how to allocate the judicial role" with caption "Allocate a Lead Judge" is displayed
        When I select Choose how to allocate option "Allocate to another judge" in Allocate role work flow
        When I click continue in Allocate role work flow page "Choose how to allocate the judicial role"

        Then I see Allocate role work flow page "Find the person" with caption "Allocate a Lead Judge" is displayed
        When I search with text "<findPersonSearchWith>" in Find the person page
        Then I see following options returned to Select in Find person search result
            | Person              |
            | <findPersonResult1> |
            | <findPersonResult2> |
        When I select Person "<findPersonResult1>" from Find person search result
        When I click continue in Allocate role work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a Lead Judge" is displayed
        When I select duration option "<Duration>" in Allocate role work flow
        Then I validate date input field "Access starts" is displayed "<DateInputsDisplayed>" in Allocate role work flow page
        Then I validate date input field "Access ends" is displayed "<DateInputsDisplayed>" in Allocate role work flow page
        When I click continue in Allocate role work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your answers" with caption "Allocate a Lead Judge" is displayed
        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                       | Answer              |
            | Type of Role                   | <Role>              |
            | How the role will be allocated | Allocate to me      |
            | Person                         | <findPersonResult1> |
            | Duration of role               | <Duration>          |

        When I click change link for question "<ChangeQuestion>" in check your answers page
        Then I see Add an exclusion work flow page "<ChangeLinkNavPage>" is displayed


        Examples:
            | Duration   | DateInputsDisplayed? | personSearch | findPersonResult1  | findPersonResult2  | ChangeQuestion                 | ChangeLinkNavPage                        | PageCaption                |
            | 7 days     | No                   | judge        | judge_user1@gov.uk | judge_user2@gov.uk | Type of Role                   | Choose a role                            | Allocate a jurdiciary role |
            | Indefinite | No                   | judge        | judge_user1@gov.uk | judge_user2@gov.uk | How the role will be allocated | Choose how to allocate the judicial role | Allocate a Lead Judge      |
            | Indefinite | No                   | judge        | judge_user1@gov.uk | judge_user2@gov.uk | Person                         | Find the person                          | Allocate a Lead Judge      |
            | 7 days     | No                   | judge        | judge_user1@gov.uk | judge_user2@gov.uk | Duration of role               | Duration of role                         | Allocate a Lead Judge      |

