const { Users } = require('../models');

const usersData = [
    {
        "username": "Xandromus",
        "password": "12345678"
    }
    ,
    {
        "username": "Lernantino",
        "password": "12345678"
    }
    ,
    {
        "username": "John Doe",
        "password": "12345678"
    }
]


const seedUsers = () => Users.bulkCreate(usersData, {
    individualHooks: true,
    validate: true
});

module.exports = seedUsers;
