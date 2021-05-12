const express= require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const {check , validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt= require('bcryptjs');


//Route GET
//desc authentication
router.get('/' , auth , async (req,res)=>{
    
    try {

        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
       
    } catch (error) {

        res.status(500).send('server error');
        
    }
});

//@router POST/api/auth
//desc Authentication
//access public
router.post('/' ,
    check('email' , 'Email is required').isEmail(),
    check('password' , 'Password is required').exists(),
      

    async (req,res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {email , password} = req.body;

        try {
            
            let user = await User.findOne({email});
            if(!user){
                res.status(400).json({errors:[{message:'Invalid Credentials'}]});
            }

            const isMatch =await bcrypt.compare(password,user.password);

            if(!isMatch){

               return res.status(400).json({errors:[{message:'Invalid Credentials'}]});

            }
    
        //return JSON webtoken
        const payload={
            user:{
                id:user.id
            }
        }
          jwt.sign(
              payload,
              config.get('jwtSecret'),
              
              (err,token)=>{
                  if(err) throw err;
                  res.json({token});

              });
        
        } catch (err) {
            
            console.error(err.message);
            res.status(500).send('server error');
            
        }
    });
module.exports = router;