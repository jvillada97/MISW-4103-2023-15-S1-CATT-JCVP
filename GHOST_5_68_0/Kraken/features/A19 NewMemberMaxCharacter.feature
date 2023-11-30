Feature: In this feature we want to test the functionality of creating a New member exceeding field limit

@user1 @web
Scenario: New member exceeding field limit
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click members
  And I click new member
  And I enter name member character "192"
  And I enter email member character "192"
  And I enter text member character "501"
  And I wait for 1 seconds
  And I click save member
  And I wait for 1 seconds
  Then I validate that the member failed
  And I wait for 1 seconds



