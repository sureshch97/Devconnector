const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req,res,next){

   //GET Token
    const token = req.header('x-auth-token');

   //NOT Token

    if(!token){

        res.status(401).json({msg:'No Token Authorization is denied'});
    }

    try {
        
        const decoded = jwt.verify(token , config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (error) {

        res.status(401).json({message:'Token is not valid'});
        
    }

};