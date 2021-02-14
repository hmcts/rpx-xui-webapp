@ng 
Feature: Case edit pages
    Background: Start mock app
        Given I set mock case create config "caseConfig"
        Given I start MockApp


    Scenario: Case edipt page navigation
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage"
        Then I see case edit page displayed
      
    Scenario: Cancel in page
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage"
        Then I see case edit page displayed
        When I click cancel in case edit page
        Then I see case list page displayed

    Scenario Outline:  Validate config pages and fields 
        Given I set MOCK event "caseConfig" props
            | show_summary | <show_summary> |
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage"
        Then I see case edit page displayed

        Then I validate config "caseConfig" case edit wizard pages and fields in pages

    Examples:
        | show_summary | 
        | YES |
        | NO  |