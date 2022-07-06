const {Comments} = require('../models');

const commentsData = [
    {
        "comment_content": "It helps us to maintain an order in the project ",
        "user_id": 24,
        "post_id": 4
    }
    ,
    {
        "comment_content": "It's a very interesting topic",
        "user_id": 14,
        "post_id": 14
    }
    ,
    {
        "comment_content": "I love sequelize!",
        "user_id": 4,
        "post_id": 24
    }
]


const seedComments = () => Comments.bulkCreate(commentsData);

module.exports = seedComments;
