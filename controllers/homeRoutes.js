const router = require('express').Router();

router.get('/',  (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
});
router.get('/dashboard',  (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('dashboard', {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;