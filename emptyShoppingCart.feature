Feature: Empty the shopping cart
  In order to regret the shopping cart items,
  the user wants to be able to delete the entire
  shopping cart.

  Background:
    Given that we are on Willy's website
    And that we accepted the standard cookie policy
    And that we have have been through the initial where to deliver popup

  Scenario: empty shopping cart
    Given I have three items in my shopping cart
    When I click on “Empty shopping cart” button
    Then It should delete all items in the shopping cart

