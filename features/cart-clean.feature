Feature: 8. Clean the cart
  As a user, I want to be able to empty my entire shopping cart
  so that I can start if I regret what I put in it completely.

  Background:
    Given that we are on Willy's website
    And that we accepted the standard cookie policy
    And that we have have been through the initial where to deliver popup

  Scenario: Click reset cart button and check items in the cart
    Given that I have two different items in the shopping cart
    When I click reset cart button
    And I confirm reseting the cart in opened dialog
    Then the cart should not contain items
