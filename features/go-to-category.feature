Feature: 1. Open category
  As a user, I want to be able to go to different categories of goods
  so that I can see which goods are included in a category (eg Bird, Tofu etc).

  Background:
    Given that we are on Willy's website
    And that we accepted the standard cookie policy
    And that we have have been through the initial where to deliver popup

  Scenario: Navigate to the Vegetarian category 
    Given that I am on the Home page
    When I click on menu button
    And I click on Vegetarian category button
    Then I am on the Vegetarian category page
