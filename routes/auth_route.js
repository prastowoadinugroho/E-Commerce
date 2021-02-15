const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {check, validationResult} = require('express-validator');
const gravatar = require('gravatar');

const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/', auth, async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/register', [
    check('name', 'Name is required').notEmpty(), 
    check('email', 'Please include a valid email').isEmail(), 
    check('password', 'Please enter a password with 5 or more characters').isLength({
        min: 5
    })
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { name, email, password } = req.body;

    try {
        //check if user already exist
        let user = await User.findOne({email});

        //if user exist
        if(user){
            return res.status(400).json({
                errors: [
                    {
                        message: 'User already exists',
                    },
                ],
            });
        }

        //if not exists user get gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name, email, avatar, password
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //insert to db
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: 360000
            },
            (err, token) => {
                if(err) throw err;
                res.json({token})
            }
        )
    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})

router.post('/login', [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists()
], async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    //if oke => get email & pass from req body
    const {email, password} = req.body;

    try {
        let user = await User.findOne({
            email
        });

        if(!user){
            return res.status(400).json({
                errors: [{
                    message: 'Invalid credentials'
                }]
            })
        }

        //password match
        const isMatch = await bcrypt.compare(password, user.password);

        //not match password
        if(!isMatch){
            return res.status(400).json({
                errors: [{
                    message: 'Invalid credentials'
                }]
            })
        }

        //payload jwt
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: 360000
            }, (err, token) => {
                if(err) throw err;
                res.json({
                    token
                })
            }
        )
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;