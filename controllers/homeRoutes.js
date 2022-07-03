const router = require('express').Router();
const {Posts, Users} = require('../models')


//Homepage route
router.get('/',  async (req, res) => {

  //Get all posts and rendered into homepage
  const userData = await Posts.findAll({
    include: {
      model: Users
    }
  });
  //Get all user's posts an then  rendered into homepage 
  const userPosts = userData.map((post)=>post.get({plain:true}));

  // Send the rendered Handlebars.js template back as the response
  res.render('homepage',{
    userPosts,
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
    username: req.session.username 
  });
});



//Dashboard route
router.get('/dashboard',  async (req, res) => {
  try{
     //Get all posts with the id's user
     const postData = await Posts.findAll({where:{user_id: req.session.userId}});
  
     //Serialize posts and then rendered into user's dashboard
     const userPosts = postData.map((post)=>post.get({plain:true}));
     res.render('dashboard', 
       {
       userPosts,
       loggedIn: req.session.loggedIn
     });
  }catch(err){
    res.status(500).json({message:"Cannot get users posts"})
  }
});




//Test Route
router.get('/test',  async (req, res) => {

  try{
    //Get all posts with the id's user
    const postData = await Posts.findAll({where:{user_id: 1}});

    //Get post Id
    const postId = postData.id

    console.log(postId)
    //Serialize posts and then rendered into user's dashboard
    const userPosts = postData.map((post)=>post.get({plain:true}));
    
    res.json(postData)

    // req.session.save(() => {
    //   req.session.postId = postId
    //   res.status(200).render("/dashboard", {
    //     userPosts,
    //     loggedIn: req.session.loggedIn
    //   });
    // });
    //  res.render('dashboard', 
    //    {
    //    userPosts,
    //    loggedIn: req.session.loggedIn,
          postId: req.session.id
    //  });
  }catch(err){
    res.status(500).json({message:"Cannot get users posts"})
  }
});

module.exports = router;