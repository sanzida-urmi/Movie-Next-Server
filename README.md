MovieMaster Pro

Description:
A full-stack web application for managing your personal movie collection. Built with Next.js, MongoDB and Tailwind CSS.

Get all movies
Get limited movies
Get a movie by ID
Add new movie
Delete movie
Manage comments


Live Link:  https://movie-next-app-theta.vercel.app
server Live Link: https://movie-next-server.vercel.app

Install & Run:
npm install
npm start

Server will run at : http://localhost:4000


Route Summary:
GET       /movies        Get all movies
GET       /few           Get first 6 movies
GET       /movies/:id    Get movie by ID
POST      /movies        Add a movie
DELETE    /movies/:id    Delete a movie
GET       /comments      Get all comments