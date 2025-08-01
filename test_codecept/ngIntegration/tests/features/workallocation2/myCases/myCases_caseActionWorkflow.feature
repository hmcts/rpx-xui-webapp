# Requirements
# https://tools.hmcts.net/confluence/display/EUI/Work+Allocation-+Release+2#WorkAllocationRelease2-ManagelinklogicforTasksandCases

@ng @wa2 @wa  
Feature: WA Release 2: My cases - Manage links - Action work flow

    Background: Mock and browser setup
        Given I init MockApp
       

    Scenario Outline:  Task Manage links for "<UserType>" action "<action>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | roleName       | baseLocation |
            | IA           | Y           | ORGANISATION | case-allocator | 20001        |
            | SSCS         | Y           | ORGANISATION | case-allocator | 20001        |


        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | caseType | substantive | roleType | caseId           |
            | IA           | Asylum   | Y           | CASE     | 1234567812345670 |
            | SSCS         | Asylum   | Y           | CASE     | 1234567812345671 |

        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases count in page 2

        When I open Manage link for wa cases at row <taskAtRow>
        Then I see action link "<action>" is present for case with Manage link open
        When I click action link "<action>" on task with Manage link open
        Then I am in workflow page "Reallocate"
        Then In workflow "<action>", I see find person page displayed with caption "<action>"
        When In workflow "<action>", I enter search term "LEGAL" in find person input text
        Then In workflow "<action>", I see following options available in find person results
            | value             |
            | LEGAL_OPERATIONS 2 IA_CIVIL (ia_civil_legal_operations_2@justice.gov.uk) |
  
        When In workflow "<action>", I select find person result "LEGAL_OPERATIONS 2 IA_CIVIL (ia_civil_legal_operations_2@justice.gov.uk)"
        Then In workflow "<action>", I see find person is selected with "LEGAL_OPERATIONS 2 IA_CIVIL (ia_civil_legal_operations_2@justice.gov.uk)"

        When In workflow "<action>", I click continue

        Then I see Allocate role work flow page "Duration of role" with caption "<action>" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see case allocation check your changes page for action "<action>" displayed

        Then I validate task details displayed in check your changes page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        Then I validate column "Person" value is set to "LEGAL_OPERATIONS 2" in case allocation check your changes page
        When I click submit button "<submitBtnLabel>" in case allocate check your changes page
        Then I see navigation header tab page "My work"
        Then I validate notification message banner is displayed in "My work" page
        Then I validate notification banner messages displayed in "My work" page
            | message         |
            | <bannermessage> |

        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action     | submitBtnLabel | bannermessage                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 1 | Reallocate | Confirm allocation | You've reallocated a role |

    # Scenario Outline:  Case Manage links for "<UserType>" action "<action>" cancel in check your changes page
    #     Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
    #     Given I set MOCK user with reference "userDetails" roleAssignmentInfo
    #         | jurisdiction | substantive | roleType     | roleName       | baseLocation |
    #         | IA           | Y           | ORGANISATION | case-allocator | 20001        |
    #         | SSCS         | Y           | ORGANISATION | case-allocator | 20001        |


    #     Given I set MOCK user with reference "userDetails" roleAssignmentInfo
    #         | jurisdiction | caseType | substantive | roleType | caseId           |
    #         | IA           | Asylum   | Y           | CASE     | 1234567812345670 |
    #         | SSCS         | Asylum   | Y           | CASE     | 1234567812345671 |

    #     Given I start MockApp
    #     Given I navigate to home page

    #     When I click on primary navigation header tab "My work", I see selected tab page displayed
    #     When I navigate to My work sub navigation tab "My cases"

    #     Then I validate work allocation cases count in page 2

    #     When I open Manage link for wa cases at row <taskAtRow>
    #     Then I see action link "<action>" is present for case with Manage link open
    #     When I click action link "<action>" on task with Manage link open
    #     Then In workflow "<action>", I see find person page displayed with caption "<action>"
    #     When In workflow "<action>", I enter search term "LEGAL" in find person input text
    #     Then In workflow "<action>", I see following options available in find person results
    #         | value                                  |
    #         | LEGAL_OPERATIONS 2 IA_CIVIL (ia_civil_legal_operations_2@justice.gov.uk) |
    #     When In workflow "<action>", I select find person result "LEGAL_OPERATIONS 2 IA_CIVIL (ia_civil_legal_operations_2@justice.gov.uk)"
    #     Then In workflow "<action>", I see find person is selected with "LEGAL_OPERATIONS 2 IA_CIVIL (ia_civil_legal_operations_2@justice.gov.uk)"

    #     When In workflow "<action>", I click continue

    #     Then I see Allocate role work flow page "Duration of role" with caption "<action>" is displayed
    #     When I select duration option "Indefinite" in work flow
    #     Then I validate date input field "Access starts" is displayed "No" in work flow page
    #     Then I validate date input field "Access ends" is displayed "No" in work flow page
    #     When I click continue in work flow page "Duration of role"


    #     Then I see task check your changes page for action "<action>" displayed

    #     Then I validate task details displayed in check your changes page
    #         | Case name        | Case category      | Location      |
    #         | Allwork test scr | auto test category | London QA lab |

    #     Then I validate column "Person" value is set to "test23 person" in task check your changes page
    #     When I click cancel in check your changes of work allocation

    #     Then I see navigation header tab page "My work"


    #     Examples:
    #         | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action | submitBtnLabel | bannermessage                              |
    #         | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 1         | Remove | Reassign       | You've reassigned a task to somebody else. |

