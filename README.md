# MERN Factory Management Web Application

## Overview

This project is a web application for managing a factory's departments, employees, and shifts. It's built using the MERN stack: MongoDB, Express.js, React.js, and Node.js, along with Redux for state management.

## Application Features

- Registered users can interact with the system (login required).
- Each user has a limited number of actions per day.
- Each user action reduces the user's credit of actions. Once the limit is reached, the user is logged out for the day.
- Each page has a "Log-Out" link, redirecting the user back to the login page.

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
