Feature: In this feature you want to test the functionality of deleting a post

@user1 @web
Scenario: Delete Post
  Given I navigate to page "http://localhost:3001/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click post
  And I validate that the post exists and select it
  And I activate sidebar
  And I delete post
  And I confirm delete the post
  Then I validate that the post not exists
  And I wait for 1 seconds