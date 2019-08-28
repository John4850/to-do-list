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

app.get(`/api/task`, (req, res) => {
    console.log('get request');
    client.query(`
    SELECT
        id,
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

app.post('/api/task', (req, res) => {
    const task = req.body;
    console.log(task);
    client.query(`
        INSERT INTO tasks (id, name, description, done)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
    [task.id, task.name, task.description, task.done]
    )
        .then(result =>{
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });

});
app.put('api/task/:id', (req, res) => {
    const id = req.params.id;
    const task = req.body;
    console.log('server called PUT');

    client.query(`
    UPDATE      tasks
    SET         name = $2,
                done = $3
    WHERE       id = $1
    RETURNING   *;
    `,
    [id, task.name, task.done]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: `Error updating "${task.name}"` || err
            });
        });
});



// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});