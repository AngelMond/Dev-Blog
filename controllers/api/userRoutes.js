const router = require('express').Router();
const {Users, Posts, Comments} = require('../../models');



//Render user login form
router.get('/login',  (req, res)=>{
    res.render('login');
});

//Render user singup form
router.get('/singup',  (req, res)=>{
  res.render('singup');
});


//Test
router.get('/', async (req,res)=>{
  try {
        const userData = await Users.findAll({
          include:  
          [{
            model: Posts,
            attributes: ['post_title', 'post_content'],
          },
          {
            model: Comments,
            attributes: ['comment_content']
          }],
             attributes: ['id', 'username']

          });

        if (!userData) {
          res.status(404).json({ message: 'No user with this id!' });
          return;
        }
        res.status(200).json(userData);

      } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Solicitud no procesada'});
      }
});

//User login
router.post('/login', async (req, res) => {
    try {
      //Validate if username exists. If username exists go to validate the password
      const userData = await Users.findOne({ where: { username: req.body.username } });
      if (!userData) {
        res
          .status(400)
          .send({ message: 'Incorrect username , please try again' });
        return;
      }
                             
      //Validate if the password is correct
      const validPassword = await userData.validatePassword(req.body.password);
      if (!validPassword) {
        res
          .status(400) //EN LAS RESPUESTAS INVALIDAS DEBO DE CARGAR UN MENSAJE DE INVALID.. A MIS TEMPLATES
          .send({ message: 'Incorrect password, please try again' });
        return;
      }
      //If username exists and password is correct, render dashboard
      res.status(200).render('dashboard');
      
    } catch (err) {
      res.status(400).json({message: 'No se pudo acceder a la DB'});
    }
  });

//User singup
router.post('/singup', async (req, res)=>{
    try{
        //Catch the user;s input from the singup form
        const newUser = req.body;
        //Creating a new user with the user's input
        await Users.create(newUser);
        res.status(200).render('dashboard');
    }catch(err){
        res.status(400).send({message: 'Ups! something went wrong. User no created.'});
    }
})


router.get('/new-post',  (req, res)=>{
  try{
    res.render('newPost');
  }catch(err){
    res.status(400).json(err)
  }
});

module.exports = router;