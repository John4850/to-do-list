const client = require('../lib/client');
const tasks = require('./tasks');

client.connect()
    .then(() =>{
        return Promise.all(
            tasks.map(task => {
                return client.query(`
                    INSERT INTO tasks (name, description, done)
                    VALUES ($1, $2, $3)
                    RETURNING *;
                `,
                [task.name, task.description, task.done])
                    .then(result => result.rows[0]);
            })
        );
    })
    .then(
        () => console.log('seed data load complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });