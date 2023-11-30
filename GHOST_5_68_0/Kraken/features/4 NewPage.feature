Feature: In this feature you want to test the functionality of creating a new page

@user1 @web
Scenario: New Page
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click page
  And I load data Page
  And I validate that the page not exists
  And I click new page
  And I enter title page
  And I enter text in the page
  And I wait for 1 seconds
  And I publish my page
  And I wait for 1 seconds
  And I return page list
  And I wait for 1 seconds
  Then I validate that the page exists and select it
  And I wait for 1 seconds