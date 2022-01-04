Feature: 2. Open item information details
  As a user, I want to be able to click on an item to get more information about it
  so that I can determine if it is of interest to me.

  Background:
    Given that we are on Willy's website
    And that we accepted the standard cookie policy
    And that we have have been through the initial where to deliver popup

  Scenario: Click on item and check information details
    Given that I am on the Fruit page
    When I click a random fruit
    Then the modal window should appear
    And the modal window should show correct information details
