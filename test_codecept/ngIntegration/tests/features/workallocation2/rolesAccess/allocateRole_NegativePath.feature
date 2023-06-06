

@ng1 @ignore
Feature: WA Release 2: Allocate Role judiciary - Negative path

    Scenario Outline: Roles and access - "<Useridentifier>" - Allocate role, reserve to me for Another period
        Given I set MOCK with user "<Useridentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK find person response for jurisdictions
            | jurisdiction | domain | id   | email                   | name           |
            | 1            | 1      | 1231 | judge_user1@gov.uk      | user1 j        |
            | 1            | 1      | 1232 | judge_user2@gov.uk      | user2 j        |
            | 2            | 2      | 1233 | caseworker_user1@gov.uk | caseworker1 cw |
            | 2            | 2      | 1234 | caseworker_user1@gov.uk | caseworker2 cw |
            | 3            | 3      | 1235 | admin_user1@gov.uk      | admin1 a       |
            | 3            | 3      | 1236 | admin_user2@gov.uk      | admin2 a       |

        Given I start MockApp
        Given I set MOCK api method "POST" endpoint "" with error response code "<errorResponseCode>"

        Given I navigate to home page
        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        When I open first case in case list page
        Then I see case details page
        # Then I see case details tab label "Roles and access" is displayed is "true"

        # Then I see Roles and access page is displayed
        # Then I see exclusions table displayed in role and access pag
        # When I click Add link for exclusions in role and access page
        Given I navigate page route "/role-access/allocate-role"

        # Choose role error validation
        Then I see Allocate role work flow page "Choose a role" with caption "Allocate a jurdiciary role" is displayed
        When I click continue in work flow page "Choose how to allocate the judicial role"
        
        Then I see validation error with message "Please select an option"
        Then I see field with text "Choose a role" display validation message "Please select an option"

        When I select Choose a role option "<Role>" in work flow
        When I click continue in work flow page "Choose a role"


        # Choose how to allocate the judicial role validation
        Then I see Allocate role work flow page "Choose how to allocate the judicial role" with caption "Allocate a <Role>" is displayed
        When I click continue in work flow page "Choose how to allocate the judicial role"

        Then I see validation error with message "Please select an option"
        Then I see field with text "Choose how to allocate the role" display validation message "Please select an option"

        When I select Choose how to allocate option "Reserve to me" in work flow
        When I click continue in work flow page "Choose how to allocate the judicial role"


        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a <Role>" is displayed
        When I select duration option "<Duration>" in work flow
        Then I validate date input field "Access starts" is displayed "<DateInputsDisplayed>" in work flow page
        Then I validate date input field "Access ends" is displayed "<DateInputsDisplayed>" in work flow page

        When I click continue in work flow page "Duration of role"
        Then I see validation error with message "Please select an option"
        Then I see field with text "Choose how to allocate the role" display validation message "Please select an option"
       
        When I enter duration date for field "Access starts" with current date plus <startDate> in work flow
        When I enter duration date for field "Access ends" with current date plus <endDate> in work flow
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your answers" with caption "Allocate a <Role>" is displayed
        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                       | Answer         |
            | Type of Role                   | <Role>         |
            | How the role will be allocated | Allocate to me |
            | Duration of role               | <Duration>     |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        # Then I see case details page displayed with tab "Role and access" selected
        Then I see error message of type "Page" displayed with message "<>"


        Examples:
            | Useridentifier     | Roles                                              | Role       | Duration       | DateInputsDisplayed? | startDate | endDate |errorResponseCode|
            | IAC_CaseOfficer_R2 | caseworker-ia-caseofficer,caseworker-ia-admofficer | Lead Judge | Another period | Yes                  | +1        | +2      ||

