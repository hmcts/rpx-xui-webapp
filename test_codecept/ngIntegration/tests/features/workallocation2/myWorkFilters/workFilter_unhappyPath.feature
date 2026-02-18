@ng  
Feature: WA Release 2: My work - Work filters - Uhhappy paths

    Background: Mock and browser setup
        Given I init MockApp

        Given I set MOCK request "/workallocation/task" intercept with reference "workallocationTaskRequest"
        Given I set MOCK request "/workallocation/my-work/cases" intercept with reference "workallocationCasesRequest"

        Given I set MOCK locations with names in service "IA"
            | id    | locationName           |
            | 20001 | IA Court Aldgate Tower |
            | 20002 | IA Court Birmingham    |
            | 2003  | IA Court Bradford      |
            | 20004 | IA Court Glasgow       |
            | 20005 | IA Court Hatton Cross  |
            | 20006 | IA Court Newcastle     |
            | 20007 | IA Court Newport       |
            | 20008 | IA Court North Shields |
            | 20009 | IA Court Center 1  |


    Scenario Outline:  Work filters api error <responseCode> on apply
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 20001        |

        Given I set MOCK person with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator"
            | locationId | locationName           |
            | 20001      | IA Court Aldgate Tower |
        Given I start MockApp
        Given I start MockApp
        Given I navigate to home page
        # When I click on primary navigation header "My work"
        Then I see work filter button displayed
        Then I validate work filter button text is "Show work filter"
        Then I validate location filter is not displayed
        When I click work filter button to "Show" filter
        Then I validate work filter button text is "Hide work filter"
        Then I validate location filter is displayed

        Given I set MOCK request "/workallocation/task" response log to report
        Given I set MOCK api method "post" endpoint "/workallocation/task" with error response code <responseCode>
        Given I start MockApp
        When I click work location filter Apply button

        Then I see error message of type "page" displayed with message "<error>"
        Examples:
            | UserType       | Roles                                              | responseCode | error                                               |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer | 500          | Sorry, there is a problem with the service          |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer | 400          | Sorry, there is a problem with the service          |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer | 401          | Sorry, you're not authorised to perform this action |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer | 403          | Sorry, you're not authorised to perform this action |

