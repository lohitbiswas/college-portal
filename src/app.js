const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;; // Replace with your desired port
const mysql = require('mysql2');
const cors = require('cors');
// const bodyparser=require('body-parser');

app.use(express.json()); 
app.use(cors()); 
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true }));

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