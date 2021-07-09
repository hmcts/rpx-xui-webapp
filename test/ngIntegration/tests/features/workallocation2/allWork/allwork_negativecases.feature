@ng
Feature: WA Release 2: All work -  negative scenarios

    Background: Mock and browser setup
        Given I init MockApp


    Scenario Outline: Tasks error with response code <ResponseCode>
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer"
        Given I set MOCK api method "post" endpoint "/workallocation2/taskWithPagination/" with error response code <ResponseCode>
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "All work"

        Then I see error message of type "<ErrorMessageType>" with message "<ErrorMessage>"
        Examples:
            | ResponseCode | ErrorMessageType | ErrorMessage                                        |
            | 500          | Page             | Sorry, there is a problem with the service          |
            | 400          | Page             | Sorry, there is a problem with the service          |
            | 401          | Page             | Sorry, you're not authorised to perform this action |
            | 403          | Page             | Sorry, you're not authorised to perform this action |

    Scenario Outline:  Locations error with response code <ResponseCode>
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer"
        Given I set MOCK api method "get" endpoint "/workallocation2/location" with error response code <ResponseCode>
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "All work"

        Then I see error message of type "<ErrorMessageType>" with message "<ErrorMessage>"
        Examples:
            | ResponseCode | ErrorMessageType | ErrorMessage                                        |
            | 500          | Page             | Sorry, there is a problem with the service          |
            | 400          | Page             | Sorry, there is a problem with the service          |
            | 401          | Page             | Sorry, you're not authorised to perform this action |
            | 403          | Page             | Sorry, you're not authorised to perform this action |

    Scenario Outline:  Caseworkers/Person api error with response code <ResponseCode>
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer"
        Given I set MOCK api method "get" endpoint "/workallocation2/caseworker" with error response code <ResponseCode>
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "All work"

        Then I see error message of type "<ErrorMessageType>" with message "<ErrorMessage>"
        Examples:
            | ResponseCode | ErrorMessageType | ErrorMessage                                        |
            | 500          | Page             | Sorry, there is a problem with the service          |
            | 400          | Page             | Sorry, there is a problem with the service          |
            | 401          | Page             | Sorry, you're not authorised to perform this action |
            | 403          | Page             | Sorry, you're not authorised to perform this action |