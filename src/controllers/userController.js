const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
//const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, avatar } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please Enter all the Feilds")
    }

    // Email ton tai
    const userExists = await User.findOne({ email })

    if (userExists) {
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

    if (user) {
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

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

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
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {}

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
    res.send(users)
})

class userController {
    profile(req, res, next) {
        allUser.findOne({ _id: req.params.id }).then((user) => {
        }).catch((err) => {
            console.log(err);
        });
        res.render('client/profile', {
            title: 'Profile User',
            layout: 'main'
        });
    }
    async updateUser(req, res) {
        try {
            const username = req.params.username;
            const { phone, birthday, gender, address } = req.body;
            const user = await User.findOneAndUpdate({ username: username }, { phone, birthday, gender, address }, { new: true });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            } else {
                // res.redirect('/profile/' + username);
                // // res.send(user); // commented out to avoid sending multiple responses
                res.json({message: "Update success"} );
            }
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({ error: "Server error" });
        }
    }


    async getUserByUN(req, res) {
        try {
            const username = req.params.username;
            const user = await User.findOne({ username: username });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            // console.log("Thong tin user: "+user);
            else {
                res.render('client/profile', {
                    title: 'Profile User',
                    layout: 'main',
                    username: user.username,
                    birthday: user.birthday,
                    address: user.address,
                    gender: user.gender,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    password: user.password,
                });
            }
            // res.json(user); 
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({ error: "Server error" });
        }
    }

}

module.exports = {
    registerUser,
    LoginUser,
    allUser,
    userController: new userController(),
};
