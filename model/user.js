const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const UserShema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        
   },
    password: {
        type:String,
        required:true,
        
   },
    first_name: {
        type:String,
        required:true,
        
   },
    last_name: {
        type:String,
        required:true,
        
   },

    

})


UserShema.pre('save' , function(next){
    
    const user = this
    if(this.isNew|| this.isModified('password')){
   
        // if it new user or is been changed , we are gonna update that
        bcrypt.genSalt(10 , function(err, salt){
            if(err){
                return next(err)
            }else{
                bcrypt.hash(user.password , salt, function(error , hash){
                    if(error){
                        return next(err)
                    }
                    user.password = hash
                    next()
                })
            }
        })
    }else {
        next()
    }
    
})
// ir is the palce where we got have to hash and compare the password using bcrypt.js
UserShema.methods.cmpPass = function(password , callback) {
    bcrypt.compare(password , this.password , function(error , isMatch){
        if(error){
            return callback(error)
        }else {
        
            callback(null , isMatch)
            // console.log('is match: ' , isMatch)
        }
    })
}
const User = mongoose.model('User' , UserShema)

module.exports = {
    User
}



