const express = require('express')
const {User} = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { authenticateJWT, SECRET_KEY } = require('../auth')
const router = express.Router()




router.get('/admin/get' , async (req , res)=> {
    const allData = await User.find()
    res.json(allData)
})
router.post('/v1/api/login' , async (req, res) => {

    const {user} = req.body
    
   
    try {
        const userData = await User.findOne({email:user.email})

        bcrypt.compare(user.password, userData.password, function(err, result) {
            if (err){
              // handle erro
              console.log('Error has occcured')
            }
            if (result) {
                const token = jwt.sign({userId : userData._id} , SECRET_KEY  , {
                                expiresIn:'1d'
                            })
                return res.status(200).json({data: userData , token ,  message:"Went well"})

                
              // Send JWT
            } else {
              // response is OutgoingMessage object that server response http request
              return response.json({success: false, message: 'passwords do not match'});
            }
          });
    
    }catch(err){
        console.log(err)
    }


})



router.post('/v1/api/register' ,async (req , res) => {

    const {user} = req.body
    try {
        const exitstedUser = await User.findOne({email:user.email})
        if(exitstedUser){
            // to break out of the loop
            return res.status(400).json({message:"User has been successfully registered"})
        }
        else{
            
            const userData = await User.create(user)
            const token = jwt.sign({userId : userData._id} , SECRET_KEY  , {
                expiresIn:'1d'
            })
            res.status(200).json(userData)
        }
        
    }catch(err) {
    
        console.log('Error has occurred: ' , err)
    }
    
    





})

router.get('/user' , authenticateJWT , async (req , res)=>{
    const user = req.user
    const userData = await User.findById(user.userId)
    if(!userData){
        return res.status(400).json({message:"No user found"})
    }
    return res.status(200).json(userData)



    

})



module.exports = router