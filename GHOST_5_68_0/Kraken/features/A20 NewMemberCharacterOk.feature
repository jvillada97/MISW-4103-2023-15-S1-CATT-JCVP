Feature: In this feature we want to test the functionality of creating a New member to field limit

@user1 @web
Scenario: New member to field limit
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click members
  And I click new member
  And I enter name member character "191"
  And I enter email member character "191"
  And I enter text member character "500"
  And I wait for 1 seconds
  And I click save member
  And I click members
  And I wait for 1 seconds
  Then I validate that the member exists and select it
  And I wait for 1 seconds



