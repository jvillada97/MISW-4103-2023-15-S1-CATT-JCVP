Feature: My feature

@user1 @web
Scenario: New Post
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email " "
  And I enter my password " "
  And I click enter
  Then I validate login fail
  When I enter my email "<EMAIL>"
  And I enter my password " "
  And I click enter
  Then I validate login fail
  When I enter my email " "
  And I enter my password "<PASSWORD>"
  And I click enter
  Then I validate login fail
  When I enter my email "correo1"
  And I enter my password "<PASSWORD>"
  And I click enter
  Then I validate login fail
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  Then I validate login successful
  And I wait for 3 seconds