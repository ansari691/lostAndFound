const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const config = require('config');

const router = express.Router();


//get a authenticated user
router.get('/', auth ,async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(error){
        res.status(500).send('server error');
    }
});

//logging in
router.post('/', [
    check('email','please enter a valid email').isEmail(),
    check('password','password is required').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors : errors.array()} );
    }
    const {email, password} = req.body;

    try{
        
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({ errors : [{msg : 'invalid credentials'}] });
        }

        const isMatched = await bcrypt.compare(password,user.password);

        if(!isMatched) return res.status(400).json({errors : [{msg : 'invalid credentials'}]})

        const payload = {
            user : {
                id : user.id
            }
        }
    
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn : 360000}, (err, token) => {
            if(err) throw err
            res.json({token});
        });

        
    }
    
    catch{
        res.status(500).json({ errors : errors.message});
    }
 
});

module.exports = router;