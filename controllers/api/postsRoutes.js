const router = require('express').Router();
const {Posts, Comments} = require('../../models');


//Test
router.get('/', async (req,res)=>{
    try {
          const userData = await Posts.findAll({
            include:  
            {
              model: Comments,
              attributes: ['comment_content']
            
            },
            attributes: ['post_title', 'post_content']
  
          });

          res.status(200).json(userData);
  
        } catch (err) {
          console.log(err)
          res.status(500).json({message: 'Solicitud no procesada'});
        }
  });





  //Render form to create new post
  router.get('/new-post',  (req, res)=>{
    try{
      res.status(200).render('newPost');
    }catch(err){
      res.status(500).json(err)
    }
  });


  //Create new Post
  router.post('/create-post', async (req, res)=>{
    try{
      const createPost = req.body;
      await Posts.create(createPost)

      res.json(createPost)

    }catch(err){
      res.status(500).json({message:'Post no creado'});
    }
  });



module.exports = router;