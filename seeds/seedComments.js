const {Comments} = require('../models');

const commentsData = [
    {
        "comment_content": "It helps us to maintain an order in the project ",
        "user_id": 2,
        "post_id": 1
    }
    ,
    {
        "comment_content": "It's a very interesting topic",
        "user_id": 3,
        "post_id": 2
    }
    ,
    {
        "comment_content": "I love sequelize!",
        "user_id": 1,
        "post_id": 3
    }
]


const seedComments = () => Comments.bulkCreate(commentsData);

module.exports = seedComments;
