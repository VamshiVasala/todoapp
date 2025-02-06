const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// register router
router.post('/register',async(req,res)=>{
    try{
        const {userName,email,password} = req.body;
        const hash_password = await bcrypt.hash(password,10);

        // adding new user to the database
        const new_user = new User({
            userName,
            email,
            password:hash_password,
        });

        await new_user.save();
        res.status(201).json({message:'User registered successfully',userId:new_user._id});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});


// login route

router.post('/login', async(req,res)=>{
    try{
        // getting the data from the user
        const {email,password} = req.body;
        
        // finding user
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid email or password'});
        }
        
        const Validpassword = await bcrypt.compare(password,user.password);
        if(!Validpassword){
            return res.status(400).json({message:'Invalid email or password'});
        } 
        // jsonwentoken (jwt)
        const token =jwt.sign(
            {id:user._id,email:user.email},
            process.env.ACCESS_TOKEN_SECRET || 'secretkey',
            {expiresIn:'1h'}
        );
        
        // const token - 
        res.json({message:'logged in successfully',token});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});


module.exports = router;