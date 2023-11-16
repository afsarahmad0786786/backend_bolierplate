const express = require('express');
const cors = require('cors');
const UserRoute = require('./routes/user')
const EmployeeRoute = require('./routes/employee')
const connection = require('./connection')
const app = express();

// app.listen(process.env.PORT, async () => {   console.log(`server up on port ${process.env.PORT}`); });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', UserRoute)
app.use('/employee', EmployeeRoute)

module.exports = app;