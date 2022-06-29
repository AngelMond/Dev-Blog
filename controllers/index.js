const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//If a route doesn't exists respond this
router.use('*', async (req, res) => {
    res.status(500).json({
        success: false,
        message: 'endpoint does not exist!'
    })
});
module.exports = router;
