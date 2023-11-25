Feature: In this feature try many logins and one successful

@user1 @web
Scenario: Many logins and one successful
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "$email_1"
  And I enter my password "$string_1"
  And I click enter
  And I enter my email "$email_1"
  And I enter my password "$string_1"
  And I click enter
  And I enter my email "$email_1"
  And I enter my password "$string_1"
  And I click enter
  And I enter my email "$email_1"
  And I enter my password "$string_1"
  And I click enter
  And I enter my email "<EMAIL>"
  And I enter my password "$string_1"
  And I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I clic avatar
  And I clic signout
  And I enter my email "<EMAIL>"
  And I enter my password "$string_1"
  And I click enter
  Then I expect to see "Your password is incorrect."
  And I wait for 1 seconds
