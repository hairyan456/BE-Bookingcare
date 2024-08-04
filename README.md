# Project's title: Booking-care website
- Online appointment scheduling platform.

# Project's description:
- Website helps patients make appointments by doctor or by medical facility. Interaction between doctor and patient.
- This is only Backend API source from project (deploying on Render: https://be-api-bookingcare.onrender.com)
- Technologies using in project: Node.js (Express) + MySql (Sequelize) , and some other libraries.
- Limitations: does not use jwt token in user authentication.

# Install and Run project:
- This project uses NodeJS version 14x (required).
- Download source from: https://github.com/hairyan456/BE-Bookingcare.git to your local computer.
- Add into VSCode, then type "npm install" to download all required libraries using in this project.
- Project using MySQL database, so type "npx sequelize-cli db:migrate" to create all tables in your Database.
- Download "booking-care.sql" attached in github source, paste all code in SQL Script and Run.
- In ".env.example" file, type all your local information.
>> After completing, then type "npm start" to run source code Backend.
