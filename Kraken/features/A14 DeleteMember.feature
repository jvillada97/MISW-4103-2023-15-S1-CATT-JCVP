Feature: In this feature we want to test the functionality of deleting a member

@user1 @web
Scenario: Delete Member
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  Then I validate login successful
  When I click members
  Then I validate that the member "<NAME-MEMBER>" exists and select it
  And I delete member
  And I wait for 3 seconds
  And I confirm delete the member
  And I wait for 3 seconds
  Then I validate that the member "<TEXT-TAG2>" not exists
  And I wait for 3 seconds