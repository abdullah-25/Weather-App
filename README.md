# Weather App

Weather App is a web application that provides current weather information and historical temperature data. The backend is built with Node.js and MySQL, while the frontend is developed using React and styled with Tailwind CSS.

<img width="1093" alt="Screen Shot 2023-09-15 at 10 11 32 PM" src="https://github.com/abdullah-25/Weather-App/assets/70604820/a9f6c536-3e7b-43e7-8075-df5ab179c0a0">


## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Running the Application](#running-the-application)


## Getting Started

To get started with the Weather App, follow these steps:

### Prerequisites

Before you begin, ensure you have the following dependencies installed:

- Node.js
- MySQL Database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abdullah-25/Weather-App.git
   cd Weather-App
   
2. Install backend dependencies:

   ```bash
   cd server
   npm i
   knex migrate:latest
   knex migrate:latest
   knex seed:run
   npm start

3. Install front-end dependencies:

   ```bash
   cd client
   npm i
   npm start


### Configuration

Configure the project as follows:

- Set up environment variables for the database connection in the .env file.

### API Endpoints
The backend provides the following API endpoints:

/current: POST current weather data.
//historical: POST historical temperature data.




   

