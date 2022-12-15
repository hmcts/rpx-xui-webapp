@ng @wa2 @wa 
Feature: WA Release 2: My work - My tasks - Task assignment

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK tasks with permissions for view "My tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK tasks with attributes for view "My tasks"
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
            | 20009 | IA Court Taylor House  |

    Scenario Outline:  Task Manage links for "<UserType>" action "<action>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | baseLocation | roleType     |
            | IA | 20001 | ORGANISATION |
            | SSCS         |            | ORGANISATION |
        Given I set MOCK person with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator"
            | locationId | locationName           |
            | 20001      | IA Court Aldgate Tower |
        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I capture task details at row <taskAtRow> with reference "taskDetails"

        When I open Manage link for task at row <taskAtRow>
        Then I see action link "<action>" is present for task with Manage link open
        When I click action link "<action>" on task with Manage link open
        Then I am in workflow page "Reassign task"
        
        Then In workflow "<action>", I see select role type page displayed with header "Choose a role type"
        Then In workflow "<action>", I see select role type page displayed with caption "Reassign task"
        Then In workflow "<action>", I see select role type radio options "Legal Ops,Judicial"
        Then In workflow "<action>", I select role type radio options "Legal Ops"
        When In workflow "<action>", I click continue

        Then In workflow "<action>", I see find person page displayed with caption "<action>"
        When In workflow "<action>", I enter search term "jane" in find person input text

        When In workflow "<action>", I select find person result "testemail0@testdomain.com"
        Then In workflow "<action>", I see find person is selected with "testemail0@testdomain.com"

        When In workflow "<action>", I click continue

        Then I see task check your changes page for action "<action>" displayed

        Then I validate task details displayed in check your changes page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        Then I validate column "Person" value is set to "Jane 0 Doe" in task check your changes page
        When I click submit button "<submitBtnLabel>" in task check your changes page
        Then I see navigation header tab page "My work"
        Then I validate notification message banner is displayed in "My work" page
        Then I validate notification banner messages displayed in "My work" page
            | message         |
            | <bannermessage> |

        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action        | submitBtnLabel | bannermessage                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Reassign task | Reassign       | You've reassigned a task to somebody else. |

    Scenario Outline:  Task Manage links for "<UserType>" action "<action>" cancel in check your changes page
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | baseLocation | roleType     |
            | IA | 20001 | ORGANISATION |
            | SSCS         |            | ORGANISATION |
        Given I set MOCK person with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator"
            | locationId | locationName           |
            | 20001      | IA Court Aldgate Tower |
        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I capture task details at row <taskAtRow> with reference "taskDetails"

        When I open Manage link for task at row <taskAtRow>
        Then I see action link "<action>" is present for task with Manage link open
        When I click action link "<action>" on task with Manage link open
        Then I am in workflow page "Reassign task"

        Then In workflow "<action>", I see select role type page displayed with header "Choose a role type"
        Then In workflow "<action>", I see select role type page displayed with caption "Reassign task"
        Then In workflow "<action>", I see select role type radio options "Legal Ops,Judicial"
        Then In workflow "<action>", I select role type radio options "Legal Ops"
        When In workflow "<action>", I click continue

        Then In workflow "<action>", I see find person page displayed with caption "<action>"
        When In workflow "<action>", I enter search term "jane" in find person input text

        When In workflow "<action>", I select find person result "testemail0@testdomain.com"
        Then In workflow "<action>", I see find person is selected with "testemail0@testdomain.com"

        When In workflow "<action>", I click continue


        Then I see task check your changes page for action "<action>" displayed

        Then I validate task details displayed in check your changes page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        Then I validate column "Person" value is set to "Jane 0 Doe" in task check your changes page
        When I click cancel in check your changes of work allocation

        Then I see navigation header tab page "My work"
      

        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action        | submitBtnLabel | bannermessage                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Reassign task | Reassign       | You've reassigned a task to somebody else. |

    Scenario Outline:  Task Manage links for "<UserType>" action "<action>" cancel in find person page
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | baseLocation | roleType     |
            | IA | 20001 | ORGANISATION |
            | SSCS         |            | ORGANISATION |
        Given I set MOCK person with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator"
            | locationId | locationName           |
            | 20001      | IA Court Aldgate Tower |
        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I capture task details at row <taskAtRow> with reference "taskDetails"

        When I open Manage link for task at row <taskAtRow>
        Then I see action link "<action>" is present for task with Manage link open
        When I click action link "<action>" on task with Manage link open
        Then I am in workflow page "Reassign task"

        Then In workflow "<action>", I see select role type page displayed with header "Choose a role type"
        Then In workflow "<action>", I see select role type page displayed with caption "Reassign task"
        Then In workflow "<action>", I see select role type radio options "Legal Ops,Judicial"
        Then In workflow "<action>", I select role type radio options "Legal Ops"
        When In workflow "<action>", I click continue

        Then In workflow "<action>", I see find person page displayed with caption "<action>"
        When In workflow "<action>", I enter search term "jane" in find person input text

        When In workflow "<action>", I select find person result "testemail0@testdomain.com"
        Then In workflow "<action>", I see find person is selected with "testemail0@testdomain.com"


        When In workflow "<action>", I click cancel link

        Then I see navigation header tab page "My work"


        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action        | submitBtnLabel | bannermessage                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Reassign task | Reassign       | You've reassigned a task to somebody else. |


    Scenario Outline:  Task assign to unaithorised user "<UserType>" action "<action>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | baseLocation | roleType     |
            | IA | 20001 | ORGANISATION |
            | SSCS         |            | ORGANISATION |
        Given I set MOCK person with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator"
            | locationId | locationName           |
            | 20001      | IA Court Aldgate Tower |

        Given I set MOCK api method "post" endpoint "/workallocation/task/:taskId/assign" with error response code 401
        
        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I capture task details at row <taskAtRow> with reference "taskDetails"

        When I open Manage link for task at row <taskAtRow>
        Then I see action link "<action>" is present for task with Manage link open
        When I click action link "<action>" on task with Manage link open
        Then I am in workflow page "Reassign task"

        Then In workflow "<action>", I see select role type page displayed with header "Choose a role type"
        Then In workflow "<action>", I see select role type page displayed with caption "Reassign task"
        Then In workflow "<action>", I see select role type radio options "Legal Ops,Judicial"
        Then In workflow "<action>", I select role type radio options "Legal Ops"
        When In workflow "<action>", I click continue

        Then In workflow "<action>", I see find person page displayed with caption "<action>"
        When In workflow "<action>", I enter search term "jane" in find person input text

        When In workflow "<action>", I select find person result "testemail0@testdomain.com"
        Then In workflow "<action>", I see find person is selected with "testemail0@testdomain.com"

        When In workflow "<action>", I click continue

        Then I see task check your changes page for action "<action>" displayed

        Then I validate task details displayed in check your changes page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        Then I validate column "Person" value is set to "Jane 0 Doe" in task check your changes page
        When I click submit button "<submitBtnLabel>" in task check your changes page
        
        
        Then I see see page task assignment person not authorised page
        Then I see see page task assignment authorisation error message "The person you selected is not authorised to perform this task. Select back to search again."
        When I click back button in task assignment authorisation error page

        Then I see My work My Tasks page
        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action        | submitBtnLabel | bannermessage                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Reassign task | Reassign       | You've reassigned a task to somebody else. |



