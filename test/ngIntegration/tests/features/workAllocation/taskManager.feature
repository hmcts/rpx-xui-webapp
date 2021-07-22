@ng
Feature: WA Release 1: Task manager

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK with "wa_release_1" release user and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer"

    Scenario: Task manager columns data validation
        Given I set MOCK Task manager tasks count 25

        Given I set MOCK case workers for release "1"
            | email              | firstName | lastName | idamId              | location.id | location.locationName |
            | test_cw_1@test.com | cw1       | test     | 1234-1234-1234-1231 | 10001       | Location 1            |
            | test_cw_2@test.com | cw2       | test     | 1234-1234-1234-1232 | 10002       | Location 2            |
            | test_cw_3@test.com | cw3       | test     | 1234-1234-1234-1233 | 10003       | Location 3            |
            | test_cw_4@test.com | cw4       | test     | 1234-1234-1234-1234 | 10004       | Location 4            |
            | test_cw_5@test.com | cw5       | test     | 1234-1234-1234-1235 | 10005       | Location 5            |

        Given I set MOCK locations for release "wa_release_1"
            | id    | locationName |
            | 10001 | Location 1   |
            | 10002 | Location 2   |
            | 10003 | Location 3   |
            | 10004 | Location 4   |
            | 10005 | Location 5   |
            | 10006 | Location 6   |

        Given I set MOCK tasks attributes for "Task manager" in release 1
            | index | case_id             | case_name      | case_category      | location_name  | task_title               |
            | 0     | 1234-1234-1234-1234 | test case name | auto test category | London QA labs | Autotest validation task |


        Given I set MOCK request "/workallocation/taskWithPagination/" intercept with reference "taskSearchRequest"
        
        Given I start MockApp
        Given I navigate to home page
        Given I reset reference "taskSearchRequest" value to null
        When I click on primary navigation header "Task manager"

        Then I see Task manager page displayed
        Then I validate Task manager page tasks count 25
        When I wait for reference "taskSearchRequest" value not null
      
        Then I validate tasks count in page 25

        Then I validate task table values displayed
            | row | Case reference      | Case name      | Case category      | Location       | Task                     |
            | 1   | 1234-1234-1234-1234 | test case name | auto test category | London QA labs | Autotest validation task |


    Scenario: Task manager task counts
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK Task manager tasks count 250
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header "Task manager"

        Then I see Task manager page displayed
        Then I validate Task manager page tasks count 25

    Scenario: Task manager sort columns
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK Task manager tasks count 250
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header "Task manager"

        Then I see Task manager page displayed
        Then I validate tasks column sorting

    Scenario: Task manager sort column persist in session
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK Task manager tasks count 250
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header "Task manager"

        Then I see Task manager page displayed
        Then I validate Task manager tasks sort column persist in session

    Scenario: Task manager error responses
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I set MOCK Task manager tasks count 250
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header "Task manager"

        Then I see Task manager page displayed
        Then I validate error responses on Task manager page




