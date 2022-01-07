Feature: Correct quantity of an item is added to the mini-cart
  As a user I want to be able to add 1 to several copies of an item in the shopping cart
  so that I can buy it.

  Background:
    Given that we are on Willy's website
    And that we accepted the standard cookie policy
    And that we have have been through the initial where to deliver popup

  Scenario: Add fruits to the shopping cart and check cart
    Given that I am on the page - Fruit category
    When I put a random number of each fruit
    Then the cart should show the correct quantity of items
