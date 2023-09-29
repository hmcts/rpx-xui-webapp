# Tests covered in Unit tests
Feature: WA Release 2: My work - My Tasks - negative scenarios

    Background: Mock and browser setup
        Given I init MockApp

    Scenario Outline:  My Tasks error with response code <ResponseCode>
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia,-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK api method "post" endpoint "/workallocation/task/" with error response code <ResponseCode>
        Given I start MockApp
        # Given I navigate to home page
        Given I reload app if "<AppReload>"
        Then I see error message of type "<ErrorMessageType>" displayed with message "<ErrorMessage>"
        Examples:
            | AppReload | ResponseCode | ErrorMessageType | ErrorMessage                                        |
            | yes       | 500          | Page             | Sorry, there is a problem with the service          |
            | yes        | 400          | Page             | Sorry, there is a problem with the service          |
            | yes        | 401          | Page             | Sorry, you're not authorised to perform this action |
            | yes        | 403          | Page             | Sorry, you're not authorised to perform this action |


    Scenario Outline:  Locations api error with response code <ResponseCode>
        Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK api method "get" endpoint "/workallocation/location" with error response code <ResponseCode>
        Given I start MockApp
        Given I navigate to home page

        Then I see error message of type "<ErrorMessageType>" displayed with message "<ErrorMessage>"
        Examples:
            | ResponseCode | ErrorMessageType | ErrorMessage                                        |
            | 500          | Page             | Sorry, there is a problem with the service          |
            | 400          | Page             | Sorry, there is a problem with the service          |
            | 401          | Page             | Sorry, you're not authorised to perform this action |
            | 403          | Page             | Sorry, you're not authorised to perform this action |

