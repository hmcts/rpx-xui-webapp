@ng
Feature: WA Release 2: My work - My Tasks

    Background: Mock and browser setup
        Given I init MockApp

@ignore
    Scenario Outline:  My Tasks, colums and column links for "<UserType>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK tasks with permissions for view "My Tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 10    |
            | Read        | 10    |
        Given I set MOCK case workers for release "1"
            | email              | firstName | lastName | idamId              | location.id | location.locationName |
            | test_cw_1@test.com | cw1       | test     | 1234-1234-1234-1231 | 10001       | Location 1            |
            | test_cw_2@test.com | cw2       | test     | 1234-1234-1234-1232 | 10002       | Location 2            |
            | test_cw_3@test.com | cw3       | test     | 1234-1234-1234-1233 | 10003       | Location 3            |
            | test_cw_4@test.com | cw4       | test     | 1234-1234-1234-1234 | 10004       | Location 4            |
            | test_cw_5@test.com | cw5       | test     | 1234-1234-1234-1235 | 10005       | Location 5            |
        Given I set MOCK tasks with attributes for view "My tasks"
            | index | permissions                | assignee            | case_name | location_name   | task_title       | dueDate | case_category        |
            | 0     | Manage,Read,Execute,Cancel | 1234-1234-1234-1231 | case 1    | test location 1 | test auto task 1 | 10      | auto test category 1 |
            | 1     | Manage                     | 1234-1234-1234-1231 | case 2    | test location 2 | test auto task 2 | 20      | auto test category 2 |
            | 2     | Read                       | 1234-1234-1234-1231 | case 3    | test location 3 | test auto task 3 | 30      | auto test category 3 |
            | 3     | Manage,Read                | 1234-1234-1234-1231 | case 4    | test location 4 | test auto task 4 | -10     | auto test category 4 |
            | 4     | Manage                     | 1234-1234-1234-1231 | case 5    | test location 5 | test auto task 5 | -20     | auto test category 5 |
            | 5     | Read                       | 1234-1234-1234-1231 | case 6    | test location 6 | test auto task 6 | -30     | auto test category 6 |


        Given I start MockApp
        Given I navigate to home page
        Then I validate task list table columns displayed
            | ColumnHeader  |
            | Case name     |
            | Case category |
            | Location      |
            | Task          |
            | Date          |

        Then I validate task table values displayed
            | row | Case name | Case category        | Location        | Task             | Date |
            | 1   | case 1    | auto test category 1 | test location 1 | test auto task 1 | 10   |
            | 2   | case 2    | auto test category 2 | test location 2 | test auto task 2 | 20   |


        Then I validate task list columns are links
            | ColumnHeader |
            | Case name    |
            | Task         |

        When I click task column link "Case name" at row 1
        Then I see case details page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        When I click task column link "Task" at row 1
        Then I see case details page
        Examples:
            | UserIdentifier     | UserType   | Roles                                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
    # | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    |

    Scenario Outline: My Tasks pagnation control display with only 1 page of items
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
        Given I set MOCK tasks with permissions for view "My Tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 10    |
            | Read        | 10    |
        Given I set MOCK request "/workallocation2/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        Then I validate tasks count in page 20
        Then I validate task table pagination controls, is displayed state is "false"

        Examples:
            | UserIdentifier  | UserType | Roles                                           |
            # | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | IAC_Judge_WA_R2 | Judge    | caseworker-ia-iacjudge,caseworker-ia,caseworker |


    Scenario Outline: My Tasks sort column persist in session with Caseworker user "<SubNavigationTab>"
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer "
        Given I set MOCK tasks with permissions for view "My Tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK request "/workallocation2/taskWithPagination/" intercept with reference "taskSearchRequest"
        Given I start MockApp

        Given I navigate to home page
        When I navigate to My work sub navigation tab "<SubNavigationTab>"
        Then I validate tasks count in page 25
        Then I validate task table pagination controls, is displayed state is "true"
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 140 tasks"

        When I click task list table header column "Case name", I validate task list table sorted with column "Case name" in order "asc"

        When I click on primary navigation header tab "Case list", I see selected tab page displayed
        Then I see case list page displayed
        When I click on primary navigation header tab "My work", I see selected tab page displayed
        When I navigate to My work sub navigation tab "<SubNavigationTab>"
        Then I validate tasks count in page 25
        Then I validate task list page results text displayed as "Displaying 1 - 25 out of 140 tasks"
        Then I validate task list table sorted with column "Case name" in order "asc"
        Examples:
            | SubNavigationTab |
            | My tasks         |
