const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
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

app.use('/tasks', taskRoutes);


//app.use(express.static(path.join(__dirname, '../../FrontEnd')));

//app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, '../../FrontEnd/login.html'));
//});

module.exports = app;


