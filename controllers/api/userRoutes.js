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


//User login route
router.post('/login', async (req, res) => {
    try {
      //Get the username from the DB and include models Posts and Comments
      const userData = await Users.findOne(
        {
          where: { username: req.body.username },
        });

      //Validate if the username enter by user exists in the DB
      if (!userData) {
        res
          .status(400)
          .render('login', {
            error: 'Incorrect username or password, please try again'
          });
        return;
      }
                             
      //Validate if the password match with the password inside our DB
      const validPassword = await userData.validatePassword(req.body.password);
      if (!validPassword) {
        res
          .status(400)
          .render('login', {
            error: 'Incorrect username or password, please try again'
          });
        return;
      }
      //If username exists and password is correct, create a new session and render 'dashboard.handlebars'
      // Set up sessions with a 'loggedIn' variable set to `true`
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = userData.id;
        req.session.username = userData.username;
        res.status(200).redirect("/dashboard");
      });
    } catch (err) {
      res.status(400).json({message: 'Couldnt access to the DB'});
    }
  });




//User sing up route
router.post('/singup', async (req, res)=>{
    try{
        //Catch the user;s input from the singup form
        const newUser = req.body;
        //Creating a new user with the user's input
        const userData = await Users.create(newUser);

        // Set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
          req.session.loggedIn = true;
          req.session.userId = userData.id;
          req.session.username = userData.username;
          res.status(200).redirect('/');
        });
    }catch(err){
        res.status(400).render('singup', {
          error: 'Username already exists'
        });
    }
});




// Logout
router.get('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.redirect('/');
      });
  } else {
    res.status(404).end();
  }
});



module.exports = router;