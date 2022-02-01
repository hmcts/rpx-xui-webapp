@ng  
Feature: WA Release 2: My work - Work filters - Uhhappy paths

    Background: Mock and browser setup
        Given I init MockApp
     
        Given I set MOCK request "/workallocation2/task" intercept with reference "workallocationTaskRequest"
        Given I set MOCK request "/workallocation2/my-work/cases" intercept with reference "workallocationCasesRequest"


   
    Scenario Outline:  Work filters api error <responseCode> on apply
        Given I set MOCK with "wa_release_2" release user and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
        # When I click on primary navigation header "My work"
        Then I see work filter button displayed
        Then I validate work filter button text is "Show work filter"
        Then I validate location filter is not displayed
        When I click work filter button to "Show" filter
        Then I validate work filter button text is "Hide work filter"
        Then I validate location filter is displayed

        Given I set MOCK request "/workallocation2/task" response log to report
        Given I set MOCK api method "post" endpoint "/workallocation2/task" with error response code <responseCode>
        Given I start MockApp
        When I click work location filter Apply button

        Then I see error message of type "page" displayed with message "<error>"
        Examples:
            | UserType       | Roles                                              | responseCode | error                                               |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer | 500          | Sorry, there is a problem with the service          |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer | 400          | Sorry, there is a problem with the service          |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer | 401          | Sorry, you're not authorised to perform this action |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer | 403          | Sorry, you're not authorised to perform this action |

