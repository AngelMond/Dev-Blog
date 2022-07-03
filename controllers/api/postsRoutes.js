const router = require('express').Router();
const {Posts, Comments, Users} = require('../../models');


//Test
// router.get('/', async (req,res)=>{
//     try {
//           const userData = await Posts.findAll({
//             include:  
//             {
//               model: Comments,
//               attributes: ['comment_content']
            
//             },
//             attributes: ['post_title', 'post_content']
  
//           });

//           res.status(200).json(userData);
  
//         } catch (err) {
//           console.log(err)
//           res.status(500).json({message: 'Solicitud no procesada'});
//         }
//   });





  //Render form to create new post
  router.get('/new-post',  (req, res)=>{
    try{
      res.status(200).render('newPost',{
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        username: req.session.username,
      });

    }catch(err){
      res.status(500).json(err)
    }
  });





//Test route to render user posts in dashboard
  // router.get('/otro',  async (req, res)=>{
  //   try{
  //     // console.log(req.session)
  //     const postData = await Posts.findAll({where:{user_id: req.session.userId}});

  //     const userPosts = postData.map((post)=>post.get({plain:true}));
  //     res.render('dashboard', 
  //       {
  //       userPosts,
  //       loggedIn: req.session.loggedIn
  //     });

  //   }catch(err){
  //     res.status(500).json(err)
  //   }
  // });


  //Route to create a new Post
  router.post('/create-post', async (req, res)=>{
    try{

      //Save the user id from req.session and then give the userId to user_id
      let userId = req.session.userId;
      console.log(userId)
      
      await Posts.create({
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        user_id: userId
      });
      res.status(200).redirect('/dashboard');

    }catch(err){
      res.status(500).json({message:'Post no creado'});
    }
  });


//Route to update a post
router.put('/update-post', async (req,res)=>{
  try{
    //Save the user id from req.session and then give the userId to user_id
    let userId = req.session.userId;
    console.log(userId)
    
    await Posts.update({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      id: postId 
    });
    res.status(200).redirect('/dashboard');

  }catch(err){
    res.status(500).json({message:'Post no creado'});
  }
});

module.exports = router;