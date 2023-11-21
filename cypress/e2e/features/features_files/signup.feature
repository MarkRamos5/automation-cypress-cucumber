Feature: signup

  Scenario: SignUp
    Given go to home page
    When New user signup
    When Login with the new user
    Then Successfull login with new user
    When User logout
    Then User logout successful


    
