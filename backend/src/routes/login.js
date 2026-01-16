const express = require('express');
const Users = require('../../models/login')

const router = express.Router()

router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body || {};

        if (!userName || !password){
            return res.status(400).json({message:'userName and password required'});
        }

        const user = await Users.findOne({userName: userName.toLowerCase()})
        if (!user){
            return res.status(401).json({message:'No user found'});
        }

        if(password !== user.password){
            return res.status(401).json({message:"Invalid Credentials"})
        }
        
        res.status(200).json({message:"Login successful"})

    } catch (error) {
        res.status(400).json({message: "Unable to login"})
    }

    
});

router.post('/signin', async (req, res) => {
    try {
        const { userName, password } = req.body || {};
        if (!userName || !password){
            return res.status(400).json({message:'userName and password required'});
        }

        const existing_user = await Users.findOne({userName: userName.toLowerCase()});
        if (existing_user){
            return res.status(409).json({message: "Username already exists"});
        }

        const user = await Users.create({userName, password})
        return res.status(201).json({userId:user._id, userName:user.userName});
    } catch (error) {
        return res.status(400).json({ message: 'Unable to create user' });
    }
    
});

module.exports = router