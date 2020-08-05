const express = require('express');
const {check , validationResult} = require('express-validator');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

//registering a user
router.post('/', [
    check('name','name is required').notEmpty(),
    check('email','enter email in correct format').isEmail(),
    check('password','enter password with 6 or more characters').isLength({min : 6}),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors : errors.array()} );
    }
    const {name, email, password, phone} = req.body;

    try{
        
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({ errors : [{msg : 'user already exists'}] });
        }

        
        user = new User({
            name,
            email,
            password,
            phone
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();

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

//updating a user
router.put('/',auth, async (req,res) => {
    const user = await User.findById(req.user.id);
    console.log(req.user.id);
    const { name, phone, email, password } = req.body;

    user.name = name;
    user.phone = phone;
    user.email = email;
    user.password = password;

    const salt = await bcrypt.genSalt(10);

    try {
        user.password = await bcrypt.hash(user.password,salt);    
    } catch (err) {
        console.log(err);
    }
    
    await user.save();

    res.json(user);
});

//getting all users
router.get('/', async (req, res) => {
    const users = await User.find();
    return res.json(users);
});

module.exports = router;