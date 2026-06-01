Feature: Ecommerce Validations
    @regression
    Scenario: Login and place order
    Given a login to Ecommerace application with "suragani.veena@gmail.com" and "S.veena@1217"
    When I add "ZARA COAT 3" to cart 
    Then I verify "ZARA COAT 3" is displayed in cart page
    When I enter valid deatils "suragani.veena@gmail.com", "ind", "veenasri", "123", "rahulshettyacademy" and place order in the checkout page