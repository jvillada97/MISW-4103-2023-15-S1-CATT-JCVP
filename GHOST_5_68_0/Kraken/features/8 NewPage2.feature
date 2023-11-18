Feature: In this feature you want to test the functionality of unpublishing a page

@user1 @web
Scenario: Unpublish Page
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click page
  And I validate that the page "<PAGE2>" not exists
  And I click new page
  And I enter title page "<PAGE2>"
  And I enter text in the page "<TEXT-PAGE>"
  And I wait for 3 seconds
  And I publish my page
  And I wait for 3 seconds
  And I return page list
  And I wait for 3 seconds
  And I validate that the page "<PAGE2>" exists and select it
  And I validate that the page is publish
  And I unpublish the page
  Then I validate that the page is unpublish
  And I wait for 3 seconds