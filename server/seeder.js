const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Build Admin User
const adminUser = {
    username: 'admin',
    email: 'admin@prholidays.in',
    password: 'password123',
    role: 'admin'
};

// Import Data
const importData = async () => {
    try {
        // Clear existing admins
        await Admin.deleteMany();

        // Create admin
        await Admin.create(adminUser);

        console.log('Data Imported! Admin Created: admin@prholidays.in / password123');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

// Delete Data
const deleteData = async () => {
    try {
        await Admin.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
