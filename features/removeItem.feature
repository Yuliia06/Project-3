Feature: Remove an item in the shopping cart
  In order to regret buying an item in the shopping cart,
  the user wants the ability to remove that item.


  Background:
    Given that we are on Willy's website
    And that we accepted the standard cookie policy
    And that we have have been through the initial where to deliver popup

  Scenario: Remove an item by enter 0 and press return
    Given There are three items in my shopping cart
    Then click x to remove product
    Then the item should not be in the cart anymore
