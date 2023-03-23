# City-Explorer-Api

**Author**: Reece R.
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->
Building a backend server to access a weather API to allow our city-explorer React built page to be able to get weather data sent on the requested cities by user.

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
Build a backend server using npm init in terminal to get your package.json started.  Ensure you have express, dotenv, and cors installed to allow for your server to run and have appropriate middleware.  Make sure you have your gitignore(specifically ensure .env is included in this file) and eslintrc file.
Later on we will be connecting to a weather API but for now there is a local weather json file you can use from the 301d97 class repo.

## Architecture

![Lab07 WRRC](WRRC-lab07.png)

![Lab08 WRRC](WRRC-lab08.png)

### Feature One: Building a server & Connecting to Front End

Estimate of time needed to complete: 120 to 180 minutes (~ 2 to 3 hours)

Start time: 12:30

Finish time: 18:30

Actual time needed to complete: 6 hours

I am using JavaScript, React, HTML, CSS for the whole application.  For this specific portion we are using express to run the server, dotenv, and cors as middleware.
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource. -->
03/22/2023 17:40 - Server is connected to Weather API(WeatherBit) and Movie API (The Movie DB)

## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
