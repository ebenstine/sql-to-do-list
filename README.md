# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

This project requires a printed task list that can be updated, both in the DOM and database, by marking a task complete, or by deleting a task.

For this project I started by creating all my files and connecting them as needed, including all necessary package installations.  No simple task.  I created a table in HTML which would list my task items along with a few sub-categories most importantly including a status category, along with submit and delete buttons.  In the client side code I built functions for GET, POST, PUT, and DELETE requests, and routed these over to my server file.  I added click handlers that would activate my buttons.  I added a render function which posts the retrieved data to the DOM, and with it, appends buttons that have logic built in to change their css styling when the "status" category is shown as finished.  This was probably the primary logical challenge in the assignment.  

I built a database in sql and and manually inputted some starter commands and info in VS to be moved over.  The tasks were assigned a boolean value so that client logic could interpret their status.  I connected that database to my server and built out the router to receive the requests from client and send back the data.

When the requests come back the app updates the DOM appropriately and is capable of marking a tasking finished or deleting it, and these changes are also reflected in the database.





Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
