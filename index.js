const express = require('express');
const knex = require('knex');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const server = express();

const sessionConfig = {
    name: 'random',
    secret: 'A Lannister always pay his debts',
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: true,
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
}

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());
server.use(sessionConfig);

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

server.post('/api/login', (req, res) => {
    const {username, password} = req.body

    Users.findBy({username})
    .first()
    .then(user => {
        res.session.name = user
        if(user && bycrypt.compareSync(password, user.username)) {
            res.status(201).send('Logged in')
        } else {
            res.status(401).send('You shall not pass')
        }
    })
    .catch(() => {
        res.status(500).send('System could verify user')
    })
})

server.get('/api/users', restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.status(201).json(users)
    })
    .catch(err => res.json(err))
})

function restricted(req, res, next) {
    const {username, password} = req.headers

    if(username && password) {
        Users.findBy({username})
        .first()
        .then(user => {
            if(user && bycrypt.compareSync(password, user.username)) {
                next()
            } else {
                res.status(401).send('You cannot pass')
            }
        })
    } else {
        res.status(401).send('Please provide credentials')
    }
}

server.listen(3600, () => {
    console.log('Server is fired up on port 6000!')
})