# Frontend Setup, Wireframes

## Setup and Steps
### Setup
0. ran `npm init -y` (initialize project with node) `created package.json` -> `npm i express` (install express) -> `npm i nodemon -D` (continue to run server with all desired changes) -> (in package.json) edited 'scripts' to include 'node sever' for 'start', 'nodemon sever' for 'dev'
1. added code to server.js
    - express -> app -> PORT -> app.listen() -> `npm run dev`

## TO-DO (12/11/23)
* going to go with SuperTokens for user auth as opposed to Clerk
[ ] - provide a sign up route
[ ] - provide login route
[ ] - provide user account page
* for fonts, used `https://fonts.google.com/specimen/Graduate?query=graduate&sort=popularity`

## 12/16/23
* (eventually) going with stylex (fb) for styling paired with react comps
    - using teh guide for styling for video in order to avoid potential error
* able to get page on localhost:3000 saying content in all of the provided text in css
* able to get page that directs user to not found page
* installed date-fns, uuid for logger middleware

## 12.24.23
- React ARIA is also a possible, strong option for design with using unstyled comps that are responsive
- installed esLint for stylex in order to catch errors in styling, provides validation
- implemented logger.js which outputs logs per request in /logs
    * __NEED__: to refine the logger middleware to only care about specific desired requests
