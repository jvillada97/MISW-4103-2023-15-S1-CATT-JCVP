Feature: In this feature you want to test the functionality of unpublishing a post

@user1 @web
Scenario: Unpublish post
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click post
  And I validate that the post "<POST2>" not exists
  And I click new post
  And I enter title post "<POST2>"
  And I enter text in the post "<TEXT-POST>"
  And I wait for 3 seconds
  And I publish my post
  And I wait for 3 seconds
  And I return post list
  And I wait for 3 seconds
  And I validate that the post "<POST2>" exists and select it
  And I validate that the post is publish
  And I unpublish the post
  Then I validate that the post is unpublish
  And I wait for 3 seconds