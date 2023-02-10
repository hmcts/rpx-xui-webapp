# Requirements
# https://tools.hmcts.net/confluence/display/EUI/Work+Allocation-+Release+2#WorkAllocationRelease2-ManagelinklogicforTasksandCases

@ng @wa2 @wa
Feature: WA Release 2: All work > cases - Manage links - Action work flow

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK workallocation cases with permissions for view "AllWorkCases"
            | Roles          | Count |
            | case-allocator | 10    |
            | case-allocator | 90    |

        Given I set MOCK request "/workallocation/findPerson" intercept with reference "findPersonRequest"

    Scenario:  Judge reaallocate case from all work cases
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK find person response for jurisdictions
            | domain    | id   | email                   | name           | knownAs       |
            | Judicial  | 1231 | judge_user1@gov.uk      | user1 j        | Lead judge    |
            | Judicial  | 1232 | judge_user2@gov.uk      | user2 j        | Hearing judge |
            | Legal Ops | 1233 | caseworker_user1@gov.uk | caseworker1 cw | Case worker   |
            | Legal Ops | 1234 | caseworker_user2@gov.uk | caseworker2 cw | Case worker   |
            | Admin     | 1235 | admin_user1@gov.uk      | admin1 a       | Case worker   |
            | Admin     | 1236 | admin_user2@gov.uk      | admin2 a       | Case worker   |

        Given I set Mock WA case "allWorkCases" property values
            | index | key       | value      |
            | 0     | case_role | lead-judge |

        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"

        Then I see All work cases page displayed
        Then I validate work allocation cases count in page 25

        When I open Manage link for wa cases at row 1
        Then I see action link "Reallocate" is present for case with Manage link open
        When I click action link "Reallocate" on task with Manage link open
        # Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Reallocate a hearing judge" is displayed
        # When I select Choose how to allocate option "Reserve to me" in work flow
        # When I click continue in work flow page "Choose how to allocate the role"

        Then I see Allocate role work flow page "Find the person" with caption "Reallocate a lead judge" is displayed

        Given I reset reference "findPersonRequest" value to null
        When I enter find person search input "user1" in work flow
        Then I validate find person request body from reference "findPersonRequest"
            | userRole | Judicial |
            | searchTerm   | user1    |
        Then I see find person search results in work flow
            | Person                      |
            | user1 j (judge_user1@gov.uk) |
        When I select find person result "user1 j (judge_user1@gov.uk) " in work flow
        When I click continue in work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Reallocate a lead judge" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your changes" with caption "Reallocate a lead judge" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer                      |
            | Who the role will be allocated to | Allocate to another person  |
            | Person                            | user1 j (judge_user1@gov.uk) |
            | Duration of role                  | Indefinite                  |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see All work cases page displayed


    Scenario:  Legal ops reaallocate case manager case from all work cases
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK find person response for jurisdictions
            | domain    | id   | email                   | name           | knownAs       |
            | Judicial  | 1231 | judge_user1@gov.uk      | user1 j        | Lead judge    |
            | Judicial  | 1232 | judge_user2@gov.uk      | user2 j        | Hearing judge |
            | Legal Ops | 1233 | caseworker_user1@gov.uk | caseworker1 cw | Case worker   |
            | Legal Ops | 1234 | caseworker_user2@gov.uk | caseworker2 cw | Case worker   |
            | Admin     | 1235 | admin_user1@gov.uk      | admin1 a       | Case worker   |
            | Admin     | 1236 | admin_user2@gov.uk      | admin2 a       | Case worker   |

        Given I set Mock WA case "allWorkCases" property values
            | index | key           | value            |
            | 0     | case_role     | case-manager     |
            | 0     | role_category | LEGAL_OPERATIONS |
        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"

        Then I validate work allocation cases count in page 25

        When I open Manage link for wa cases at row 1
        Then I see action link "Reallocate" is present for case with Manage link open
        When I click action link "Reallocate" on task with Manage link open
        # Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Reallocate a legal ops case manager" is displayed
        # When I select Choose how to allocate option "Allocate to another person" in work flow
        # When I click continue in work flow page "Choose how to allocate the role"

        Then I see Allocate role work flow page "Find the person" with caption "Reallocate a legal ops case manager" is displayed
        Given I reset reference "findPersonRequest" value to null
        When I enter find person search input "cas" in work flow
        # Then I validate find person request body from reference "findPersonRequest"
        #     | userRole | legal ops |
        # | searchTerm   | cas       |
        Then I see find person search results in work flow
            | Person                                  |
            | caseworker1 cw (caseworker_user1@gov.uk) |
        When I select find person result "caseworker1 cw (caseworker_user1@gov.uk)" in work flow
        When I click continue in work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Reallocate a legal ops case manager" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your changes" with caption "Reallocate a legal ops case manager" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer                                  |
            | Who the role will be allocated to | Allocate to another person              |
            | Person                            | caseworker1 cw (caseworker_user1@gov.uk) |
            | Duration of role                  | Indefinite                              |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see All work cases page displayed



    Scenario:  Legal ops reaallocate lead judge case from all work cases
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK find person response for jurisdictions
            | domain    | id   | email                   | name           | knownAs       |
            | Judicial  | 1231 | judge_user1@gov.uk      | user1 j        | Lead judge    |
            | Judicial  | 1232 | judge_user2@gov.uk      | user2 j        | Hearing judge |
            | Legal Ops | 1233 | caseworker_user1@gov.uk | caseworker1 cw | Case worker   |
            | Legal Ops | 1234 | caseworker_user2@gov.uk | caseworker2 cw | Case worker   |
            | Admin     | 1235 | admin_user1@gov.uk      | admin1 a       | Case worker   |
            | Admin     | 1236 | admin_user2@gov.uk      | admin2 a       | Case worker   |

        Given I set Mock WA case "allWorkCases" property values
            | index | key           | value      |
            | 0     | case_role     | lead-judge |
            | 0     | role_category | JUDICIAL   |
        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"

        Then I validate work allocation cases count in page 25

        When I open Manage link for wa cases at row 1
        Then I see action link "Reallocate" is present for case with Manage link open
        When I click action link "Reallocate" on task with Manage link open
        # Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Reallocate a legal ops case manager" is displayed
        # When I select Choose how to allocate option "Allocate to another person" in work flow
        # When I click continue in work flow page "Choose how to allocate the role"

        Then I see Allocate role work flow page "Find the person" with caption "Reallocate a lead judge" is displayed
        Given I reset reference "findPersonRequest" value to null
        When I enter find person search input "user1" in work flow
        # Then I validate find person request body from reference "findPersonRequest"
        #     | userRole | legal ops |
        # | searchTerm   | cas       |
        Then I see find person search results in work flow
            | Person                      |
            | user1 j (judge_user1@gov.uk) |
        When I select find person result "user1 j (judge_user1@gov.uk) " in work flow
        When I click continue in work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Reallocate a lead judge" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your changes" with caption "Reallocate a lead judge" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer                      |
            | Who the role will be allocated to | Allocate to another person  |
            | Person                            | user1 j (judge_user1@gov.uk) |
            | Duration of role                  | Indefinite                  |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see All work cases page displayed


    Scenario:  Judge Removes allocation of case from all work cases
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK find person response for jurisdictions
            | domain    | id   | email                   | name           | knownAs       |
            | Judicial  | 1231 | judge_user1@gov.uk      | user1 j        | Lead judge    |
            | Judicial  | 1232 | judge_user2@gov.uk      | user2 j        | Hearing judge |
            | Legal Ops | 1233 | caseworker_user1@gov.uk | caseworker1 cw | Case worker   |
            | Legal Ops | 1234 | caseworker_user2@gov.uk | caseworker2 cw | Case worker   |
            | Admin     | 1235 | admin_user1@gov.uk      | admin1 a       | Case worker   |
            | Admin     | 1236 | admin_user2@gov.uk      | admin2 a       | Case worker   |

        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"

        Then I validate work allocation cases count in page 25

        When I open Manage link for wa cases at row 1
        Then I see action link "Remove" is present for case with Manage link open
        When I click action link "Remove" on task with Manage link open
        Then I see Remove allocation page with caption "Remove allocation" is displayed
        Then I see Remove allocation page with hint text "This will remove the role allocation. You may need to unassign or reassign associated tasks too" is displayed

        Then I see Check your answers page has total 2 questions
        Then I see Check your answers page has questions and answers without change link
            | Question     | Answer                      |
            | Type of role | Lead judge                  |
            | Person       | user1 j (judge_user1@gov.uk) |

        When I click button with label "Remove allocation" in work flow  Check your answers page
        Then I see All work cases page displayed

    Scenario:  Legal ops Removes allocation of case from all work cases
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator" with reference "userDetails"
        Given I set MOCK find person response for jurisdictions
            | domain    | id   | email                   | name           | knownAs       |
            | Judicial  | 1231 | judge_user1@gov.uk      | user1 j        | Lead judge    |
            | Judicial  | 1232 | judge_user2@gov.uk      | user2 j        | Hearing judge |
            | Legal Ops | 1233 | caseworker_user1@gov.uk | caseworker1 cw | Case worker   |
            | Legal Ops | 1234 | caseworker_user2@gov.uk | caseworker2 cw | Case worker   |
            | Admin     | 1235 | admin_user1@gov.uk      | admin1 a       | Case worker   |
            | Admin     | 1236 | admin_user2@gov.uk      | admin2 a       | Case worker   |

        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"

        Then I validate work allocation cases count in page 25

        When I open Manage link for wa cases at row 1
        Then I see action link "Remove" is present for case with Manage link open
        When I click action link "Remove" on task with Manage link open
        Then I see Remove allocation page with caption "Remove allocation" is displayed
        Then I see Remove allocation page with hint text "This will remove the role allocation. You may need to unassign or reassign associated tasks too" is displayed


        Then I see Check your answers page has total 2 questions
        Then I see Check your answers page has questions and answers without change link
            | Question     | Answer                  |
            | Type of role | Case manager            |
            | Person       | caseworker_user1@gov.uk |

        When I click button with label "Remove allocation" in work flow  Check your answers page
        Then I see All work cases page displayed

