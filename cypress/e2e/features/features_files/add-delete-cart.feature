Feature: add-delete-cart

Scenario: Add Delete Cart
    Given Go to the Home Page
    When Add a product
    Then Check the product is added into the cart
    When Go to the cart
    Then Check the product added is correct
    When Delete the product
    Then Check the product is not in the cart