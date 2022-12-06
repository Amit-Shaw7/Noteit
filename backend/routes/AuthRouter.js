const express = require('express');
const router = express.Router();
const UserModal = require('../models/UserModal');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = "$%#!@AmItKuMShAw@6@68@6866@686697@!#%$";
const fetchUser = require('../middlewares/FetchUser');


// Creating a user 
router.post('/signup', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 5 character").isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    console.log(req.body.email);
    let enteredEmail = await UserModal.findOne({ email: req.body.email });
    if (enteredEmail) {

        return res.status(400).json({
            success,
            msg: "User Already exists :(",
            with: req.body.email
        });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({  success, errors: errors.array() });
    }

    else {
        try {
            let user = new UserModal(req.body);
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);
            user = await UserModal.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            });

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_TOKEN);

            console.log(authToken);
            success = true;

            res.json({
                success,
                msg: "User Created Succesfully",
                data: user,
                token: authToken
            });
        } catch (error) {
            res.json({
                success,
                msg: "User Cannot be created",
                reason: error.message
            })
        }
    }
});

// User Login
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot ne blank").exists()


], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success , errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await UserModal.findOne({ email });
        // console.log(user);
        if (!user) {
            res.status(400).json({
                success,
                msg: "Invalid Credentials",
                solution: "Try with the correct credentials"
            })
        }

        else {
            const comparedPassword = await bcrypt.compare(password, user.password);
            console.log(comparedPassword)
            // console.log(`Password : ${password} , Password In DB : ${user.password}`);
            if (!comparedPassword) {
                res.status(400).json({
                    success,
                    msg: "Invalid Credentials",
                    solution: "Try with the correct credentials"
                })
            } else {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(data, JWT_TOKEN);
                success = true;
                res.json({
                    success,
                    msg: "User Logged in succesfully",
                    token : authToken
                });
            }
        }
    } catch (error) {
        res.json({
            success,
            msg: "User Cannot be created",
            reason: error.message
        })
    }
})

// Get logged in user details - Login Required
router.post('/getuser', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists()
], fetchUser , async (req, res) => {
    try {
        const userID = req.user.id;
        let user = await UserModal.findById(userID).select("-password");
        if(user){
            res.json({
                user 
            })
        }
    } catch (error) {
        res.json({
            msg: "User Cannot be created",
            reason: error.message
        })
    }
})

module.exports = router;