@ng @wa2 @wa  
Feature: WA Release 2: My work - My tasks - Task actions

    Background: Mock and browser setup
        # Given I navigate to home page


    Scenario Outline:  Task Manage links for "<UserType>"  action "<actionLink>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK person with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator"
            | locationId | locationName           |
            | 20001      | IA Court Aldgate Tower |

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 20001        |

        Given I init MockApp
        Given I set MOCK tasks with permissions for view "My tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |


        Given I set MOCK tasks with attributes for view "My tasks"
            | index | permissions                | assignee            | case_name |
            | 0 | Manage,Read,Execute,cancel | 1234-1234-1234-1234 | case 1 |
            | 1     | Manage,Cancel                     |                     | case 2    |
            | 2     | Read                       |                     | case 3    |
            | 3     | Manage,Read,unassign                | 1234-1234-1234-1234 | case 4    |
            | 4     | Manage,unassign                    | 1234-1234-1234-1234 | case 5    |
            | 5     | Read                       | 1234-1234-1234-1234 | case 6    |
        Given I set MOCK task details for WA release2
            | case_name        | case_category      | location_name |
            | Allwork test scr | auto test category | London QA lab |

        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I capture task details at row <taskAtRow> with reference "taskDetails"

        When I open Manage link for task at row <taskAtRow>
        Then I see action link "<actionLink>" is present for task with Manage link open
        When I click action link "<actionLink>" on task with Manage link open

        Then I see "<actionHeader>" task action page
        Then I validate task action page has description "<actionDescription>"


        Then I validate task details displayed in task action page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        When I click "<submitBtnLabel>" submit button in task action page
        Then I see navigation header tab page "My work"
        Then I validate notification message banner is displayed in "My work" page
        # Then I validate notification banner messages displayed in "My work" page
        #     | message                                   |
        #     | <bannermessage> |

        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | actionLink    | actionHeader  | submitBtnLabel | actionDescription                                                                                           | bannermessage |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Unassign task | Unassign task | Unassign       | Unassign this task. This will send it back to the available task list for someone to pick up.               |               |
            # | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    | 1         | Cancel task   | Cancel a task | Cancel task    | Cancel a task that has not been completed, but is no longer needed. This will remove it from the task list. |               |
    # | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    | 1         | Mark as done  | Mark the task as done | Mark as done   | Mark a task as done if something has gone wrong and it has already been completed.            |               |

    Scenario Outline:  Task Manage links for "<UserType>"  action "<actionLink>" cancel workflow
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"

        Given I set MOCK person with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator"
            | locationId | locationName           |
            | 20001      | IA Court Aldgate Tower |




        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation |
            | IA           | Y           | ORGANISATION | 20001        |
            | SSCS         | Y           | ORGANISATION | 20001        |



        Given I set MOCK tasks with permissions for view "My tasks" and assigned state ""
            | Permissions | Count |
            | Manage      | 100   |
            | Read        | 40    |


        Given I set MOCK tasks with attributes for view "My tasks"
            | index | permissions                | assignee            | case_name |
            | 0 | Manage,Read,Execute,cancel | 1234-1234-1234-1234 | case 1 |
            | 1     | Manage,Cancel                     |                     | case 2    |
            | 2     | Read                       |                     | case 3    |
            | 3     | Manage,Read,unassign              | 1234-1234-1234-1234 | case 4    |
            | 4     | Manage                     | 1234-1234-1234-1234 | case 5    |
            | 5     | Read                       | 1234-1234-1234-1234 | case 6    |
        Given I set MOCK task details for WA release2
            | case_name        | case_category      | location_name |
            | Allwork test scr | auto test category | London QA lab |

        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        Then I validate tasks count in page 25

        Given I capture task details at row <taskAtRow> with reference "taskDetails"

        When I open Manage link for task at row <taskAtRow>
        Then I see action link "<actionLink>" is present for task with Manage link open
        When I click action link "<actionLink>" on task with Manage link open

        Then I see "<actionHeader>" task action page
        Then I validate task action page has description "<actionDescription>"


        Then I validate task details displayed in task action page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        When I click Cancel link in task action page
        Then I see navigation header tab page "My work"


        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | actionLink    | actionHeader  | submitBtnLabel | actionDescription                                                                                           | bannermessage |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Unassign task | Unassign task | Unassign       | Unassign this task. This will send it back to the available task list for someone to pick up.               |               |
            # | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    | 1         | Cancel task   | Cancel a task | Cancel task    | Cancel a task that has not been completed, but is no longer needed. This will remove it from the task list. |               |
# | IAC_Judge_WA_R2    | Judge      | caseworker-ia-iacjudge,caseworker-ia,caseworker    | 1         | Mark as done  | Mark the task as done | Mark as done   | Mark a task as done if something has gone wrong and it has already been completed.            |               |



