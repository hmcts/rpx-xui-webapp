@ng 
Feature: WA Release 2: My work -  Available tasks - Negative Scenarios

    Background: Mock and browser setup
        Given I init MockApp


    Scenario Outline:  Available Tasks error with response code <ResponseCode>
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker"
        Given I start MockApp
        Given I navigate to home page


        When I click on primary navigation header tab "My work", I see selected tab page displayed
        Given I set MOCK api method "post" endpoint "/workallocation2/taskWithPagination/" with error response code <ResponseCode>
        Given I start MockApp
        When I navigate to My work sub navigation tab "Available tasks"
        Then I see error message of type "<ErrorMessageType>" with message "<ErrorMessage>"
        Examples:
            | ResponseCode | ErrorMessageType | ErrorMessage                                        |
            | 500          | Page             | Sorry, there is a problem with the service          |
            | 400          | Page             | Sorry, there is a problem with the service          |
            | 401          | Page             | Sorry, you're not authorised to perform this action |
            | 403          | Page             | Sorry, you're not authorised to perform this action |

