const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;; // Replace with your desired port
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
// const morgan =require('morgan');


const passport = require('passport');
// const bodyparser=require('body-parser');


//app.use(session({ secret: 'your_session_secret', resave: false, saveUninitialized: true })); //this doent work for https only work for http

app.use(express.json()); 
app.use(cors()); 
require('./config/passportConfig');
// app.use(morgan);
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
}));
app.use(passport.session());
app.use(passport.initialize());

const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const complaintRoutes = require('./routes/complaintRoute');

app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);
app.use('/complaint', complaintRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal server error',
        error: err.message
    });
});

app.get('/', (req, res) => {
    res.send(`Server is running on ${port}`);
  });


module.exports = app;