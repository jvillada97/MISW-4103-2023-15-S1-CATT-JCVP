Feature: In this feature an attempt is made to change the password to 10 characters, border test

@user1 @web
Scenario: Change password 10 character
  Given I navigate to page "http://localhost:3001/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I clic avatar
  And I clic profile
  And I wait for 1 seconds
  And I enter old password "<PASSWORD>"
  And I wait for 1 seconds
  And I enter new password "10"
  And I wait for 1 seconds
  And I clic save password
  Then I validate that it ok
  And I wait for 1 seconds