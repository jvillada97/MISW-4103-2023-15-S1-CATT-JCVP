Feature: In this feature we want to test the functionality of deleting a member

@user1 @web
Scenario: Delete Member
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click members
  And I validate that the member exists and select it
  And I delete member
  And I wait for 1 seconds
  And I confirm delete the member
  And I wait for 1 seconds
  Then I validate that the member not exists
  And I wait for 1 seconds