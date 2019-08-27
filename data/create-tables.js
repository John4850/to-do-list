const client = require('../lib/client');

client.connect()
    .then(() => {
        return client.query(`
            CREATE TABLE tasks (
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL,
                description VARCHAR(256) NOT NULL,
                done BOOLEAN NOT NULL
            );
        `);
    })
    .then(
        () => console.log('tasks created'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });