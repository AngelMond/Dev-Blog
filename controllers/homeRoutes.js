const router = require('express').Router();
const {Posts, Users} = require('../models')



router.get('/',  async (req, res) => {

  const userData = await Posts.findAll({
    include: {
      model: Users
    }
  });
  const userPosts = userData.map((post)=>post.get({plain:true}));

  // Send the rendered Handlebars.js template back as the response
  res.render('homepage',{
    userPosts,
    loggedIn: req.session.loggedIn
  });
});


router.get('/dashboard',  (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('dashboard', {
    loggedIn: req.session.loggedIn,
  });
});

//Test Route
// router.get('/test',  async (req, res) => {

//   const userData = await Posts.findAll({
//     include: {
//       model: Users
//     }
//   });
//   const userPosts = userData.map((post)=>post.get({plain:true}));

//   // Send the rendered Handlebars.js template back as the response
//   res.json(userData)
// });

module.exports = router;