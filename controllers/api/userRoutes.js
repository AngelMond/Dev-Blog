const router = require('express').Router();

router.get('/login',  (req, res)=>{

    res.render('login');
});



router.get('/singup',  (req, res)=>{

    res.render('singup');
});

module.exports = router;