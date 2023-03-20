@ng @ignore 
Feature: WA Release 2: My work - Work filters, Services and locations for user roles
    https://tools.hmcts.net/jira/browse/EUI-5921

    Background: Mock and browser setup
       
        Given I set mock for existing bookings
            | appointmentId | locationId | locationName    | beginTime | endTime |
            | 1001          | 100001     | Test location 1 | -1        | +2      |
            | 1002          | 100002     | Test location 2 | -2        | +4      |
            | 1003          | 100003     | Test location 3 | -4        | +8      |


    Scenario Outline:  Services displayed for fee-paid judicial user bookable service "<bookableServices>"
        Given I have workallocation on boarded services "<onBoardedServices>"


        Given I set MOCK with user "BOOKING_UI-FT-ON" and roles "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,fee-paid-judge,judiciary,hmcts-judiciary" with reference "userDetails"

        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "<bookableServices>"
            | bookable     | true     |
            | contractType | Fee-paid |
            | substantive  | Y        |
        Given I set Mock user with ref "userDetails", ORGANISATION roles for services "<nonBookableServices>"
            | bookable    | false |
            | substantive | Y     |
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType | baseLocation | bookable | contractType |
            | <bookableServices> | Y | ORGANISATION | 20001 | true | Fee-paid |
            | <nonBookableServices> | Y | ORGANISATION | 20001 |false||

        Given I start MockApp
        Given I navigate to home page
        Then I see work access page displayed
        Then I see work access radio button "View existing bookings" displayed
        When I select work access radio button "View existing bookings"
        Then I see work access continue button not displayed

        Then I see work access existing bookings list container
        When I click existing booking with matching location "Test location 3" from work access page

        Then I see work filter button displayed
        When I click work filter button to "Show" filter

        Then I validate my work filter services container displayed
        Then I validate my work filter location search displayed

        Then I validate my work filter services listed "<selectedServices>"

        Then I Validate my work filter services selected "<selectedServices>"
        Examples:
            | onBoardedServices   | selectedServices             | bookableServices | nonBookableServices |
            | IA,CIVIL,PRIVATELAW | Immigration and Asylum       | IA               |                     |
            | IA,CIVIL,PRIVATELAW | Immigration and Asylum       | IA               |                     |
            | IA,CIVIL,PRIVATELAW | Immigration and Asylum,CIVIL | CIVIL            | IA                  |
            | IA,CIVIL,PRIVATELAW | Immigration and Asylum,CIVIL | CIVIL,SSCS       | IA                  |


    Scenario Outline:  Locations displayed for NON fee-paid judicial user bookable service
        Given I have workallocation on boarded services "<onBoardedServices>"

        Given I set MOCK locations with names in service "IA"
            | id    | locationName           |
            | 20001 | IA Court Aldgate Tower |
            | 20002 | IA Court Birmingham    |
            | 2003  | IA Court Bradford      |
            | 20004 | IA Court Glasgow       |
            | 20005 | IA Court Hatton Cross  |
            | 20006 | IA Court Newcastle     |
            | 20007 | IA Court Newport       |
            | 20008 | IA Court North Shields |
            | 20009 | IA Court Center 1  |


        Given I set MOCK locations with names in service "CIVIL"
            | id    | locationName              |
            | 30001 | Civil Court Aldgate Tower |
            | 30002 | Civil Court Birmingham    |
            | 3003  | Civil Court Bradford      |
            | 30004 | Civil Court Glasgow       |
            | 30005 | Civil Court Hatton Cross  |
            | 30006 | Civil Court Newcastle     |
            | 30007 | Civil Court Newport       |
            | 30008 | Civil Court North Shields |
            | 30009 | Civil Court Taylor House  |

        Given I set MOCK locations with names in service "PRIVATELAW"
            | id    | locationName           |
            | 40001 | PL Court Aldgate Tower |
            | 40002 | PL Court Birmingham    |
            | 4003  | PL Court Bradford      |
            | 40004 | PL Court Glasgow       |
            | 40005 | PL Court Hatton Cross  |
            | 40006 | PL Court Newcastle     |
            | 40007 | PL Court Newport       |
            | 40008 | PL Court North Shields |
            | 40009 | PL Court Taylor House  |



        Given I set MOCK with user "BOOKING_UI-FT-ON" and roles "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,fee-paid-judge,judiciary,hmcts-judiciary" with reference "userDetails"

        Given I set Mock user with ref "userDetails", reset role assignments
      


        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation | bookable | contractType |
            | <serviceA>   | Y           | ORGANISATION | <locationA>  | false     |     |
            | <serviceB>   | Y           | ORGANISATION | <locationB>  | false    |              |
            | <serviceC>   | Y           | ORGANISATION | <locationC>  | false    |              |

        Given I start MockApp
        Given I navigate to home page

        Then I see work filter button displayed
        When I click work filter button to "Show" filter

        Then I validate my work filter services container displayed
        Then I validate my work filter location search displayed

        When I search for location text "Cou" in my work filters

        # Then I validate work filter get location request body "workFilterLocationsRequest", booking locations
        #     | locations    |
        #     | locationType |
        Then I wait for reference "workFilterLocationsRequest" value not null
        Then I validate work filter get location request body "workFilterLocationsRequest", user locations for service
            | service    | locations   |
            | <serviceA> | <locationA> |
            | <serviceB> | <locationB> |
            | <serviceC> | <locationC> |
        Examples:
            | onBoardedServices   | serviceA | locationA | serviceB | locationB | serviceC | locationC |
            | IA,CIVIL,PRIVATELAW | IA       |           |          |           |          |           |
            | IA,CIVIL,PRIVATELAW | IA       | 20001     |          |           |          |           |
            | IA,CIVIL,PRIVATELAW | IA       | 20001     | CIVIL    |           |          |           |
            | IA,CIVIL,PRIVATELAW | IA       | 20001     | CIVIL    | 30001     |          |           |


    Scenario Outline:  Locations displayed for fee-paid judicial user bookable service
        Given I have workallocation on boarded services "<onBoardedServices>"


        Given I set MOCK locations with names in service "IA"
            | id    | locationName           |
            | 20001 | IA Court Aldgate Tower |
            | 20002 | IA Court Birmingham    |
            | 2003  | IA Court Bradford      |
            | 20004 | IA Court Glasgow       |
            | 20005 | IA Court Hatton Cross  |
            | 20006 | IA Court Newcastle     |
            | 20007 | IA Court Newport       |
            | 20008 | IA Court North Shields |
            | 20009 | IA Court Center 1  |


        Given I set MOCK locations with names in service "CIVIL"
            | id    | locationName              |
            | 30001 | Civil Court Aldgate Tower |
            | 30002 | Civil Court Birmingham    |
            | 3003  | Civil Court Bradford      |
            | 30004 | Civil Court Glasgow       |
            | 30005 | Civil Court Hatton Cross  |
            | 30006 | Civil Court Newcastle     |
            | 30007 | Civil Court Newport       |
            | 30008 | Civil Court North Shields |
            | 30009 | Civil Court Taylor House  |

        Given I set MOCK locations with names in service "PRIVATELAW"
            | id    | locationName           |
            | 40001 | PL Court Aldgate Tower |
            | 40002 | PL Court Birmingham    |
            | 4003  | PL Court Bradford      |
            | 40004 | PL Court Glasgow       |
            | 40005 | PL Court Hatton Cross  |
            | 40006 | PL Court Newcastle     |
            | 40007 | PL Court Newport       |
            | 40008 | PL Court North Shields |
            | 40009 | PL Court Taylor House  |

        Given I set mock for existing bookings
            | appointmentId | locationId | locationName    | beginTime | endTime |
            | 1001          | <bookingA> | Test location 1 | +0        | +2      |
            | 1002          | <bookingB> | Test location 2 | +0        | +4      |
            | 1003          | <bookingC> | Test location 3 | +0        | +8      |
            | 1003          | 20009      | Test location 3 | +4        | +8      |
            | 1003          | 30009      | Test location 3 | +4        | +8      |
            | 1003          | 40009      | Test location 3 | +4        | +8      |

        Given I set MOCK with user "BOOKING_UI-FT-ON" and roles "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,fee-paid-judge,judiciary,hmcts-judiciary" with reference "userDetails"

        Given I set Mock user with ref "userDetails", reset role assignments
       

        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation | bookable | contractType |
            | <serviceA>   | Y           | ORGANISATION | <locationA>  | true    |              |
            | <serviceB>   | Y           | ORGANISATION | <locationB>  | true    |              |
            | <serviceC>   | Y           | ORGANISATION | <locationC>  | true    |              |

        Given I start MockApp
        Given I navigate to home page
        Then I see work access page displayed
        Then I validate primary navigation items count 0
        Then I see work access radio button "View tasks and cases" displayed
        Then I see work access continue button not displayed

        When I select work access radio button "View tasks and cases"
        Then I see work access continue button displayed
        When I click work access continue button

        Then I see work filter button displayed
        When I click work filter button to "Show" filter

        Then I validate my work filter services container displayed
        Then I validate my work filter location search displayed

        When I search for location text "Cou" in my work filters

        Then I wait for reference "workFilterLocationsRequest" value not null
        Then I validate work filter get location request body "workFilterLocationsRequest", booking locations
            | locations  |
            | <bookingA> |
            | <bookingB> |
            | <bookingC> |

        Examples:
            | onBoardedServices   | serviceA | locationA | bookingA    | serviceB | locationB | bookingB | serviceC | locationC | bookingC |
            | IA,CIVIL,PRIVATELAW | IA       |           | 20001       |          |           |          |          |           |          |
            | IA,CIVIL,PRIVATELAW |          |           |             | CIVIL    | 30001     | 30001    |          |           |          |
            | IA,CIVIL,PRIVATELAW | IA       |           | 20001,20002 | CIVIL    |           | 30001    |          |           |          |
            | IA,CIVIL,PRIVATELAW | IA       |           | 20001       | CIVIL    | 30001     |          |          |           |          |


    Scenario Outline:  Locations displayed for both fee-paid and non feed-paid judicial roles bookable service
        Given I have workallocation on boarded services "<onBoardedServices>"


        Given I set MOCK locations with names in service "IA"
            | id    | locationName           |
            | 20001 | IA Court Aldgate Tower |
            | 20002 | IA Court Birmingham    |
            | 2003  | IA Court Bradford      |
            | 20004 | IA Court Glasgow       |
            | 20005 | IA Court Hatton Cross  |
            | 20006 | IA Court Newcastle     |
            | 20007 | IA Court Newport       |
            | 20008 | IA Court North Shields |
            | 20009 | IA Court Center 1  |


        Given I set MOCK locations with names in service "CIVIL"
            | id    | locationName              |
            | 30001 | Civil Court Aldgate Tower |
            | 30002 | Civil Court Birmingham    |
            | 3003  | Civil Court Bradford      |
            | 30004 | Civil Court Glasgow       |
            | 30005 | Civil Court Hatton Cross  |
            | 30006 | Civil Court Newcastle     |
            | 30007 | Civil Court Newport       |
            | 30008 | Civil Court North Shields |
            | 30009 | Civil Court Taylor House  |

        Given I set MOCK locations with names in service "PRIVATELAW"
            | id    | locationName           |
            | 40001 | PL Court Aldgate Tower |
            | 40002 | PL Court Birmingham    |
            | 4003  | PL Court Bradford      |
            | 40004 | PL Court Glasgow       |
            | 40005 | PL Court Hatton Cross  |
            | 40006 | PL Court Newcastle     |
            | 40007 | PL Court Newport       |
            | 40008 | PL Court North Shields |
            | 40009 | PL Court Taylor House  |

        Given I set mock for existing bookings
            | appointmentId | locationId | locationName    | beginTime | endTime |
            | 1001          | <bookingA> | Test location 1 | +0        | +2      |
            | 1002          | <bookingB> | Test location 2 | +0        | +4      |
            | 1003          | <bookingC> | Test location 3 | +0        | +8      |
            | 1003          | 20009      | Test location 3 | +4        | +8      |
            | 1003          | 30009      | Test location 3 | +4        | +8      |
            | 1003          | 40009      | Test location 3 | +4        | +8      |

        Given I set MOCK with user "BOOKING_UI-FT-ON" and roles "caseworker-ia,caseworker-ia-caseofficer,caseworker-ia-admofficer,fee-paid-judge,judiciary,hmcts-judiciary" with reference "userDetails"

        Given I set Mock user with ref "userDetails", reset role assignments
     
        Given I set MOCK user with reference "userDetails" roleAssignmentInfo
            | jurisdiction | substantive | roleType     | baseLocation | bookable | contractType |
            | <serviceA>   | Y           | ORGANISATION | <locationA>  | false    |              |
            | <serviceB>   | Y           | ORGANISATION | <locationB>  | false    |              |
            | <serviceC>   | Y           | ORGANISATION | <locationC>  | true    |              |

        Given I start MockApp
        Given I navigate to home page
        Then I see work access page displayed
        Then I validate primary navigation items count 0
        Then I see work access radio button "View tasks and cases" displayed
        Then I see work access continue button not displayed

        When I select work access radio button "View tasks and cases"
        Then I see work access continue button displayed
        When I click work access continue button

        Then I see work filter button displayed
        When I click work filter button to "Show" filter

        Then I validate my work filter services container displayed
        Then I validate my work filter location search displayed

        When I search for location text "Cou" in my work filters

        Then I wait for reference "workFilterLocationsRequest" value not null
        Then I validate work filter get location request body "workFilterLocationsRequest", booking locations
            | locations  |
            | <bookingA> |
            | <bookingB> |
            | <bookingC> |

        Examples:
            | onBoardedServices   | serviceA | locationA | bookingA | serviceB | locationB | bookingB | serviceC   | locationC | bookingC |
            | IA,CIVIL,PRIVATELAW | IA       | 20001     |          | CIVIL    |           |          | PRIVATELAW |           | 40001    |

