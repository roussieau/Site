Feature: absence

In order to handle absence to reunions
As I parent
I want to inform a section about my children's absence

Scenario: Inform
	Given a registered user with children enrolled
	When I go to a section's absence table
	Then I can inform the section about my children's absence to a upcoming reunion

Scenario: Review
	Given a user
	When I go to a section's absence table
	Then I can see wath children have been absent to the reunion

Scenario: Blame
	Given a registered chief from a created section or a admin
	When I go to my section's absence table
	Then I can signal a children's absence to a passed reunion
