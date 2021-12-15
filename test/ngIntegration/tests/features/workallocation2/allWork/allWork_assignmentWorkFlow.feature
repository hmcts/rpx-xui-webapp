@ng  @wa2 
Feature: WA Release 2: All work - Task assignment work flows

    Background: Mock and browser setup

        Given I init MockApp
        Given I set MOCK tasks with permissions for view "All work" and assigned state "assigned"
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK tasks with attributes for view "AllWork"
            | index | permissions                | assignee            | case_name |
            | 0     | Manage,Read,Execute,Cancel |                     | case 1    |
            | 1     | Manage                     |                     | case 2    |
            | 2     | Read                       |                     | case 3    |
            | 3     | Manage,Read                | 1234-1234-1234-1234 | case 4    |
            | 4     | Manage                     | 1234-1234-1234-1234 | case 5    |
            | 5     | Read                       | 1234-1234-1234-1234 | case 6    |
        Given I set MOCK task details for WA release2
            | case_name        | case_category      | location_name |
            | Allwork test scr | auto test category | London QA lab |


    Scenario Outline:  Task Manage links for "<UserType>" action "<action>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>" with reference "userDetails"
        Given I set MOCK find persons database with persons
            | email             | name          |
            | Test12@justice.uk | test12 person |
            | Test23@justice.uk | test23 person |
            | Test34@justice.uk | test34 person |
            | Test45@justice.uk | test45 person |
        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I capture task details at row <taskAtRow> with reference "taskDetails"

        When I open Manage link for task at row <taskAtRow>
        Then I see action link "<action>" is present for task with Manage link open
        When I click action link "<action>" on task with Manage link open
        Then In workflow "<action>", I see find person page displayed with caption "<action>"
        When In workflow "<action>", I enter search term "test" in find person input text
        Then In workflow "<action>", I see following options available in find person results
            | value             |
            | Test12@justice.uk |
            | Test23@justice.uk |
            | Test34@justice.uk |
            | Test45@justice.uk |
        When In workflow "<action>", I select find person result "Test23@justice.uk"
        Then In workflow "<action>", I see find person is selected with "Test23@justice.uk"

        When In workflow "<action>", I click continue

        Then I see task check your changes page for action "<action>" displayed

        Then I validate check your changes table columns displayed for user "<UserType>"
            | ColumnHeader  | Caseworker | Judge |
            | Case name     | Yes        | Yes   |
            | Case category | Yes        | Yes   |
            | Location      | Yes        | Yes   |
            | Task          | Yes       | Yes   |
            | Task created  | No         | Yes   |
            | Due date      | Yes        | No    |
            | Priority      | Yes        | No    |

        Given I update object values in reference "taskDetails"
            | Person | test23 person |
      
        Then I validate task details displayed in check your changes page matching reference "taskDetails"
          
        Then I validate column "Person" value is set to "test23 person" in task check your changes page
        When I click submit button "<submitBtnLabel>" in task check your changes page
        Then I see navigation header tab page "All work"
        Then I validate notification message banner is displayed in "All work" page
        Then I validate notification banner messages displayed in "All work" page
            | message         |
            | <bannermessage> |

        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action        | submitBtnLabel | bannermessage                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Reassign task | Reassign       | You've reassigned a task to somebody else. |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    | 1         | Assign task   | Assign         | You've assigned a task. It will be in the selected person's My tasks.   |

