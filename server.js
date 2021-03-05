#!/usr/bin/env node

/**
 * @author BATURALP KIZILTAN
 * */

/**
 * Import and/or initialize dependencies
 * */
const mongoose = require('mongoose');
const express = require('express');
const app = express();

/**
 * Configure environment variables
 * */
require('dotenv').config();
const URI = process.env.DB_URI;

/**
 * Use logger and bodyparser middlewares
 * */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Configure & connect to the database(MongoDB Atlas)
 * */
try {
    mongoose.connect(URI, { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false })
        .catch(err => { console.log(err) });
    mongoose.Promise = global.Promise;
} catch (e) {
    console.log(`MONGODB::CONNECTION::ERROR::${e}`);
}

/**
 * Route Handler
 * */
const usersRouter = require('./routes/users.route');
app.use('/api/v1', usersRouter);

/**
 * 404 - Not Found Middleware
 * */
app.use((req, res, next) => {
    res.sendStatus(404);
});

/**
 * Get port value from the environment or set default(3000)
 * */
const port = (process.env.PORT || '3000');
app.set('port', port);

/**
 * Create a HTTP server and listen the preset port
 * */
const http = require('http');
const server = http.createServer(app);
server.listen(port);

/**
 * Print any kind of error to the console
 * */
server.on('error', (error) => {
    console.log(error)
});

/**
 * Print message when the server wake up
 * */
server.on('listening', () => {
    console.log(`Listening on port ${app.get('port')}...\n--------------------------`);
});
