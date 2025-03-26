const pgp = require('pg-promise')();

// connect to postgresql db
const db = pgp('postgres://mehdiz:psql@localhost:5432/pfc-licence'); 
           // this db for development only, that's why i didn't use env variables

// check db connection
function isDatabaseConnected(db){
    db.any("SELECT is_connected FROM test WHERE text='connection'").then((res) => {
        const result = res[0].is_connected;
        console.log('======== postgres connection ========'); // idk it's just cool to print out this in terminal
        console.log('is_connected: ' + result + '\nsuccesfully connected to postgres db'); 
        console.log('=====================================\n');
        }).catch(error => {
            console.log('======== postgres connection ======== ');
            console.log('failed connecting to db\n');
            process.exit(1); // stop the server if db failed
        }); 
}

module.exports = {db, isDatabaseConnected};