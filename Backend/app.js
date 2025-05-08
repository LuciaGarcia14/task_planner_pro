const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: ['http://localhost:3000', 'http://127.0.0.1:5501'],
        credentials: true,
        methods: ['GET', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-type', 'Authorization']
    })
);

app.use(
    helmet({
        contentSecurityPolicy: false
    })
);

app.use('/users', userRoutes);

module.exports = app;

