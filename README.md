# MERN Factory Management Web Application

## Overview

This project is a web application for managing a factory's departments, employees, and shifts. It's built using the MERN stack: MongoDB, Express.js, React.js, and Node.js, along with Redux for state management.

## Database Schema

The application uses MongoDB and has the following collections:

1. **User Collection**

   - ID (PK)
   - Full Name
   - User Name
   - Password
   - Num Of Actions (int)

2. **Department Collection**

   - ID (PK)
   - Name
   - Manager (FK referencing Employee.ID)

3. **Employee Collection**

   - ID (PK)
   - First Name
   - Last Name
   - Start Work Year
   - DepartmentID (FK referencing Department.ID)

4. **Shift Collection**

   - ID (PK)
   - Date (date time)
   - Start Time (int)
   - End Time (int)

5. **EmployeeShift Collection**
   - ID (PK)
   - EmployeeID (FK referencing Employee.ID)
   - ShiftID (FK referencing Shift.ID)

## Application Features

- Registered users can interact with the system (login required).
- Each user has a limited number of actions per day.
- Full user name is displayed on every page.
- Each user action reduces the user's credit of actions. Once the limit is reached, the user is logged out for the day.
- Each page has a "Log-Out" link, redirecting the user back to the login page.

## Controllers

The application is divided into four main sections, each managed by its own controller:

1. Login
2. Department
3. Employee
4. Shift

## Pages

Each controller has several associated pages for performing various actions (e.g., viewing, creating, editing, and deleting items).

## Tech Stack

- Frontend: React.js with Redux for state management
- Backend: Express.js on Node.js
- Database: MongoDB
- Routing: React-router-dom

## Note

Please be aware that each user action counts towards the daily action limit. Please manage your actions wisely!

## Getting Started

To get started with this project, clone the repository and install the dependencies in both the frontend and backend directories.

Next, set up your MongoDB database, and adjust the connection string and other configuration variables as needed.

Finally, start both the frontend and backend servers. You should now be able to access the application in your web browser.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
