Feature: In this feature you want to test the functionality of creating a new post

@user1 @web
Scenario: New Post
  Given I navigate to page "http://localhost:3001/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click post
  And I validate that the post "<POST>" not exists
  And I click new post
  And I enter title post "<POST>"
  And I enter text in the post "<TEXT-POST>"
  And I wait for 3 seconds
  And I publish my post
  And I wait for 3 seconds
  And I return post list
  And I wait for 3 seconds
  Then I validate that the post "<POST>" exists and select it
  And I wait for 3 seconds