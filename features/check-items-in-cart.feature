Feature: 4. Check items in shopping cart
  As a user, I want to be able to see my shopping cart and the goods I have put in it should then be there
  so that I can buy them.

  Background:
    Given that we are on Willy's website
    And that we accepted the standard cookie policy
    And that we have have been through the initial where to deliver popup

  Scenario: Open shopping cart and check items
    Given that I have items in the shopping cart
    When I click on the shoping cart button
    Then the cart should appear
    And the cart shows items with correct quantity
