@fullfunctional @demo1
Feature: WA Release 2: : Case details WA tabs tabs

       Scenario: Case details WA Tabs

        When I navigate to Expert UI Url
        Given I am logged into Expert UI with test user identified as "IAC_CaseOfficer_R2"
        Then I validate I am on My work page
        When I click on primary navigation header tab "All work", I see selected tab page displayed

        Then I validate task list columns are links
            | ColumnHeader |
            | Case name    |
            | Task         |

        When I click task column link "Case name" at row 1, I see case details page

        Then I see case details tab label "Tasks" is displayed is "true"
        When I click tab with label "Tasks" in case details page
        Then I validate case details task tab page is displayed
        
        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed

    Scenario: Add and delete exclusions
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with test user identified as "IAC_CaseOfficer_R2"
        Then I validate I am on My work page
        When I click on primary navigation header tab "All work", I see selected tab page displayed

        Then I validate task list columns are links
            | ColumnHeader |
            | Case name    |
            | Task         |

        When I click task column link "Case name" at row 1, I see case details page

        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed
        When I click add link for role category "Exclusions" in case roles and access page
        Then I see Add an exclusion work flow page "Choose who the exclusion is for" is displayed
        When I select Choose who the exclusion is for option "Exclude another person" in add exclusion work flow
        When I click continue in add exclusion work flow page "Choose who the exclusion is for"
        Then I see Add an exclusion work flow page "Choose the person's role" is displayed
        When I select Choose the person's role option "Legal Ops" in add exclusion work flow
        When I click continue in add exclusion work flow page "Choose the person's role"
        Then I see Add an exclusion work flow page "Find the person" is displayed

        Given I have a caseworker details other than logged in user with reference "ExcludeCaseworker" for service "IA"

        When I search for caseworker from reference "ExcludeCaseworker" in Find the person page of exclusion work flow

        Then I see caseworker from reference "ExcludeCaseworker" returned to Select in Find person search result of exclusions work flow
       
        When I select caseworker with reference "ExcludeCaseworker" from Find person search result in exclusions work flow
        When I click continue in add exclusion work flow page "Find the person"
        Then I see Add an exclusion work flow page "Describe the exclusion" is displayed
        When I enter description "E2E Test description" in add exclusion Describe the exclusion page
        When I click continue in add exclusion work flow page "Describe the exclusion"
        Then I see Add an exclusion work flow page "Check your answers" is displayed
        Then I see Check your answers page has total 4 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                 | Answer                 |
            | Who is the exclusion for | Exclude another person |
            | What's the person's role | Legal Ops       |
            | Describe the exclusion | E2E Test description |

        When I click button with label "Confirm exclusion" in add exclusion work Check your answers page
        # Then I see case details page displayed with tab "Role and access" selected
        Then I see case details page with message banner "You've added an exclusion."

        Then I see Roles and access page is displayed
        When I click delete link at row 1 for exclusion in roles and access page

        Then I see delete exclusion page with header "Check your answers" and caption "Delete an exclusion"
        Then I see Check your answers page has total 3 questions

        When I click button with label "Delete exclusion" in add exclusion work Check your answers page
        Then I see case details page with message banner "You've deleted an exclusion."

    Scenario: Add and delete Role
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with test user identified as "IAC_Judge_WA_R2"
        Then I validate I am on My work page
        When I click on primary navigation header tab "All work", I see selected tab page displayed

        Then I validate task list columns are links
            | ColumnHeader |
            | Case name    |
            | Task         |

        When I click task column link "Case name" at row 1, I see case details page

        Then I see case details tab label "Roles and access" is displayed is "true"
        When I click tab with label "Roles and access" in case details page
        Then I see Roles and access page is displayed
        Then I validate add link for role category "JUDICIAL" is displayed in Roles and access page
        When I click add link for role category "JUDICIAL" in case roles and access page

        Then I see Allocate role work flow page "Choose a role" with caption "Allocate a judicial role" is displayed
        When I select Choose a role option "Hearing Judge" in work flow
        When I click continue in work flow page "Choose a role"

        Then I see Allocate role work flow page "Choose how to allocate the role" with caption "Allocate a hearing judge" is displayed
        When I select Choose how to allocate option "Reserve to me" in work flow
        When I click continue in work flow page "Choose how to allocate the role"


        Then I see Allocate role work flow page "Duration of role" with caption "Allocate a hearing judge" is displayed
        When I select duration option "Indefinite" in work flow
        Then I validate date input field "Access starts" is displayed "No" in work flow page
        Then I validate date input field "Access ends" is displayed "No" in work flow page
        When I click continue in work flow page "Duration of role"

        Then I see Allocate role work flow page "Check your answers" with caption "Allocate a hearing judge" is displayed

        Then I see Check your answers page has total 3 questions
        Then I see Check your answers page has questions and answers with change link
            | Question                          | Answer        |
            | Type of role                      | Hearing judge |
            | Who the role will be allocated to | Reserve to me |
            | Duration of role                  | Indefinite    |

        When I click button with label "Confirm allocation" in work flow  Check your answers page
        Then I see case details page displayed with tab "Roles and access" selected
        Then I see case details page with message banner "You've allocated a role"

        Then I validate case roles "Manage" link displayed status is "true" for category "Judicial"
        Then I validate case roles "Manage" link displayed status is "true" for category "Legal Ops"

        When I click manage link for role category "Judiciary" at row 1 in Roles and access page
        Then I validate actions row for role category "Judiciary" at row 1 is "displayed" in Roles and access page

        Then I validate actions row for role category "Judiciary" has action links in Roles and access page
            | ActionLinks       |
            | Reallocate        |
            | Remove Allocation |

        When I click action row link "Remove Allocation" for role category "Judiciary" in Roles and access page

        Then I see Remove allocation page with caption "Remove allocation" is displayed
        Then I see Remove allocation page with hint text "This will remove the role allocation. You may need to unassign or reassign associated tasks too" is displayed

        Then I see Check your answers page has total 2 questions
      

        When I click button with label "Remove allocation" in work flow  Check your answers page
        Then I see case details page displayed with tab "Roles and access" selected
        Then I see case details page with message banner "You've removed a role allocation. You may need to unassign or reassign associated tasks too."
