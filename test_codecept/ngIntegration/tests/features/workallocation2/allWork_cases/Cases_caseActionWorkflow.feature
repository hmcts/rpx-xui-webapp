# Requirements
# https://tools.hmcts.net/confluence/display/EUI/Work+Allocation-+Release+2#WorkAllocationRelease2-ManagelinklogicforTasksandCases

@ng @wa2 @wa 
Feature: WA Release 2: All work > cases - Manage links - Action work flow

    Background: Mock and browser setup
        Given I init MockApp
       
    Scenario:  Judge reaallocate case from all work cases
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA" allow empty service
            | roleName    | task-supervisor |
            | substantive | Y               |

        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA" allow empty service
            | roleName    | case-allocator |
            | substantive | Y               |

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | caseType | substantive | roleType | caseId           |
            | IA           | Asylum   | Y           | CASE     | 1234567812345670 |
            | SSCS         | Asylum   | Y           | CASE     | 1234567812345671 |


        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"
        Then I see all work cases not loaded and message displayed as "Please select filters and click Apply"

        Then I see filter "Person" is displayed in all work page
        When I enter find person search input "judge" in work flow

        Then I see find person search results in work flow
            | Person                                                 |
            | auto test 1 judge 1 (auto_test_judge_1@justice.gov.uk) |

        When I select find person result "auto test 1 judge 1 (auto_test_judge_1@justice.gov.uk)" in work flow


        When I click Apply filter button in all work page
        Then I see All work cases page displayed
        Then I validate work allocation cases count in page 25

        When I open Manage link for wa cases at row 1
        Then I see action link "Reallocate" is present for case with Manage link open
        When I click action link "Reallocate" on task with Manage link open
        # Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Reallocate a hearing judge" is displayed
        # When I select Choose how to allocate option "Reserve to me" in work flow
        # When I click continue in work flow page "Choose how to allocate the role"

        Then I see Allocate role work flow page "Find the person" with caption "Reallocate a Senior tribunal-caseworker" is displayed
        When I enter find person search input "judge" in work flow
 
        Then I see find person search results in work flow
            | Person                      |
            | auto test 2 judge 2 (auto_test_judge_2@justice.gov.uk) |

        When I select find person result "auto test 2 judge 2 (auto_test_judge_2@justice.gov.uk)" in work flow
        When I click continue in work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Reallocate a Senior tribunal-caseworker" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your changes" with caption "Reallocate a Senior tribunal-caseworker" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer                      |
            | Who the role will be allocated to | Allocate to another person  |
            | Person | auto test 2 judge 2 (auto_test_judge_2@justice.gov.uk) |
            | Duration of role                  | Indefinite                  |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see all work cases not loaded and message displayed as "Please select filters and click Apply"
        When I click Apply filter button in all work page

    Scenario:  Legal ops reaallocate case manager case from all work cases
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA" allow empty service
            | roleName    | task-supervisor |
            | substantive | Y               |

        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA" allow empty service
            | roleName    | case-allocator |
            | substantive | Y              |

        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"
        Then I see all work cases not loaded and message displayed as "Please select filters and click Apply"


        Then I see filter "Person" is displayed in all work page
        When I enter find person search input "judge" in work flow

        Then I see find person search results in work flow
            | Person                                                 |
            | auto test 2 judge 2 (auto_test_judge_2@justice.gov.uk) |

        When I select find person result "auto test 2 judge 2 (auto_test_judge_2@justice.gov.uk)" in work flow


        When I click Apply filter button in all work page
        Then I validate work allocation cases count in page 25

        When I open Manage link for wa cases at row 1
        Then I see action link "Reallocate" is present for case with Manage link open
        When I click action link "Reallocate" on task with Manage link open
        # Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Reallocate a legal ops case manager" is displayed
        # When I select Choose how to allocate option "Allocate to another person" in work flow
        # When I click continue in work flow page "Choose how to allocate the role"

        Then I see Allocate role work flow page "Find the person" with caption "Reallocate a Senior tribunal-caseworker" is displayed
        # Given I reset reference "findPersonRequest" value to null
        When I enter find person search input "legalOps" in work flow
        # Then I validate find person request body from reference "findPersonRequest"
        #     | userRole | legal ops |
        # | searchTerm   | cas       |
        Then I see find person search results in work flow
            | Person                                  |
            | LEGAL_OPERATIONS 1 IA 1 (legal_operations_ia_civil_1@justice.gov.uk) |
        When I select find person result "LEGAL_OPERATIONS 1 IA 1 (legal_operations_ia_civil_1@justice.gov.uk)" in work flow
        When I click continue in work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Reallocate a Senior tribunal-caseworkerr" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your changes" with caption "Reallocate a Senior tribunal-caseworker" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer                                  |
            | Who the role will be allocated to | Allocate to another person              |
            | Person | LEGAL_OPERATIONS 1 IA 1 (legal_operations_ia_civil_1@justice.gov.uk) |
            | Duration of role                  | Indefinite                              |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see all work cases not loaded and message displayed as "Please select filters and click Apply"
        When I click Apply filter button in all work page


    Scenario:  Legal ops reaallocate lead judge case from all work cases
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA" allow empty service
            | roleName    | task-supervisor |
            | substantive | Y               |


        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA" allow empty service
            | roleName    | case-allocator |
            | substantive | Y              |

        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"
        Then I see all work cases not loaded and message displayed as "Please select filters and click Apply"
        Then I see filter "Person" is displayed in all work page
        When I enter find person search input "judge" in work flow

        Then I see find person search results in work flow
            | Person                                                 |
            | auto test 2 judge 2 (auto_test_judge_2@justice.gov.uk) |

        When I select find person result "auto test 2 judge 2 (auto_test_judge_2@justice.gov.uk)" in work flow



        When I click Apply filter button in all work page
        Then I validate work allocation cases count in page 25

        When I open Manage link for wa cases at row 1
        Then I see action link "Reallocate" is present for case with Manage link open
        When I click action link "Reallocate" on task with Manage link open
        # Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Reallocate a legal ops case manager" is displayed
        # When I select Choose how to allocate option "Allocate to another person" in work flow
        # When I click continue in work flow page "Choose how to allocate the role"

        Then I see Allocate role work flow page "Find the person" with caption "Reallocate a Senior tribunal-caseworker" is displayed
        Given I reset reference "findPersonRequest" value to null
        When I enter find person search input "user1" in work flow
        # Then I validate find person request body from reference "findPersonRequest"
        #     | userRole | legal ops |
        # | searchTerm   | cas       |
        Then I see find person search results in work flow
            | Person                      |
            | auto test 2 judge 2 (auto_test_judge_2@justice.gov.uk) |
        When I select find person result "auto test 2 judge 2 (auto_test_judge_2@justice.gov.uk)" in work flow
        When I click continue in work flow page "Find the person"

        Then I see Allocate role work flow page "Duration of role" with caption "Reallocate a Senior tribunal-caseworker" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your changes" with caption "Reallocate a Senior tribunal-caseworker" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer                      |
            | Who the role will be allocated to | Allocate to another person  |
            | Person                            | LEGAL_OPERATIONS 1 IA 1 (legal_operations_ia_civil_1@justice.gov.uk) |
            | Duration of role                  | Indefinite                  |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see all work cases not loaded and message displayed as "Please select filters and click Apply"
        When I click Apply filter button in all work page


    Scenario:  Judge Removes allocation of case from all work cases
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA" allow empty service
            | roleName    | task-supervisor |
            | substantive | Y               |


        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA" allow empty service
            | roleName    | case-allocator |
            | substantive | Y              |

        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"
        Then I see all work cases not loaded and message displayed as "Please select filters and click Apply"

        Then I see filter "Person" is displayed in all work page
        When I enter find person search input "judge" in work flow

        Then I see find person search results in work flow
            | Person                                                 |
            | auto test 2 judge 2 (auto_test_judge_2@justice.gov.uk) |

        When I select find person result "auto test 2 judge 2 (auto_test_judge_2@justice.gov.uk)" in work flow


        When I click Apply filter button in all work page
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
            | Person | auto test 2 judge 2 (auto_test_judge_2@justice.gov.uk) |

        When I click button with label "Remove allocation" in work flow  Check your answers page
        Then I see all work cases not loaded and message displayed as "Please select filters and click Apply"
        When I click Apply filter button in all work page
    Scenario:  Legal ops Removes allocation of case from all work cases
        Given I set MOCK with user "IAC_Judge_WA_R2" and roles "caseworker-ia-iacjudge,caseworker-ia,caseworker,task-supervisor,case-allocator" with reference "userDetails"
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA" allow empty service
            | roleName    | task-supervisor |
            | substantive | Y               |


        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "IA" allow empty service
            | roleName    | case-allocator |
            | substantive | Y              |

  
        Given I start MockApp
        Given I navigate to home page

        When I click on primary navigation header tab "All work", I see selected tab page displayed
        When I navigate to All work sub navigation tab "Cases"
        Then I see all work cases not loaded and message displayed as "Please select filters and click Apply"

        Then I see filter "Person" is displayed in all work page
        When I enter find person search input "LEGAL" in work flow

        Then I see find person search results in work flow
            | Person                                                               |
            | LEGAL_OPERATIONS 1 IA 1 (legal_operations_ia_civil_1@justice.gov.uk) |
        When I select find person result "LEGAL_OPERATIONS 1 IA 1 (legal_operations_ia_civil_1@justice.gov.uk)" in work flow


        When I click Apply filter button in all work page
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
            | Person | LEGAL_OPERATIONS 1 IA 1 (legal_operations_ia_civil_1@justice.gov.uk) |

        When I click button with label "Remove allocation" in work flow  Check your answers page
        Then I see all work cases not loaded and message displayed as "Please select filters and click Apply"
        When I click Apply filter button in all work page
