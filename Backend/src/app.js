const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
    credentials: true,
    methods: ['GET', 'PUT', 'DELETE', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-type', 'Authorization']
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use('/users', userRoutes);


//app.use(express.static(path.join(__dirname, '../../FrontEnd')));

//app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, '../../FrontEnd/login.html'));
//});

module.exports = app;


