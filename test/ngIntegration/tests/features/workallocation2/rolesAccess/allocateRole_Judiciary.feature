@ng @ignore
Feature: WA Release 2: Allocate Role judiciary

    Scenario Outline: Roles and access - Judge user allocates judicial role "<Useridentifier>" - Allocate role, reserve to me
        Given I set MOCK with user "<Useridentifier>" and roles "<Roles>"

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
        Given I navigate page route "/role-access/allocate-role?userType=judicial"

        Then I see Allocate role work flow page "Choose a role" with caption "Allocate a jurdiciary role" is displayed
        When I select Choose a role option "<Role>" in Allocate role work flow
        When I click continue in Allocate role work flow page "Choose a role"

        Then I see Allocate role work flow page "Choose how to allocate the judicial role" with caption "Allocate a <Role>" is displayed
        When I select Choose how to allocate option "Reserve to me" in Allocate role work flow
        When I click continue in Allocate role work flow page "Choose how to allocate the judicial role"


        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a <Role>" is displayed
        When I select duration option "<Duration>" in Allocate role work flow
        Then I validate date input field "Access starts" is displayed "<DateInputsDisplayed>" in Allocate role work flow page
        Then I validate date input field "Access ends" is displayed "<DateInputsDisplayed>" in Allocate role work flow page
        When I click continue in Allocate role work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your answers" with caption "Allocate a <Role>" is displayed


        # Then I see Add an exclusion work flow page "Find the person" is displayed
        # When I search with text "<findPersonSearchWith>" in Find the person page
        # Then I see following options returned to Select in Find person search result
        #     | Person              |
        #     | <findPersonResult1> |
        #     | <findPersonResult2> |
        # When I select Person "<findPersonResult1>" from Find person search result
        # When I click continue in add exclusion work flow page "Find the person"

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                       | Answer         |
            | Type of Role                   | <Role>         |
            | How the role will be allocated | Allocate to me |
            | Duration of role               | <Duration>     |

        When I click button with label "Confirm allocation" in Allocate role work flow  Check your answers page
        # Then I see case details page displayed with tab "Role and access" selected
        Then I see case details page with message banner "You've allocated a role"


        Examples:
            | Useridentifier  | Roles                                           | Role          | Duration   | DateInputsDisplayed? |
            | IAC_Judge_WA_R2 | caseworker-ia-iacjudge,caseworker-ia,caseworker | Hearing judge | Indefinite | No                   |


    Scenario Outline: Roles and access - Judge user allocates judicial role  "<Useridentifier>" - Allocate role, Allocate to another person
        Given I set MOCK with user "<Useridentifier>" and roles "<Roles>"

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
        Given I navigate page route "/role-access/allocate-role?userType=judicial"

        Then I see Allocate role work flow page "Choose a role" with caption "Allocate a jurdiciary role" is displayed
        When I select Choose a role option "<Role>" in Allocate role work flow
        When I click continue in Allocate role work flow page "Choose a role"

        Then I see Allocate role work flow page "Choose how to allocate the judicial role" with caption "Allocate a <Role>" is displayed
        When I select Choose how to allocate option "Allocate to another judge" in Allocate role work flow
        When I click continue in Allocate role work flow page "Choose how to allocate the judicial role"

        Then I see Allocate role work flow page "Find the person" with caption "Allocate a <Role>" is displayed
        When I search with text "<findPersonSearchWith>" in Find the person page
        Then I see following options returned to Select in Find person search result
            | Person              |
            | <findPersonResult1> |
            | <findPersonResult2> |
        When I select Person "<findPersonResult1>" from Find person search result
        When I click continue in Allocate role work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a <Role>" is displayed
        When I select duration option "<Duration>" in Allocate role work flow
        Then I validate date input field "Access starts" is displayed "<DateInputsDisplayed>" in Allocate role work flow page
        Then I validate date input field "Access ends" is displayed "<DateInputsDisplayed>" in Allocate role work flow page
        When I click continue in Allocate role work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your answers" with caption "Allocate a <Role>" is displayed



        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                       | Answer              |
            | Type of Role                   | <Role>              |
            | How the role will be allocated | Allocate to me      |
            | Person                         | <findPersonResult1> |
            | Duration of role               | <Duration>          |

        When I click button with label "Confirm allocation" in Allocate role work flow  Check your answers page
        # Then I see case details page displayed with tab "Role and access" selected
        Then I see case details page with message banner "You've allocated a role"


        Examples:
            | Useridentifier  | Roles                                           | Role          | Duration   | DateInputsDisplayed? | personSearch | findPersonResult1  | findPersonResult2  |
            | IAC_Judge_WA_R2 | caseworker-ia-iacjudge,caseworker-ia,caseworker | Hearing judge | Indefinite | No                   | judge        | judge_user1@gov.uk | judge_user2@gov.uk |



    Scenario Outline: Roles and access - "<Useridentifier>" - Allocate role, reserve to me for Another period -  Valid dates
        Given I set MOCK with user "<Useridentifier>" and roles "<Roles>"

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
        Given I navigate page route "/role-access/allocate-role?userType=judicial"

        Then I see Allocate role work flow page "Choose a role" with caption "Allocate a jurdiciary role" is displayed
        When I select Choose a role option "<Role>" in Allocate role work flow
        When I click continue in Allocate role work flow page "Choose a role"

        Then I see Allocate role work flow page "Choose how to allocate the judicial role" with caption "Allocate a <Role>" is displayed
        When I select Choose how to allocate option "Reserve to me" in Allocate role work flow
        When I click continue in Allocate role work flow page "Choose how to allocate the judicial role"


        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a <Role>" is displayed
        Then I see option "Indefinite" selected in page duration of role

        When I select duration option "<Duration>" in Allocate role work flow
        Then I validate date input field "Access starts" is displayed "<DateInputsDisplayed>" in Allocate role work flow page
        Then I validate date input field "Access ends" is displayed "<DateInputsDisplayed>" in Allocate role work flow page
        When I enter duration date for field "Access starts" with current date plus <startDate> in Allocate role work flow
        When I enter duration date for field "Access ends" with current date plus <endDate> in Allocate role work flow
        When I click continue in Allocate role work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your answers" with caption "Allocate a <Role>" is displayed
        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                       | Answer         |
            | Type of Role                   | <Role>         |
            | How the role will be allocated | Allocate to me |
            | Duration of role               | <Duration>     |

        When I click button with label "Confirm allocation" in Allocate role work flow  Check your answers page
        # Then I see case details page displayed with tab "Role and access" selected
        Then I see case details page with message banner "You've allocated a role"


        Examples:
            | Useridentifier  | Roles                                           | Role       | Duration       | DateInputsDisplayed? | startDate | endDate |
            | IAC_Judge_WA_R2 | caseworker-ia-iacjudge,caseworker-ia,caseworker | Lead Judge | Another period | Yes                  | 0         | 0       |
            | IAC_Judge_WA_R2 | caseworker-ia-iacjudge,caseworker-ia,caseworker | Lead Judge | Another period | Yes                  | 0         | 1       |
            | IAC_Judge_WA_R2 | caseworker-ia-iacjudge,caseworker-ia,caseworker | Lead Judge | Another period | Yes                  | 1         | 1       |
            | IAC_Judge_WA_R2 | caseworker-ia-iacjudge,caseworker-ia,caseworker | Lead Judge | Another period | Yes                  | 10        | 50      |



    Scenario Outline: Roles and access - "<Useridentifier>" - Allocate role, reserve to me for Another period -  Valid invalid dates
        Given I set MOCK with user "<Useridentifier>" and roles "<Roles>"

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
        Given I navigate page route "/role-access/allocate-role?userType=judicial"

        Then I see Allocate role work flow page "Choose a role" with caption "Allocate a jurdiciary role" is displayed
        When I select Choose a role option "<Role>" in Allocate role work flow
        When I click continue in Allocate role work flow page "Choose a role"

        Then I see Allocate role work flow page "Choose how to allocate the judicial role" with caption "Allocate a <Role>" is displayed
        When I select Choose how to allocate option "Reserve to me" in Allocate role work flow
        When I click continue in Allocate role work flow page "Choose how to allocate the judicial role"


        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a <Role>" is displayed
        Then I see option "Indefinite" selected in page duration of role

        When I select duration option "<Duration>" in Allocate role work flow
        Then I validate date input field "Access starts" is displayed "<DateInputsDisplayed>" in Allocate role work flow page
        Then I validate date input field "Access ends" is displayed "<DateInputsDisplayed>" in Allocate role work flow page
        When I enter duration date for field "Access starts" with current date plus <startDate> in Allocate role work flow
        When I enter duration date for field "Access ends" with current date plus <endDate> in Allocate role work flow
        When I click continue in Allocate role work flow page "Duration of role"

        Then I see validation error with message "Please select an option"
        Then I see field with text "Choose a role" display validation message "Please select an option"

        Examples:
            | Useridentifier  | Roles                                           | Role       | Duration       | DateInputsDisplayed? | startDate | endDate |
            | IAC_Judge_WA_R2 | caseworker-ia-iacjudge,caseworker-ia,caseworker | Lead Judge | Another period | Yes                  | -1        | -1      |
            | IAC_Judge_WA_R2 | caseworker-ia-iacjudge,caseworker-ia,caseworker | Lead Judge | Another period | Yes                  | -1        | 1       |
            | IAC_Judge_WA_R2 | caseworker-ia-iacjudge,caseworker-ia,caseworker | Lead Judge | Another period | Yes                  | 0         | -1      |
            | IAC_Judge_WA_R2 | caseworker-ia-iacjudge,caseworker-ia,caseworker | Lead Judge | Another period | Yes                  | 10        | 9       |



    Scenario Outline: Roles and access - Legal Ops user allocates judicial role  "<Useridentifier>" - Allocate role, Allocate to another person
        Given I set MOCK with user "<Useridentifier>" and roles "<Roles>"

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
        When I select Choose a role option "<Role>" in Allocate role work flow
        When I click continue in Allocate role work flow page "Choose a role"

        Then I see Allocate role work flow page "Find the person" with caption "Allocate a <Role>" is displayed
        When I search with text "<findPersonSearchWith>" in Find the person page
        Then I see following options returned to Select in Find person search result
            | Person              |
            | <findPersonResult1> |
            | <findPersonResult2> |
        When I select Person "<findPersonResult1>" from Find person search result
        When I click continue in Allocate role work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a <Role>" is displayed
        When I select duration option "<Duration>" in Allocate role work flow
        Then I validate date input field "Access starts" is displayed "<DateInputsDisplayed>" in Allocate role work flow page
        Then I validate date input field "Access ends" is displayed "<DateInputsDisplayed>" in Allocate role work flow page
        When I click continue in Allocate role work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your answers" with caption "Allocate a <Role>" is displayed



        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                       | Answer              |
            | Type of Role                   | <Role>              |
            | How the role will be allocated | Allocate to me      |
            | Person                         | <findPersonResult1> |
            | Duration of role               | <Duration>          |

        When I click button with label "Confirm allocation" in Allocate role work flow  Check your answers page
        # Then I see case details page displayed with tab "Role and access" selected
        Then I see case details page with message banner "You've allocated a role"


        Examples:
            | Useridentifier     | Roles                                              | Role       | Duration | DateInputsDisplayed? | personSearch | findPersonResult1  | findPersonResult2  |
            | IAC_CaseOfficer_R2 | caseworker-ia-caseofficer,caseworker-ia-admofficer | Lead Judge | 7 days   | No                   | judge        | judge_user1@gov.uk | judge_user2@gov.uk |


