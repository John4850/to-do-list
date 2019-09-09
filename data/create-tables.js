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

            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(256) NOT NULL,
                hash VARCHAR(512) NOT NULL,
                display_name VARCHAR(256) NOT NULL
            );
        `);
    })
    .then(
        () => console.log('tables created'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });