# Calorie Tracker
A simple and user-friendly calorie tracker web application that helps users manage their daily caloric intake and expenditure. This application is built with Ruby on Rails as the backend API and React with Redux for the frontend.

## Features
- User authentication for secure and personalized data
- Add meals and exercises with calorie information
- Calculate the net calories for each day by subtracting exercise calories burned from meal calories
- Edit and delete functionality for meals

## Getting Started
These instructions will help you set up the project on your local machine for development and testing purposes.

## Prerequisites
- Ruby 2.7 or higher
- Rails 6.1 or higher
- Node.js 14 or higher
- npm for managing frontend dependencies

## Installation
Clone the repository
git clone https://github.com/yourusername/calorie-tracker.git
Change to the project directory
cd calorie-tracker

## Install the Rails API dependencies
cd calorie-tracker-api
bundle install

## Create the database and run migrations
rails db:create
rails db:migrate
Start the Rails API server

rails s
In another terminal, navigate to the React client directory and install the frontend dependencies
cd calorie-tracker-client
npm install --prefix client
Start the React development server
sql
Copy code
npm start --prefix client
Now, the Calorie Tracker application should be running on http://localhost:3000.

## Built With
- Ruby on Rails - The backend API framework
- React - The frontend library
- Redux - State management for React
- React-Router - Navigation for the React app

## License
This project is licensed under the MIT License. See the LICENSE file for details.