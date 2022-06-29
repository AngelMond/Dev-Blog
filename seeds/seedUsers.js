const { Users } = require('../models');

const usersData = [
    {
        "username": "Angel",
        "password": "12345678"
    }
    ,
    {
        "username": "Chanchito",
        "password": "12345678"
    }
    ,
    {
        "username": "Max",
        "password": "12345678"
    }
]


const seedUsers = () => Users.bulkCreate(usersData, {
    individualHooks: true,
    validate: true
});

module.exports = seedUsers;
