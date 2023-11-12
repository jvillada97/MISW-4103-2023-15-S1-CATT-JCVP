Feature: My feature

@user1 @web
Scenario: New Tag
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  Then I validate login successful
  And I click tag
  And I validate that the tag "<TAG>" not exists
  And I click new tag
  And I enter title tag "<TAG>"
  And I enter text in the tag "<TEXT-TAG>"
  And I wait for 3 seconds
  And I publish my tag
  And I wait for 3 seconds
  And I return tag list
  And I wait for 3 seconds
  Then I validate that the tag "<TAG>" exists and select it
  And I wait for 3 seconds