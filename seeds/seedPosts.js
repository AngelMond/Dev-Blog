const {Posts} = require('../models');

const postsData = [
    {
        "post_title": "Why MVC is so important",
        "post_content": "MVC allos developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for desing and the Controller layer for application logic",
        "user_id": 1
    }
    ,
    {
        "post_title": "Authentication vs. Authorization",
        "post_content": "There is a difference between Authentication and Authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system ",
        "user_id": 2
    }
    ,
    {
        "post_title": "Object-Relational-Mapping",
        "post_content": "I have really loved learning about ORM's. It really simplified the way I create queries in SQL!",
        "user_id": 3
    }
]


const seedPosts = () => Posts.bulkCreate(postsData);

module.exports = seedPosts;
