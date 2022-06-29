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



module.exports = router;