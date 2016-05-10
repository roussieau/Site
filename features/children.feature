Feature: children

In order to handle children inscription to the sections
As a user
I want to enroll my children to a section

Scenario: Enroll a child
Given a registered user
When I go to my dashboard
Then I can create a new children
And enroll him to a section

Scenario: Change children informations
Given a registered user with children enrolled
When I go to my dashboard
Then I can change my children's informations

Scenario: Remove children
Given a registered user with children enrolled
When I go to my dashboard
Then I can remove my children from a section
