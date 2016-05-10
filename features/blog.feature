Feature: blog

In order to inform people about my section
As a scout chief
I want to keep a blog running

Scenario: Create a section
	Given a registered chief or a admin
	When I connect to the app
	Then I can create a section
	And create its blog

Scenario: See articles
	Given a user
	When I go to a section blog
	Then I can see all articles created

Scenario: add an article
	Given a registered chief from a section or a admin
	When I go to my section blog
	Then I can create a new article
