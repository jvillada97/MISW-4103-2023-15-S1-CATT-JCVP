Feature: In this feature you want to test the functionality of creating a new page

@user1 @web
Scenario: New Page
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  Then I validate login successful
  And I click page
  And I validate that the page "<PAGE>" not exists
  And I click new page
  And I enter title page "<PAGE>"
  And I enter text in the page "<TEXT-PAGE>"
  And I wait for 3 seconds
  And I publish my page
  And I wait for 3 seconds
  And I return page list
  And I wait for 3 seconds
  Then I validate that the page "<PAGE>" exists and select it
  And I wait for 3 seconds