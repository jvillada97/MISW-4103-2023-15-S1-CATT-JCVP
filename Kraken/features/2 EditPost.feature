Feature: 2

@user1 @web
Scenario: Edit Post
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  Then I validate login successful
  And I click post
  And I validate that the post "<POST>" exists and select it
  And I enter new text in the post "<TEXT-POST2>"
  And I update my post
  And I wait for 3 seconds
  And I return post list
  And I wait for 3 seconds
  Then I validate that the post "<TEXT-POST2>" exists and select it
  And I wait for 4 seconds