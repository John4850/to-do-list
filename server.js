// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');

// Database Client
client.connect();

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data

app.get(`/api/list`, (req, res) => {
    console.log('get request');
    client.query(`
    SELECT
        name,
        description,
        done
    FROM tasks;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});