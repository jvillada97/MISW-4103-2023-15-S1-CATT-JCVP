Feature: In this feature we want to test the login functionality

@user1 @web
Scenario Outline: Login
  Given I navigate to page "http://localhost:3001/ghost/"
  When I load data from CSV "/../../csv/datos.csv"
  And I enter my email CSV "<email>"
  And I enter my password CSV "<password>"
  And I click enter
  Then I expect to see CSV "<error>"
  And I wait for 3 seconds

  Examples: Datos del CSV
      | email    | password  | error    |
      | <valor1> | <valor2>  | <valor3> |
      | <valor1> | <valor2>  | <valor3> |
      | <valor1> | <valor2>  | <valor3> |
      | <valor1> | <valor2>  | <valor3> |
      | <valor1> | <valor2>  | <valor3> |
      | <valor1> | <valor2>  | <valor3> |