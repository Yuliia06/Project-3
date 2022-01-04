Feature: 6. Change quantity in the cart
  As a user, I want to be able to change the number of an item in the shopping cart
  so that I can buy more or less of it than I initially thought.

  Background:
    Given that we are on Willy's website
    And that we accepted the standard cookie policy
    And that we have have been through the initial where to deliver popup

  Scenario: Increase quantity of item in the shopping cart and check sum
    Given that I have an item in the shopping cart
    And that I have opened cart
    When I click on increase quantity button of the item in the cart
    Then the cart should show the correct total quantity of products
    And the cart should show correct total price
