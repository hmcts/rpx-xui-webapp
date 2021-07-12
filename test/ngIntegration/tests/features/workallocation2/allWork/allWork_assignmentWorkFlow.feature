
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
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
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

        When I open Manage link for task at row <taskAtRow>
        Then I see action link "<action>" is present for task with Manage link open
        When I click action link "<action>" on task with Manage link open
        Then I see find person page displayed with caption "<action>"
        When I enter search term "test" in find person input text
        Then I see following options available in find person results
            | value             |
            | Test12@justice.uk |
            | Test23@justice.uk |
            | Test34@justice.uk |
            | Test45@justice.uk |
        When I select find person result "Test23@justice.uk"
        Then I see find person is selected with "Test23@justice.uk"

        When I click continue in find person page

        Then I see task check your changes page for action "<action>" displayed

        Then I validate task details displayed in check your changes page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

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
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    | 1         | Assign task   | Assign         | You've assigned a task to somebody else.   |



    Scenario Outline:  Task Manage links for "<UserType>" action "<action>" cancel in find person page
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
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

        When I open Manage link for task at row <taskAtRow>
        Then I see action link "<action>" is present for task with Manage link open
        When I click action link "<action>" on task with Manage link open
        Then I see find person page displayed with caption "<action>"
        When I enter search term "test" in find person input text
        Then I see following options available in find person results
            | value             |
            | Test12@justice.uk |
            | Test23@justice.uk |
            | Test34@justice.uk |
            | Test45@justice.uk |
        When I select find person result "Test23@justice.uk"
        Then I see find person is selected with "Test23@justice.uk"

        When I click cancel link in find person page

      
        Then I see navigation header tab page "All work"
       
        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action        | submitBtnLabel | bannermessage                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Reassign task | Reassign       | You've reassigned a task to somebody else. |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    | 1         | Assign task   | Assign         | You've assigned a task to somebody else.   |



    Scenario Outline:  Task Manage links for "<UserType>" action "<action>" cancel check your changes page
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>"
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

        When I open Manage link for task at row <taskAtRow>
        Then I see action link "<action>" is present for task with Manage link open
        When I click action link "<action>" on task with Manage link open
        Then I see find person page displayed with caption "<action>"
        When I enter search term "test" in find person input text
        Then I see following options available in find person results
            | value             |
            | Test12@justice.uk |
            | Test23@justice.uk |
            | Test34@justice.uk |
            | Test45@justice.uk |
        When I select find person result "Test23@justice.uk"
        Then I see find person is selected with "Test23@justice.uk"

        When I click continue in find person page

        Then I see task check your changes page for action "<action>" displayed

        Then I validate task details displayed in check your changes page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        Then I validate column "Person" value is set to "test23 person" in task check your changes page
        When I click cancel in check your changes of work allocation

        Then I see navigation header tab page "All work"

        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action        | submitBtnLabel | bannermessage                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Reassign task | Reassign       | You've reassigned a task to somebody else. |
            | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    | 1         | Assign task   | Assign         | You've assigned a task to somebody else.   |









