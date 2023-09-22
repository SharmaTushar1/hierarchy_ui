# Hierarchy UI

- First add CEO using the Add employee button.
- Then add heads under it.
- Then teams under the head.
- Then Members. Members can be leaders or not leaders.
- Id is auto generated using uuid.
- You can also search a specific employee using the filter.
- To filter go to /filter route and then there search accordingly. You can use name, number or email using the drop down select.
- You can also change the teams of a team member. For that you have to just drag and drop the team member. You can only change team with same head.
- Same team name is not allowed. It won't allow you to submit and will ask you to change the name.
- All the features are implemented with additional features like team of same name not allowed.

NOTE: Since, I'm using NEXT.JS. There can be some hydration errors/warnings when rendering the app but they won't cause any problems. You can simply ignore them. The app will be forced to client side rendering which is the goal for this type of app.

# Functionalities added

## **Basic** **Functionality**

- We should be able to see the position name with the employee name.
- We should be able to add a new team member.
- We should be able to change the team of a team member. An employee from HR can't be moved to the design team.
- We can remove a team member.
- We should be able to update employee information.
- We should be able to create a new Team or edit an existing one.
- Filter an employee by Employee Name, Phone Number, and Email ID.

## **Bonus points**

- Two teams cannot have the same name.
- We should be able to select a Team/Head and should be able to see all the employees who are under them.

## Tech Used

- Typescript, NextJS, Material UI, Zustand.
