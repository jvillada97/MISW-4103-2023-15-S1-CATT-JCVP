Feature: In this feature you want to test the functionality of modifying the name of the blog

@user1 @web
Scenario: Edit name blog
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter my email "<EMAIL>"
  And I enter my password "<PASSWORD>"
  And I click enter
  And I validate login successful
  And I click config
  And I click general
  And I click expand
  And I wait for 3 seconds
  And I enter title blog "<NAME-BLOG>"
  And I wait for 1 seconds
  And I click save
  And I wait for 1 seconds
  Then I validate new title "<NAME-BLOG>"
  And I wait for 3 seconds
