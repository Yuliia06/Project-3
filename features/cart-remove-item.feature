Feature: 7. Remove item from the cart
  As a user, I want to be able to remove an item from the shopping cart
  so that I can regret that I have put it there.

  Background:
    Given that we are on Willy's website
    And that we accepted the standard cookie policy
    And that we have have been through the initial where to deliver popup

  Scenario: Decrease item quantity to 0 in the shopping cart
    Given that I have an any item in the shopping cart
    When I click decrease quantity button in the cart until quantity not 0
    Then the cart should not contain item
