-- postgresql 16.8

-- enums
CREATE TYPE roles AS ENUM ('Admin', 'Nurse', 'Doctor');
CREATE TYPE ambulance_status AS ENUM ('Available', 'On Duty', 'Maintenance');

-- __ schemas for all the existing tables on our postgres database ______________________________

-- i made the test table only to test querying our database with pg-promise node.js module
CREATE TABLE test (
    text varchar(255),
    is_connected boolean DEFAULT FALSE
);


-- USER table (staff, doctors, nurses not the actual patients) for authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY
    full_name varchar(30) NOT NULL, 
    email TEXT UNIQUE NOT NULL,
    user_role roles, -- ('Admin', 'Nurse', 'Doctor')
    hashed_password varchar(72) NOT NULL,
    created_at date DEFAULT CURRENT_DATE
);


-- AMBULANCE
CREATE TABLE ambulances (
    id SERIAL PRIMARY KEY,
    matricule varchar(34) unique NOT NULL,
    status ambulance_status, -- ('Available', 'On Duty', 'Maintenance'),
    driver_name varchar(30),
    driver_contact varchar(30)
);

-- _____________________________________________________________________________________________