# MERN Factory Management Web Application

## Overview

This project is a web application for managing a factory's departments, employees, and shifts. It's built using the MERN stack: MongoDB, Express.js, React.js, and Node.js, along with Redux for state management.

## Application Features

- Registered users can interact with the system (login required).
- Each user has a limited number of actions per day.
- Each user action reduces the user's credit of actions. Once the limit is reached, the user is logged out for the day.

## Controllers

The application is divided into four main sections, each managed by its own controller:

1. Login
2. Department
3. Employee
4. Shift

## Pages

Each page has several associated dialogs for performing various actions (creating, editing, and deleting items).

## Tech Stack

- Frontend: React.js with Redux for state management
- Backend: Express.js on Node.js
- Database: MongoDB

## Usage

To access the website functionalities, follow the steps outlined below:

### 1. Logging In

Use one of the following credentials to log in:

#### Option 1

- **Username:** yossico
- **Password:** yossi123

#### Option 2

- **Username:** joshjosh
- **Password:** josh123

#### Option 3

- **Username:** drake
- **Password:** drake123

#### Option 4

- **Username:** jojosef
- **Password:** josef123

### 2. Exploring the Dashboard

Once logged in, you will be redirected to the main page where you can navigate to different sections, including:

- **Departments:** View all departments, add new ones, or edit existing ones.
- **Employees:** View all employees, add new ones, edit existing profiles, delete profiles, view employee shifts, and assign shifts to employees.
- **Shifts:** View all shifts, add new ones, and see which employees are assigned to different shifts.

_Feel free to explore the functionalities and get a feel of the full capabilities of the application._
