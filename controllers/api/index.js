const router = require('express').Router();

const userRoutes = require('./userRoutes');
const userPosts = require('./postsRoutes');
const userComments = require('./commetsRoutes');


router.use('/users', userRoutes);
router.use('/posts', userPosts);
router.use('/comments', userComments);


module.exports = router;