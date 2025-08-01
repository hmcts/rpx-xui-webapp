@ng @wa2 @wa @codecept_enabled
Feature: WA Release 2: My work - My tasks - Task assignment

    Background: Mock and browser setup
        Given I init MockApp
       
    Scenario Outline:  Task Manage links for "<UserType>" action "<action>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 30001        |
        Given I set MOCK person with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator"
            | locationId | locationName           |
            | 20001      | IA Court Aldgate Tower |


        Given I set MOCK tasks with permissions for view "My tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |
        Given I set MOCK tasks with attributes for view "My tasks"
            | index | permissions                | assignee            | case_name | location_name   | task_title       | due_date | hearing_date | created_date | case_category        |
            | 0 | Manage,Read,Execute,Cancel | 1234-1234-1234-1231 | Allwork test scr | London QA lab | test auto task 1 | -1 | 20 | -10 | auto test category |
            | 1     | Manage                     | 1234-1234-1234-1231 | case 2    | test location 2 | test auto task 2 | 0        | 21           | -10          | auto test category 2 |
            | 2     | Read                       | 1234-1234-1234-1231 | case 3    | test location 3 | test auto task 3 | 1        | 22           | -10          | auto test category 3 |
            | 3 | Manage,Read,Execute,reassign,unassign,assign,Cancel | 1234-1234-1234-1231 | Allwork test scr | London QA lab   | test auto task 1 | -1  | 20 | -10 | auto test category   |
            | 4 | Manage,Read,Execute,Cancel | 1234-1234-1234-1231 | Allwork test scr | London QA lab   | test auto task 1 | -1  | 20 | -10 | auto test category   |
            | 5 | Read                       | 1234-1234-1234-1231 | case 6           | test location 6 | test auto task 6 | -30 | 30 | -40 | auto test category 6 |

        # Given I set MOCK task details for WA release2
        #     | case_name        | case_category      | location_name |
        #     | Allwork test scr | auto test category | London QA lab |

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
        When In workflow "<action>", I enter search term "LEGAL" in find person input text

        When In workflow "<action>", I select find person result "ia_civil_legal_operations_1@justice.gov.uk"
        Then In workflow "<action>", I see find person is selected with "ia_civil_legal_operations_1@justice.gov.uk"

        When In workflow "<action>", I click continue

        Then I see task check your changes page for action "<action>" displayed

        Then I validate task details displayed in check your changes page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        Then I validate column "Person" value is set to "LEGAL_OPERATIONS 1 IA" in task check your changes page
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
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 30001        |
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
        When In workflow "<action>", I enter search term "LEGAL" in find person input text

        When In workflow "<action>", I select find person result "ia_civil_legal_operations_1@justice.gov.uk"
        Then In workflow "<action>", I see find person is selected with "ia_civil_legal_operations_1@justice.gov.uk"

        When In workflow "<action>", I click continue


        Then I see task check your changes page for action "<action>" displayed

        Then I validate task details displayed in check your changes page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        Then I validate column "Person" value is set to "LEGAL_OPERATIONS 1 IA" in task check your changes page
        When I click cancel in check your changes of work allocation

        Then I see navigation header tab page "My work"
      

        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action        | submitBtnLabel | bannermessage                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Reassign task | Reassign       | You've reassigned a task to somebody else. |

    Scenario Outline:  Task Manage links for "<UserType>" action "<action>" cancel in find person page
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 30001        |
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
        When In workflow "<action>", I enter search term "LEGAL" in find person input text

        When In workflow "<action>", I select find person result "ia_civil_legal_operations_1@justice.gov.uk"
        Then In workflow "<action>", I see find person is selected with "ia_civil_legal_operations_1@justice.gov.uk"


        When In workflow "<action>", I click cancel link

        Then I see navigation header tab page "My work"


        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action        | submitBtnLabel | bannermessage                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Reassign task | Reassign       | You've reassigned a task to somebody else. |


    # Scenario Outline:  Task assign to unaithorised user "<UserType>" action "<action>"
    #     Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
    #     Given I set MOCK user with reference "userDetails" roleAssignmentInfo
    #         | jurisdiction | substantive | roleType     | baseLocation |
    #         | IA           | Y           | ORGANISATION | 20001        |
    #         | SSCS         | Y           | ORGANISATION | 30001        |
    #     Given I set MOCK person with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator"
    #         | locationId | locationName           |
    #         | 20001      | IA Court Aldgate Tower |

    #     Given I set MOCK api method "post" endpoint "/workallocation/task/:taskId/assign" with error response code 401
        
    #     Given I start MockApp
    #     Given I navigate to home page

    #     When I click on primary navigation header tab "My work", I see selected tab page displayed
    #     Then I validate tasks count in page 25

    #     Given I capture task details at row <taskAtRow> with reference "taskDetails"

    #     When I open Manage link for task at row <taskAtRow>
    #     Then I see action link "<action>" is present for task with Manage link open
    #     When I click action link "<action>" on task with Manage link open
    #     Then I am in workflow page "Reassign task"

    #     Then In workflow "<action>", I see select role type page displayed with header "Choose a role type"
    #     Then In workflow "<action>", I see select role type page displayed with caption "Reassign task"
    #     Then In workflow "<action>", I see select role type radio options "Legal Ops,Judicial"
    #     Then In workflow "<action>", I select role type radio options "Legal Ops"
    #     When In workflow "<action>", I click continue

    #     Then In workflow "<action>", I see find person page displayed with caption "<action>"
    #     When In workflow "<action>", I enter search term "LEGAL" in find person input text

    #     When In workflow "<action>", I select find person result "ia_civil_legal_operations_1@justice.gov.uk"
    #     Then In workflow "<action>", I see find person is selected with "ia_civil_legal_operations_1@justice.gov.uk"

    #     When In workflow "<action>", I click continue

    #     Then I see task check your changes page for action "<action>" displayed

    #     Then I validate task details displayed in check your changes page
    #         | Case name        | Case category      | Location      |
    #         | Allwork test scr | auto test category | London QA lab |

    #     Then I validate column "Person" value is set to "LEGAL_OPERATIONS 1 IA" in task check your changes page
    #     When I click submit button "<submitBtnLabel>" in task check your changes page
        
        
    #     # Then I see see page task assignment person not authorised page
    #     # Then I see see page task assignment authorisation error message "The person you selected is not authorised to perform this task. Select back to search again."
    #     # When I click back button in task assignment authorisation error page

    #     Then I see My work My Tasks page
    #     Examples:
    #         | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action        | submitBtnLabel | bannermessage                              |
    #         | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Reassign task | Reassign       | You've reassigned a task to somebody else. |



