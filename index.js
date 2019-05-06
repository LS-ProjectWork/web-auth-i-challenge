const express = require('express');
const knex = require('knex');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');

const server = express();

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    console.log(`It's working`)
});

server.post('/api/register', (req, res) => {
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, 10)

    db
    .insert(user)
    .into('users')
    .then(saved => {
        res.status(201).json(saved)
    })
});

server.listen(3600, () => {
    console.log('Server is fired up on port 6000!')
})