const {Posts} = require('../models');

const postsData = [
    {
        "post_title": "Title for post 1",
        "post_content": "I'm the content for post 1",
        // "author_id": 1,
        "user_id": 1
    }
    ,
    {
        "post_title": "Title for post 2",
        "post_content": "I'm the content for post 2",
        // "author_id": 2,
        "user_id": 2
    }
    ,
    {
        "post_title": "Title for post 3",
        "post_content": "I'm the content for post 3",
        // "author_id": 3,
        "user_id": 3
    }
]


const seedPosts = () => Posts.bulkCreate(postsData);

module.exports = seedPosts;
