Feature: Successful Purchase

    Scenario: Successful Purchase
        Given Go to the Home Page
        When Login
        When Add a product
        When Fill order form
        Then Purchase is successfull and return to the home page
        When Return to cart page
        Then Cart is empty
        
