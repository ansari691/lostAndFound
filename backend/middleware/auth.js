const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(400).json({ msg : 'token not found'});     
    }

    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));  
        
        req.user = decoded.user;
        next();
    }
    catch(err){
        res.status(400).json({ msg : 'invalid token'})
    }
    
}