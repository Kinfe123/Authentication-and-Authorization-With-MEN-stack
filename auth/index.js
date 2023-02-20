const jwt = require('jsonwebtoken');
const SECRET_KEY = 'SECRET_KEY'
const authenticateJWT = (req , res , next)=> {
    
    console.log("This is from req " , req)
    const aHeader = req.headers.authorization
    console.log(req.headers.authorization)
    // console.log(aHeader)
    if(aHeader){
        const token = aHeader.split(' ')[1]
        jwt.verify(token , SECRET_KEY , (err , user)=>{
            if(err){
                return res.status(403).json({message:"AUTHORIZATION ERROR"})
            }
     
            req.user = user
            console.log(user)
            next()
        } )
    }else {
        return res.status(401).json({message:"No Token is Provided"})


    }
    
}

module.exports = {
    authenticateJWT,
    SECRET_KEY
}