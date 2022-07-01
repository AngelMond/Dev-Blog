const router = require('express').Router();
const {Posts, Comments, Users} = require('../../models');


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
      res.status(200).render('newPost',{
        loggedIn: req.session.loggedIn,
        user: req.session.user
      });
    }catch(err){
      res.status(500).json(err)
    }
  });


  //Create new Post
  router.post('/create-post', async (req, res)=>{
    try{

     
     
      //Cuando un usuario inicia sesion, guardar en local storage el username para usarlo aqui
      //y buscar el id con el username y pasarlo al user_id

      //Posibles soluciones: 1- Usar un hook beforeCreate, 2-Hacer lo de LS, 3- Guardar el username en un session
      // const userId = await Users.findOne({ where: { username: username1} })


      // console.log(userId)
      
      
  
      await Posts.create({
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        user_id:  req.session.user
      })
      res.json({message: 'Post creado'})

      // res.json(userId)
      // console.log(createPost)
      // res.redirect('/dashboard', {
      //   loggedIn: req.session.loggedIn
      // });

    }catch(err){
      res.status(500).json({message:'Post no creado'});
    }
  });





module.exports = router;