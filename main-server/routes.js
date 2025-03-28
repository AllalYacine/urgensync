const express = require('express');
const app = express();

const controller = require('./controllers.js');

const jwt_auth_middleware = require('./jwt-auth'); // middleware to make a route restricted only to authenticated users

//  ------------------ server routes --------------------------


// -- HOME PAGE --
app.get('/', jwt_auth_middleware.jwtAuthenticate, controller.home);


// -- CREATE A NEW AMBULANCE --
app.get('/add-ambulance', jwt_auth_middleware.jwtAuthenticate, controller.getAddAmbulance);
app.post('/add-ambulance', jwt_auth_middleware.jwtAuthenticate, controller.addAmbulance);

// -- AMBULANCES LIST --
app.get('/ambulances', jwt_auth_middleware.jwtAuthenticate, controller.ambulancesList);


// --------------- AUTH ---------------------------------------
// -- LOGIN --
app.get('/login', controller.getLogin); 
app.post('/login', controller.login);

// -- LOGOUT --
app.post('/logout', controller.logout);

// -- CREATE A NEW USER  -- // should be admin
app.get('/create-user', jwt_auth_middleware.jwtAuthenticate, controller.getCreateUser); 
app.post('/create-user', jwt_auth_middleware.jwtAuthenticate, controller.createUser);
//  -----------------------------------------------------------





module.exports = app