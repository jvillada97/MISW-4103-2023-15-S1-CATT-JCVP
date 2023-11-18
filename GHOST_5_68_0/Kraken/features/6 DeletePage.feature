Feature: In this feature you want to test the functionality of deleting a page

@user1 @web
Scenario: Delete Page
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click page
  And I validate that the page "<TEXT-PAGE2>" exists and select it
  And I activate sidebar page
  And I delete page
  And I confirm delete the page
  Then I validate that the page "<TEXT-PAGE2>" not exists
  And I wait for 3 seconds