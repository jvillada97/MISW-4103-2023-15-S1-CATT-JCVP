Feature: In this feature you try to change the profile with the mandatory fields empty

@user1 @web
Scenario: Change profile empty required fields
  Given I navigate to page "http://localhost:3001/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I clic avatar
  And I clic profile
  And I wait for 1 seconds
  And I enter other data
  And I enter mandatory data
  And I wait for 1 seconds
  And I clic save profile
  Then I validate that profile failed
  And I wait for 1 seconds