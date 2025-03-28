const getStaticFilePath = require('./utils');

const dbq = require('./db-queries'); 

const bcrypt = require('bcryptjs');

const myJwt = require('./jwt-auth');

const emailValidator = require("email-validator");


// --------------------------------------- PAGES ---------------------------------------------


// -- LOGIN --
const getLogin = (req,res) => { 
    res.sendFile(getStaticFilePath('login.html')); 
} 

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    var user = await dbq.getUser(email);

    if (!user) {
        return res.json({"userError":"user not found"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.hashed_password); 
    // compareSync hashes the given password and compare the hash with the hash

    if (!isPasswordCorrect) {
        return res.json({"passwordError":"invalid password"});
    } 

    if (user && isPasswordCorrect) {
        // generate token
        const userToken = myJwt.createAccessToken({id: user.id, full_name: user.full_name, role: user.user_role, email:user.email});
        // store it in a http-only cookie and then send it to client
        // I'M SENDING ACCESS TOKENS IN HTTP ONLY COOKIES BECAUSE THIS IS A WEB BASED ONLY APP
        res.cookie('jwt-token-cookie', userToken, {maxAge: 86400000, httpOnly: true}); // it will last 1 day

        return res.json({"redirect":"/"}); 
    }

}


// -- LOGOUT --
const logout = (req,res) => {
    res.cookie('jwt-token-cookie', '', {httpOnly: true, expires: new Date(0)}); // set cookie to empty string (delete token from browser)
 
    return res.json("logged out"); 
}


// -- CREATE A NEW USER --
const getCreateUser = (req,res) => {

    const role = req.user.role;

    if (role != 'Admin') {
        res.send("You're not an admin, only admins can create new users");
    } 

    res.sendFile(getStaticFilePath('add-user.html'));
}


const createUser = async (req,res) => {

    if (req.user.role != 'Admin') {
        return res.json({"error":"you're not an admin"});
    }

    
    const email = req.body.email;
    const full_name = req.body.full_name;
    const user_role = req.body.role;
    const password = req.body.password;

    if (!email  || !password || !full_name || !user_role) {
        return res.json({"userError":"full name, password, role and email shouldn't be empty!"});
    }  else if (!emailValidator.validate(email)) {
        return res.json({"emailError":"Invalid email format"});
    } else if (password.length < 8) {
        return res.json({"passwordError":"invalid password"});
    } else {
        const hashed_password = bcrypt.hashSync(password, 8); 
        const created = await dbq.createUser(email, full_name, user_role, hashed_password);
        
        if (!created) {
            return res.json({"serverError":"email address may already exists, something went wrong in the server"})
        } else {
            return res.json({"redirect":"login"}); // if everything is fine redirect to login
        }
        
    }
 

}



// -- HOME PAGE --

const home = (req,res) => {
    const full_name = req.user.full_name;
    const role = req.user.role;

    return res.json({
        "message":`Hello ${full_name}`,
        "role": `${role}`
    });
}


// -- CREATE A NEW AMBULANCE --
const getAddAmbulance = (req,res) => {
    if (req.user.role != 'Admin') {
        return res.redirect('/');
    }

    return res.sendFile(getStaticFilePath('add-ambulance.html'));
}


const addAmbulance = async (req,res) => {

    if (req.user.role != 'Admin') {
        return res.json({"error":"only admins can create new ambulances"});
    }

    const matricule = req.body.ambulance_id;
    const status = req.body.status;
    const driverName = req.body.driver_name;
    const driverContact = req.body.driver_contact;

    if (!matricule) {
        return res.json({"ambulanceError":"Registration Number shouldn't be empty"});
    }

    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)?$/;
    if (!nameRegex.test(driverName)) {
        return res.json({"driverError":"Invalid driver name"})
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(driverContact)) {
        return res.json({"contactError":"Invalid contact number"})
    }

    const isCreated = await dbq.createAmbulance(matricule, status, driverName, driverContact);
    if (isCreated) {
        return res.json({"redirect":"/"}); // this should be a redirect to ambulances list page when we create it
    } else {
        return res.json({"serverError":"an error occurred in the database"});
    }

}

// -- GET ALL AMBULANCES --
const ambulancesList = async (req, res) => {
    const ambulances = await dbq.getAmbulancesList();
    return res.json(ambulances);
}

// -------------------------------------------------------------

module.exports = {home, createUser, getCreateUser, login, getLogin, logout, addAmbulance, getAddAmbulance, ambulancesList}