Feature: In this feature you want to test the functionality of editing a tag

@user1 @web
Scenario: Edit Tag
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click tag
  And I validate that the tag exists and select it
  And I enter new text in the tag
  And I update my tag
  And I wait for 1 seconds
  And I return tag list
  And I wait for 1 seconds
  Then I validate that the tag exists and select it
  And I wait for 1 seconds