# Requirements
# https://tools.hmcts.net/confluence/display/EUI/Work+Allocation-+Release+2#WorkAllocationRelease2-ManagelinklogicforTasksandCases

@ng @wa2 @wa @ignore 
Feature: WA Release 2: My cases - Manage links - Action work flow

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK workallocation cases with permissions for view "My cases"
            | Roles          | Count |
            | case-allocator | 10 |
            | case-allocator | 90 |

    Scenario Outline:  Task Manage links for "<UserType>" action "<action>"
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
      
        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases count in page 25

        When I open Manage link for wa cases at row <taskAtRow>
        Then I see action link "<action>" is present for case with Manage link open
        When I click action link "<action>" on task with Manage link open
        Then I am in workflow page "Reallocate"
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

        Then I validate task details displayed in check your changes page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        Then I validate column "Person" value is set to "test23 person" in task check your changes page
        When I click submit button "<submitBtnLabel>" in task check your changes page
        Then I see navigation header tab page "My work"
        Then I validate notification message banner is displayed in "My work" page
        Then I validate notification banner messages displayed in "My work" page
            | message         |
            | <bannermessage> |

        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action     | submitBtnLabel | bannermessage                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Reallocate | Reallocate     | You've reassigned a task to somebody else. |

    Scenario Outline:  Case Manage links for "<UserType>" action "<action>" cancel in check your changes page
        Given I set MOCK with user "<UserIdentifier>" and roles "<Roles>,task-supervisor,case-allocator" with reference "userDetails"
       
        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "My work", I see selected tab page displayed
        When I navigate to My work sub navigation tab "My cases"

        Then I validate work allocation cases count in page 25

        When I open Manage link for wa cases at row <taskAtRow>
        Then I see action link "<action>" is present for case with Manage link open
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

        Then I validate task details displayed in check your changes page
            | Case name        | Case category      | Location      |
            | Allwork test scr | auto test category | London QA lab |

        Then I validate column "Person" value is set to "test23 person" in task check your changes page
        When I click cancel in check your changes of work allocation

        Then I see navigation header tab page "My work"


        Examples:
            | UserIdentifier     | UserType   | Roles                                              | taskAtRow | action | submitBtnLabel | bannermessage                              |
            | IAC_CaseOfficer_R2 | Caseworker | caseworker-ia-caseofficer,caseworker-ia-admofficer | 4         | Remove | Reassign       | You've reassigned a task to somebody else. |

