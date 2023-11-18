Feature: In this feature you want to test the functionality of editing a page

@user1 @web
Scenario: Edit Page
  Given I navigate to page "http://localhost:3001/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click page
  And I validate that the page "<PAGE>" exists and select it
  And I enter new text in the page "<TEXT-PAGE2>"
  And I update my page
  And I wait for 3 seconds
  And I return page list
  And I wait for 3 seconds
  Then I validate that the page "<TEXT-PAGE2>" exists and select it
  And I wait for 4 seconds