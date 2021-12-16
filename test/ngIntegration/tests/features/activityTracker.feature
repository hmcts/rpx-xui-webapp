@ng 
Feature: Activity tracket basic validation

    Scenario: Verify activity tracket network call to confirm feature is available

        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases"
        Then I see case list page displayed

        Then I verify a networkc all made with endpoint containing "activity/case"