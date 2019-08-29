// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// Database Client
const client = require('./lib/client');

//AUTH
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, hash, display_name as "displayName" 
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        return client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `,
        [user.email, hash, user.displayName]
        ).then(result => result.rows[0]);
    }
});

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data

// setup authentication routes
app.use('/api/auth', authRoutes);
// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);


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
        INSERT INTO tasks (name, description, done)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
    [task.name, task.description, task.done]
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
app.put('/api/task/:id', (req, res) => {
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