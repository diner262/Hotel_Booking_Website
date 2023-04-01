const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require("../config/generateToken")


const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, avatar} = req.body

    if( !name || !email || !password) {
        res.status(400)
        throw new Error("Please Enter all the Feilds")
    }

    // Email ton tai
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    // Tao tai khoan thanh cong
    const user = await User.create({
        name,
        email,
        password,
        avatar,
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error("Failed to Create User")
    }

})

const LoginUser = asyncHandler(async(req, res) =>{ 
    const {email,password} = req.body

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
            token: generateToken(user._id), 
        })
    } else {
        res.status(401)
        throw new Error("Invalid Email or Password")
    }

})


// searching User
const allUser = asyncHandler(async (req, res) => {
    const keyword = req.query.search 
    ? {
        $or: [
            {name: {$regex: req.query.search, $options: "i"}},
            {email: {$regex: req.query.search, $options: "i"}},
        ],
    }
    : {}

    const users = await User.find(keyword).find({_id: {$ne: req.user._id }})
    res.send(users)
})

module.exports = {registerUser, LoginUser, allUser}