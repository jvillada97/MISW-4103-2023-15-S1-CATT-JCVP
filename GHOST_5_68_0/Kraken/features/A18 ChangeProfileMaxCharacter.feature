Feature: In this feature Change profile exceeding the limit of required fields

@user1 @web
Scenario: Change profile exceeding the limit of required fields
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I clic avatar
  And I clic profile
  And I wait for 2 seconds
  And I enter other data
  And I enter mandatory data max
  And I wait for 2 seconds
  And I clic save profile
  Then I validate that profile failed
  And I wait for 2 seconds