const {db} = require('./db-connect');

// database queries

// -- LOGIN

async function getUser(email) {
    try {
        user = await db.oneOrNone('SELECT id, full_name, user_role, email, hashed_password FROM users WHERE email=$1', [email]);
        return user;
    } catch(error) {
        return false;
    }
}

// -- CREATE A NEW USER

async function createUser(email, full_name, user_role, hashed_password) {

    try {
        user_data = [email, full_name, user_role, hashed_password];
        const user = await db.none('INSERT INTO users (email, full_name, user_role, hashed_password) VALUES ($1, $2, $3, $4)', user_data);
        return true;
    } catch (error) {
        return false;
    }

}



// -- AMBULANCE QUERIES

async function createAmbulance(matricule, status, driver_name, driver_contact) {
    try {
        ambulance_data = [matricule, status, driver_name, driver_contact]
        await db.none('INSERT INTO ambulances (matricule, status, driver_name, driver_contact) VALUES ($1, $2, $3, $4)', ambulance_data);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


async function getAmbulancesList() {
    try {
        const ambulances = await db.any('SELECT * FROM ambulances');
        return ambulances
    } catch(error) {
        console.log(error);
    }
}



module.exports = {createUser, getUser, createAmbulance, getAmbulancesList}