@ng @wa2 @wa  @test
Feature: WA Release 2: My cases - negative scenarios

    Background: Mock and browser setup
        Given I init MockApp


    Scenario Outline:  My cases error with response code <ResponseCode>
        Given I set MOCK with user "<UserIdentifier>" and roles "<UserRoles>"
        Given I set MOCK api method "post" endpoint "/workallocation2/caseWithPagination/" with error response code <ResponseCode>
        Given I start MockApp
        Given I navigate to home page
        When I navigate to My work sub navigation tab "My cases"


        Then I see error message of type "<ErrorMessageType>" with message "<ErrorMessage>"
        Examples:
            | UserIdentifier     | UserRoles                                          | ResponseCode | ErrorMessageType | ErrorMessage                                        |
            | IAC_CaseOfficer_R2 | caseworker-ia-caseofficer,caseworker-ia-admofficer | 500          | Page             | Sorry, there is a problem with the service          |
            | IAC_Judge_WA_R2    | caseworker-ia-iacjudge,caseworker-ia,caseworker    | 400          | Page             | Sorry, there is a problem with the service          |
            | IAC_CaseOfficer_R2 | caseworker-ia-caseofficer,caseworker-ia-admofficer | 401          | Page             | Sorry, you're not authorised to perform this action |
            | IAC_Judge_WA_R2    | caseworker-ia-iacjudge,caseworker-ia,caseworker    | 403          | Page             | Sorry, you're not authorised to perform this action |

