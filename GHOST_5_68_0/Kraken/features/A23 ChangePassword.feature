Feature: In this feature you want to test the functionality of modifying the password

@user1 @web
Scenario: Change password ok
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I clic avatar
  And I clic profile
  And I wait for 1 seconds
  And I enter old password "<PASSWORD>"
  And I enter new password "3000"
  And I clic save password
  Then I validate that it ok
  And I wait for 1 seconds