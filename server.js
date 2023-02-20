const dotenv = require('dotenv')


dotenv.config({ path: './.env' });
const express = require('express')
const mongoose = require('mongoose');
const router = require('./routers/index');
const { Admin } = require('mongodb');
const app = express()

const PORT = 3000 || process.env.PORT

// when we hit this router We got have to tell that we are gonna use json as request body exchange 

app.use(express.json())

app.use('/'  , router)

console.log('tHIS IS THE PROCESS ENV:  ' , process.env.MONGO_URI)

app.listen(PORT , async ()=> {
   try {
  
    await mongoose.connect(process.env.MONGO_URI)


   }catch(err){
       console.log('Error while connecting to the database')
       console.log(err)

   }
   


    console.log('THE SERVER IS STARTED: ' , PORT)
})



