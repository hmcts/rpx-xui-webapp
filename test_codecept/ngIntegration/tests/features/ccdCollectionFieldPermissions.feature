
Feature: Collection field displat_context_parameter permissions
    Background: Start mock app
        Given I set MOCK event "CollectionFieldPermission" config with reference "testEventRef"
        Given I start MockApp


    Scenario Outline:  Case edipt page navigation
        Given I set MOCK event config "testEventRef" field "collectionField" properties
            | display_context_parameter | <Value> |

        Given I set MOCK with user roles
            | role                      |
            | caseworker-ia-caseofficer |
            | caseworker-ia-admofficer  |
        Given I navigate page route "cases/case-create/Test_Jurisdiction/Test_case/testEvent/testPage"
        Then I see case edit page displayed
        Then I see collection field "collectionField" "Add" button is "<Addbuttonstate>"
        Then I see collection field "collectionField" "Remove" button is "<Removebuttonstate>"


        Examples:
            | Value                                                                  | Addbuttonstate | Removebuttonstate |
            | null                                                                   | disabled       | disabled          |
            | #COLLECTION(allowInsert,allowDelete)                                   | enabled        | enabled           |
            | #COLLECTION(allowInsert)                                               | enabled        | disabled          |
            | #COLLECTION(allowDelete)                                               | disabled       | enabled           |
            | #TABLE(AddressLine1,AddressLine2),#COLLECTION(allowInsert,allowDelete) | enabled        | enabled           |
            | #COLLECTION()                                                          | disabled       | disabled          |
