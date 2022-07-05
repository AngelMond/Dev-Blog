const router = require('express').Router();
const {Comments, Users, Posts} = require('../../models');



//Route to render comment form
router.get('/comment-form/:id', async (req,res)=>{
    try{
        //Get the post selected in order to updated
        const getPost = await Posts.findOne({where:{id: req.params.id}});
        // console.log(req.session)
        res.status(200).render('comments-form', {
            getPost,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
        });
    } catch (err) {
        res.status(500).json({message: "form not founded"});
    }
});


//Route to create a new comment
router.post('/addComment/:id', async (req,res)=>{
    try{

    //Save the user id from req.session and then give the userId to user_id
      let userId = req.session.userId;

        await Comments.create({
            comment_content: req.body.comment_content,
            post_id: req.params.id,
            user_id: userId
        });
        res.status(200).redirect('/');
    }catch(err){
        res.status(500).render('comments-form', {
            error: 'Please Login first or Singup'
        });
    }
});


//Route to render all comments for one post
router.get('/usersComments/:id', async (req,res)=>{
    try{
        const postData = await Posts.findAll({
            where:{
                id: req.params.id
            },
            include: 
            [
            {
                model: Users,
                attributes: ['id', 'username']
            }]
        });
        
        const commentData = await Comments.findAll({
            where: {
                post_id: req.params.id
            },
            include: {
                model:Users,
                attributes: ['id', 'username']
            }
        });

        //Serialize data
        const userComment = commentData.map((comment)=>comment.get({plain:true}));
        const userPost = postData.map((comment)=>comment.get({plain:true}))
        
        res.status(200).render('usersComments', {
            userComment,
            userPost,
            loggedIn: req.session.loggedIn
        });
    }catch(err){
        res.status(500).json({message: 'no se pudo conectar a la DB'})
    }
});




module.exports = router;