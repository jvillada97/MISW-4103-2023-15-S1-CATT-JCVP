Feature: In this feature you want to test the functionality of editing a post

@user1 @web
Scenario: Edit Post
  Given I navigate to page "http://localhost:3001/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click post
  And I validate that the post exists and select it
  And I enter new text in the post
  And I update my post
  And I wait for 1 seconds
  And I return post list
  And I wait for 1 seconds
  Then I validate that the post exists and select it
  And I wait for 1 seconds