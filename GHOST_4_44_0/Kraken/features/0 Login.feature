Feature: In this feature we want to test the login functionality

@user1 @web
Scenario: Login
  Given I navigate to page "http://localhost:3001/ghost/"
  When I enter my email <EMAIL>
  And I enter my password <PASSWORD>
  And I click enter
  Then I expect to see <error>
  And I wait for 3 seconds

    Examples:
      | EMAIL            | PASSWORD | error                    |
      | " "                 | " "        | "Please fill out the form to sign in."   |
      | "<EMAIL>"   |    " "  | "Please fill out the form to sign in."      |
      | "miso@gmail.com"   |    "1234"  | "There is no user with that email address."      |
      | " "   |    "<PASSWORD>"  | "Please fill out the form to sign in."      |
      | "<EMAIL>"   |    "12345"  | "Your password is incorrect."      |
      | "<EMAIL>"   |    "<PASSWORD>"  | ""|