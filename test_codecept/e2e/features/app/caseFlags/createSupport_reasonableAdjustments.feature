
@fullfunctional @functional_enabled @functional_test
Feature: Support request Add/Update Reasonable adjustment

    Background: Setup case
        When I navigate to Expert UI Url
        Given I am logged into Expert UI with with case flags
        When I setup a case for case flags version "V1"
            | party                       | fieldName  | value      |
            | Flags for legal rep Party 1 | Flag Type  | Party 1    |
            | Flags for legal rep Party 1 | Party Name | Applicant  |
            | Flags for legal rep Party 2 | Flag Type  | Party 2    |
            | Flags for legal rep Party 2 | Party Name | Respondent |
        Then I see case details page

    Scenario: Create support request
        When I click tab with label "Case flags" in case details page, to see element with css selector "ccd-read-case-flag-field #read-case-flag-title"

        When I start case next step "Request support"
        Then I am on create support request page "Who is the support for?"
        Then In create support request page "Who is the support for?", I validate fields displayed
            | field                            |
            | Who is the support for? |

        When In create support request page "Who is the support for?", I input values
            | field                            | value     |
            | Who is the support for? | Applicant |

        When In create support request workflow, I click Next
        Then I am on create support request, select support type page "Select support type"
        Then In create support request page "Select support type", I validate fields displayed
            | field            |
            | Select support type |

        When In create support request page "Select support type", I input values
            | field            | value                 |
            | Select support type | Reasonable adjustment |

        When In create support request workflow, I click Next


        Then I am on create support request, select support type page "Reasonable adjustment"
        Then In create support request page "Reasonable adjustment", I validate fields displayed
            | field                 |
            | Reasonable adjustment |
        When In create support request page "Reasonable adjustment", I input values
            | field                 | value                  |
            | Reasonable adjustment | I need help with forms |
        When In create support request workflow, I click Next

        Then I am on create support request, select support type page "I need help with forms"
        Then In create support request page "I need help with forms", I validate fields displayed
            | field                  |
            | I need help with forms |
        When In create support request page "I need help with forms", I input values
            | field                  | value                    |
            | I need help with forms | Support filling in forms |
        When In create support request workflow, I click Next



        Then I am on create support request page "Tell us more about the request"
        Then In create support request page "Tell us more about the request", I validate fields displayed
            | field                      |
            | Tell us more about the request |

        When In create support request page "Tell us more about the request", I input values
            | field                      | value             |
            | Tell us more about the request | Test auto comment |

        When In create support request workflow, I click Next

        Then In create support request workflow, I am on Review details page
        Then In create support request workflow, I validate Review details displayed
            | field       | value                    | isChangeLinkDisplayed |
            | Add support to | Applicant | true |
            | Support type | Support filling in forms | true |
            | Comments    | Test auto comment        | true                  |
            | Status      | Active                   | false                 |

        When In create support request workflow, I click submit

        Then I see case details page and I see case flags banner with message "There is 1 active flag on this case"

        When I start case next step "Manage support"
        Then I am on manage support request page "Which support is no longer needed?"
        Then In create support request page "Which support is no longer needed?", I validate fields displayed
            | field             |
            | Which support is no longer needed? |

        When In manage support request page "Which support is no longer needed?", I input values
            | field            | value                                                        |
            | Which support is no longer needed? | Applicant -  Reasonable adjustment, Support filling in forms |

        When In manage support request workflow, I click Next

        Then I am on manage support request page "Tell us why the support is no longer needed"


        When In manage support request page "Tell us why the support is no longer needed", I input values
            | field                                           | value             |
            | Tell us why the support is no longer needed | Test auto comment |


        When In manage support request workflow, I click Next

        Then In manage support request workflow, I am on Review details page
        Then In manage support request workflow, I validate Review details displayed
            | field           | value                    | isChangeLinkDisplayed |
            | Update support for | Applicant | true |
            | Support type | Support filling in forms | true |
            | Comments        | Test auto comment        | true                  |
            | Status          | Inactive                 | false                 |

        When In manage support request workflow, I click submit

        Then I see case details page and I dont see case flags banner