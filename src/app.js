const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const database = require('../config/database');

// connect to database
database.connect();

// routes
const studentRoute = require('../routes/student-route');
const menuRoute = require('../routes/menu-route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/students', studentRoute);
app.use('/menu', menuRoute);

module.exports = app;