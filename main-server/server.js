// IMPORTS ----

// server imports
const express = require('express');
const app = express();
const port = 3000;

// third party stuff
const cookieParser = require('cookie-parser');

// our files, functions
const routes = require('./routes');
const {db, isDatabaseConnected} = require('./db-connect'); 



// APPLICATION ----

app.use(express.urlencoded({ extended: true })); // decode the url-encoded data coming from user http requests
app.use(express.json()); // decode json requests coming from react or postman
app.use(cookieParser()); // make cookies accessible via req.cookies

app.set('view engine', 'ejs'); // so we can render dynamic html pages using ejs templating engine (for testing only *****)

// static files directory
app.use(express.static('../static'));

// check if we're connected to db or else the server will be stopped if the connection failed
isDatabaseConnected(db);

// routing --> all routes are on routes.js file
app.use('/', routes);




// SERVER ----
app.listen(port, () => {
    console.log(`\nServer is running at port ${port}\n`);
}) 