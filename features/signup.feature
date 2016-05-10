Feature: sign up

In order to have users on the app
As a user
I want to be able to sign up and handle my informations

Scenario: Sign up
	Given a new user
	When I connect to the app
	Then i can register
	And complete my informations

Scenario: Sign in
	Given a registered user
	When I connect to the app
	Then I can sign in

Scenario: Change informations
	Given a registered user
	When I go to my profile
	Then I can change my informations

Scenario: Delete account
	Given a registered user
	When I go to my profile
	Then I can delete my account

Scenario: Promote
	Given a registered user with admin rights
	When I go to the user table
	Then I can give chief or admin rights to a user
