Feature: 5. Correct quantity and total price should be shown in the mini-cart
  As as user I want to be able to add products and
  see the correct total price and total quantity in the mini-cart.

  Background:
    Given that we are on Willy's website
    And that we accepted the standard cookie policy
    And that we have have been through the initial where to deliver popup

  Scenario: Add fruits to the shopping cart and check sum
    Given that I am on the Fruit category page
    When I put a random number of each fruit that has price per piece in the cart
    Then the mini-cart should show the correct total quantity of products
    And the mini-cart should show correct total price
