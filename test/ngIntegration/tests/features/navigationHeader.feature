@ng
Feature: Navigation header tabs
    Background: Start mock app
        Given I start MockApp

    Scenario: Header Tabs Present with ia ad and case officer roles
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate to home page
        Then I see primary navigation tab "Case list" in header
        Then I see primary navigation tab "Create case" in header
        Then I see primary navigation tab "Task list" in header
        Then I see primary navigation tab "Task manager" in header

    Scenario: Header Tabs Present with out ia-adm and ia-caseofficer roles
        Given I set MOCK with user roles
            | role                         |
            | caseworker-divorce-solicitor |
        Given I navigate to home page
        Then I see primary navigation tab "Case list" in header
        Then I see primary navigation tab "Create case" in header
        Then I do not see primary navigation tab "Task list" in header
        Then I do not see primary navigation tab "Task manager" in header

    Scenario: Header Tabs Present with IA Caseofficer role
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
        Given I navigate to home page
        Then I see primary navigation tab "Case list" in header
        Then I see primary navigation tab "Create case" in header
        Then I see primary navigation tab "Task list" in header
        Then I see primary navigation tab "Task manager" in header

    Scenario: Header Tabs Present with IA ADM role
        Given I set MOCK with user roles
            | role                     |
            | caseworker-ia-admofficer |
        Given I navigate to home page
        Then I see primary navigation tab "Case list" in header
        Then I see primary navigation tab "Create case" in header
        Then I see primary navigation tab "Task list" in header
        Then I do not see primary navigation tab "Task manager" in header
