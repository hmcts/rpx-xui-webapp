
@ng 
Feature: Work allocation 2 feature route guards

    These tests would be valid untill work allocation 2 features are enabled for all users

    Scenario Outline: Release 2 routes not accessible to release 1 users
        Given I set MOCK with user "IAC_CaseOfficer_R1" and roles "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer" with reference "userDetails"
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header tab "Create case", I see selected tab page displayed
        Then I see page with css locator "exui-filter-case"


        Given I navigate to page route "<Route>"
        Then I see page with css locator "exui-case-list"

        Examples:
            | Route                                                                                                                                                                                                                                             |
            | /work/all-work/tasks                                                                                                                                                                                                                              |
            | /role-access/allocate-role/allocate?caseId=1620409659381330&roleCategory=JUDICIAL                                                                                                                                                                 |
            | /role-access/allocate-role/remove?caseId=1620409659381330&roleCategory=JUDICIAL&assignmentId=ed78f621-c444-426a-98e1-2b375b97f00c&actorId=44d5d2c2-7112-4bef-8d05-baaa610bf463&userName=ed78f621-c444-426a-98e1-2b375b97f00c&typeOfRole=judge     |
            | /role-access/allocate-role/reallocate?caseId=1620409659381330&roleCategory=JUDICIAL&assignmentId=850e92e1-7fe7-450c-ada3-a3bce6cb70a7&actorId=44d5d2c2-7112-4bef-8d05-baaa610bf463&userName=850e92e1-7fe7-450c-ada3-a3bce6cb70a7&typeOfRole=judge |
            | /role-access/delete-exclusion/1620409659381330                                                                                                                                                                                                    |

    # Scenario Outline: Release 2 routes for case allocator
    #     Given I set MOCK with user "IAC_CaseOfficer_R2" and roles "caseworker-ia-caseofficer,caseworker-ia-admofficer,task-supervisor,case-allocator" with reference "userDetails"
    #     Given I set MOCK user with reference "userDetails" roleAssignmentInfo
    #         | isCaseAllocator | jurisdiction | primaryLocation |
    #         | false           | IA           | 12345           |
    #     Given I start MockApp
    #     Given I navigate to home page
    #     When I click on primary navigation header tab "My work", I see selected tab page displayed

    #     Given I navigate to page route "http://localhost:3000<Route>"
    #     Then I see page with css locator "exui-task-home"

    #     Examples:
    #         | Route                                                                                                                                                                                                                                             |
    #         | /role-access/allocate-role/remove?caseId=1620409659381330&roleCategory=JUDICIAL&assignmentId=ed78f621-c444-426a-98e1-2b375b97f00c&actorId=44d5d2c2-7112-4bef-8d05-baaa610bf463&userName=ed78f621-c444-426a-98e1-2b375b97f00c&typeOfRole=judge     |
    #         | /role-access/allocate-role/reallocate?caseId=1620409659381330&roleCategory=JUDICIAL&assignmentId=850e92e1-7fe7-450c-ada3-a3bce6cb70a7&actorId=44d5d2c2-7112-4bef-8d05-baaa610bf463&userName=850e92e1-7fe7-450c-ada3-a3bce6cb70a7&typeOfRole=judge |
    #         | /role-access/add-exclusion?caseId=1620409659381330&jurisdiction=IA                                                                                                                                                                                |
    #         | /role-access/delete-exclusion/1620409659381330                                                                                                                                                                                                    |




