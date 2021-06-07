@test
Feature: WA Release 2: Work filters

    Background: Mock and browser setup
        Given I init MockApp
        Given I set MOCK locations for release "wa_release_2"
            | id    | locationName  |
            | 12345 | Aldgate Tower |
            | 12346 | Birmingham    |
            | 12347 | Bradford      |
            | 12348 | Glasgow       |
            | 12349 | Hatton Cross  |
            | 12350 | Newcastle     |
            | 12351 | Newport       |
            | 12352 | North Shields |
            | 12353 | Taylor House  |

        Given I set MOCK location for person of type "caseworker" in release "wa_release_2"
            | id    | locationName  |
            | 12345 | Aldgate Tower |

        Given I set MOCK request "/workallocation2/task" intercept with reference "workallocationTaskRequest"
       

    Scenario Outline:  Work filters show hide button and Apply for "<UserType>"
        Given I set MOCK with "wa_release_2" release user and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
        # When I click on primary navigation header "My work"
        Then I see work filter button displayed
        Then I validate work filter button text is "Show work filter"
        Then I validate work location filter batch and hint labels are not displayed
        Then I validate location filter is not displayed
        When I click work filter button
        Then I validate work filter button text is "Hide work filter"
        Then I validate location filter is displayed
        When I click work location filter with label "Bradford"
        When I click work location filter with label "Newcastle"
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
            | Bradford |
            | Newcastle |
        When I click work filter button
        Then I validate location filter is not displayed
        When I click work filter button
        Then I validate location filter is displayed
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
        When I click work location filter with label "Glasgow"
        When I click work location filter with label "Newcastle"
        When I click work location filter Apply button

        Then I validate location filter is not displayed
        Then I validate work location filter batch and hint labels are displayed
        When I click work filter button
        Then I validate location filter is displayed
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
            | Bradford      |
            | Newcastle     |

        When I click work location filter with label "Bradford"
        When I click work location filter with label "Hatton Cross"
        When I click work filter button
        Then I validate location filter is not displayed
        When I click work filter button
        Then I validate location filter is displayed
        
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
            | Bradford      |
            | Newcastle     |
        Examples:
            | UserType       | Roles                                              |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | Judge          | caseworker-ia-iacjudge,caseworker-ia,caseworker    |



    Scenario Outline:  Work filters location select and unselect "<UserType>"
        Given I set MOCK with "wa_release_2" release user and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
# When I click on primary navigation header "My work"

        Then I see work filter button displayed
        Then I validate work filter button text is "Show work filter"
        Then I validate work location filter batch and hint labels are not displayed
        Then I validate location filter is not displayed
        When I click work filter button
        Then I validate work filter button text is "Hide work filter"
        Then I validate location filter is displayed
        Then I validate My work filter locations displayed
        Then I validate work locations selected count is 1
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
        When I click work location filter with label "Bradford"
        Then I validate work locations selected count is 2
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
            | Bradford      |
        When I click work location filter with label "Aldgate Tower"
        Then I validate work locations selected count is 1
        Then I validate following work location selected
            | locationName |
            | Bradford     |
        Examples:
            | UserType       | Roles                                              |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | Judge          | caseworker-ia-iacjudge,caseworker-ia,caseworker    |




    Scenario Outline:  Work filters Reset for "<UserType>"
        Given I set MOCK with "wa_release_2" release user and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
# When I click on primary navigation header "My work"
        Then I see work filter button displayed
        Then I validate work filter button text is "Show work filter"
        Then I validate work location filter batch and hint labels are not displayed
        Then I validate location filter is not displayed
        When I click work filter button
        Then I validate work filter button text is "Hide work filter"
        Then I validate location filter is displayed
        Then I validate My work filter locations displayed
        Then I validate work locations selected count is 1
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
        When I click work location filter with label "Bradford"
        Then I validate work locations selected count is 2
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
            | Bradford      |
        When I click work location filter with label "Aldgate Tower"
        Then I validate work locations selected count is 1
        Then I validate following work location selected
            | locationName |
            | Bradford     |
        When I click work location filter Apply button

        Then I validate location filter is not displayed
        Then I validate work location filter batch and hint labels are displayed
        When I click work filter button
        When I click work location filter Reset button
        Then I validate location filter is not displayed
        Then I validate work location filter batch and hint labels are not displayed
        When I click work filter button
        Then I validate work locations selected count is 1
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |

        Examples:
            | UserType       | Roles                                              |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | Judge          | caseworker-ia-iacjudge,caseworker-ia,caseworker    |





    Scenario Outline:  Work filters applied selection persistence within and across session "<UserType>"
        Given I set MOCK with "wa_release_2" release user and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
        # When I click on primary navigation header "My work"
        Then I see work filter button displayed
        Then I validate work filter button text is "Show work filter"
        Then I validate work location filter batch and hint labels are not displayed
        Then I validate location filter is not displayed
        When I click work filter button
        Then I validate work filter button text is "Hide work filter"
        Then I validate location filter is displayed
        When I click work location filter with label "Bradford"
        When I click work location filter with label "Newcastle"
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
            | Bradford      |
            | Newcastle     |
        
        When I click work location filter Apply button
        
        Then I validate location filter is not displayed
        Then I validate work location filter batch and hint labels are displayed

        When I click work filter button
        Then I validate location filter is displayed
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
            | Bradford      |
            | Newcastle     |

        When I click on primary navigation header "Case list"
        Then I see case list page displayed
        When I click on primary navigation header "My work"
        Then I validate location filter is not displayed
        When I click work filter button
        Then I validate location filter is displayed
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
            | Bradford      |
            | Newcastle     |


        When I select the sign out link
        Then I am on Idam login page
        Given I navigate to home page
        Then I validate location filter is not displayed
        When I click work filter button
        Then I validate location filter is displayed
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
            | Bradford      |
            | Newcastle     |



        Examples:
            | UserType       | Roles                                              |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | Judge          | caseworker-ia-iacjudge,caseworker-ia,caseworker    |






    Scenario Outline:  Work filters applied to all sub navigation tabs "<UserType>"
        Given I set MOCK with "wa_release_2" release user and roles "<Roles>"
        Given I start MockApp
        Given I navigate to home page
        When I click on primary navigation header "My work"
        Then I see work filter button displayed
        
        When I click work filter button
        Then I validate location filter is displayed
        When I click work location filter with label "Bradford"
        When I click work location filter with label "Newcastle"
        Then I validate following work location selected
            | locationName  |
            | Aldgate Tower |
            | Bradford      |
            | Newcastle     |
        Given I reset reference "workallocationTaskRequest" value to null
        When I click work location filter Apply button
        When I wait for reference "workallocationTaskRequest" value not null

        Then I validate task request body in reference "workallocationTaskRequest" has locations set
            | locationName  |
            | Aldgate Tower |
            | Bradford      |
            | Newcastle     |
        Given I reset reference "workallocationTaskRequest" value to null
        When I click My work sub navigation tab "Available tasks"
        When I wait for reference "workallocationTaskRequest" value not null
        Then I validate task request body in reference "workallocationTaskRequest" has locations set
            | locationName  |
            | Aldgate Tower |
            | Bradford      |
            | Newcastle     |
        
        Examples:
            | UserType       | Roles                                              |
            | Caseworker IAC | caseworker-ia-caseofficer,caseworker-ia-admofficer |
            | Judge          | caseworker-ia-iacjudge,caseworker-ia,caseworker    |


