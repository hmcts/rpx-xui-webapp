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
        When I click cancel in case edit page, I see case list page displayed

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
            | true         |
            | false        |

    Scenario:  Validate summary page fields
        Given I set MOCK event "caseConfig" props
            | show_summary | YES |
        Given I set MOCK event config "caseConfig" field "TextField0" properties
            | show_summary_change_option | YES |
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I restart MockApp
        Given I navigate page route "cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage"
        Then I see case edit page displayed

        Then I validate config "caseConfig" case edit wizard pages and fields in pages

    Scenario:  Validate event fields show_condition evaluation
        Given I set MOCK event "caseConfig" props
            | show_summary | YES |
        Given I set MOCK event config "caseConfig" field "MultiSelectListField" properties
            | show_condition | Gender="notGiven" |
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I restart MockApp
        Given I navigate page route "cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage"
        Then I see case edit page displayed

        When I input fields in case edit page from event "caseConfig" with values
            | fieldId    | value           |
            | TextField0 | test text field |
            | Gender     | male            |

        Then I validate fields display in case edit page from event "caseConfig"
            | fieldId              | isDisplayed |
            | MultiSelectListField | false       |

        When I input fields in case edit page from event "caseConfig" with values
            | fieldId    | value           |
            | TextField0 | test text field |
            | Gender     | notGiven        |

        Then I validate fields display in case edit page from event "caseConfig"
            | fieldId              | isDisplayed |
            | MultiSelectListField | true        |

    Scenario Outline:  Validate validation error message display on validate request error with status <ErrorStatusCode>
        Given I set MOCK event "caseConfig" props
            | show_summary | YES |
        Given I set MOCK event config "caseConfig" field "TextField0" properties
            | show_summary_change_option | YES |
        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I restart MockApp
        Given I navigate page route "cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage"
        Then I see case edit page displayed

        Then I validate event page continue on validate request error status code <ErrorStatusCode>

  Examples:
      | ErrorStatusCode |
      | 400 |
      | 500 | 
