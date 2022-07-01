const router = require('express').Router();
const {Comments, Users, Posts} = require('../../models');

router.post('/user', async (req,res)=>{

    try{
        const userData = await Users.findOne({where:{username: req.body.username}});
        
        console.log(userData.id)

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json({message: "Username no encontrado"});
    }
});





module.exports = router;