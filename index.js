const express = require('express');
const cors = require('cors');
const UserRoute = require('./routes/user')
const EmployeeRoute = require('./routes/employee')
const connection = require('./connection')

const app = express();
app.use(cors);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/user', UserRoute)
app.use('/employee', EmployeeRoute)

module.exports = app;