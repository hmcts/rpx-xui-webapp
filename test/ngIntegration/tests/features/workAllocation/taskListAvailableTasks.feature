@ng @wa1 
Feature: WA Release 1: Available Tasks Task list

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK with "wa_release_1" release user and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer"


    @test
    Scenario: Available Tasks columns data validation
        Given I set MOCK available tasks count 25

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

        Given I set MOCK tasks attributes for "Available Tasks" in release 1
            | index | case_id             | case_name      | case_category      | location_name  | task_title               |
            | 0     | 1234-1234-1234-1234 | test case name | auto test category | London QA labs | Autotest validation task |


        Given I set MOCK request "/workallocation/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Task list", I see selected tab page displayed
        Then I see Task list sub navigation tabs
        Given I reset reference "taskSearchRequest" value to null
        When I click sub navigation tab Available tasks

        When I wait for reference "taskSearchRequest" value not null
       
        Then I validate tasks count in page 25

        Then I validate task table values displayed
            | row | Case reference      | Case name      | Case category      | Location       | Task                     |
            | 1   | 1234-1234-1234-1234 | test case name | auto test category | London QA labs | Autotest validation task |

    Scenario: Avaiable Tasks task counts
        Given I set MOCK available tasks count 150
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Task list", I see selected tab page displayed
        Then I see Task list sub navigation tabs
        When I click sub navigation tab Available tasks

        Then I see Available tasks page displayed
        Then I validate tasks count in page 25

    Scenario: Avaiable Tasks sort columns
        Given I set MOCK available tasks count 150
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Task list", I see selected tab page displayed
        Then I see Task list sub navigation tabs
        When I click sub navigation tab Available tasks

        Then I see Available tasks page displayed
        Then I validate tasks column sorting

    Scenario: Avaiable Tasks sort column persist in session
        Given I set MOCK available tasks count 150
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Task list", I see selected tab page displayed
        Then I see Task list sub navigation tabs
        When I click sub navigation tab Available tasks

        Then I see Available tasks page displayed
        Then I validate Available tasks sort column persist in session

    Scenario: Avaiable Tasks error responses
        Given I set MOCK available tasks count 150
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Task list", I see selected tab page displayed
        Then I see Task list sub navigation tabs
        When I click sub navigation tab Available tasks

        Then I see Available tasks page displayed
        Then I validate error responses on available tasks page




