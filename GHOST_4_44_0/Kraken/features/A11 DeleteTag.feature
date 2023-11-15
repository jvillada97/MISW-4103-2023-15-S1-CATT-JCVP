Feature: In this feature you want to test the functionality of deleting a tag

@user1 @web
Scenario: Delete Tag
  Given I navigate to page "http://localhost:3001/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  Then I validate login successful
  And I click tag
  And I validate that the tag "<TEXT-TAG2>" exists and select it
  And I delete tag
  And I wait for 3 seconds
  And I confirm delete the tag
  And I wait for 3 seconds
  Then I validate that the tag "<TEXT-TAG2>" not exists
  And I wait for 3 seconds