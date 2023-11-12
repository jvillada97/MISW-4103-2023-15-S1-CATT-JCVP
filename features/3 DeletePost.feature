Feature: 3

@user1 @web
Scenario: Delete Post
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  Then I validate login successful
  And I click post
  And I validate that the post "<TEXT-POST2>" exists and select it
  And I activate sidebar
  And I delete post
  And I confirm delete the post
  Then I validate that the post "<TEXT-POST2>" not exists
  And I wait for 3 seconds