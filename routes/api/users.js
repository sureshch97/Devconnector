const bcrypt= require('bcryptjs');
const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

const User = require('../../models/Users')


//@router POST/api/users
//desc test
//access public
router.post('/' ,[
    check('name' , 'Name is Required').not().isEmpty(),
    check('email' , 'Email is required').isEmail(),
    check('password' , 'Password minimum length is 6 or more').isLength({min:6})
], 
    async(req,res)=>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {name , email , password} = req.body;

       //find if user already exits

        try {
            
           let user = await User.findOne({email});
           if(user){
              res.status(400).json({errors:[{message:'User Already Exists'}]});
           }

          //Gravatar
           const avatar = gravatar.url(email,{
               s:'200',
               r:'pg',
               d:'mm'
           });

           user = new User({
               name,
               email,
               password,
               avatar
           });

        //Password Bcrypt
           const salt = await bcrypt.genSalt(10);

           user.password= await bcrypt.hash(password , salt);

           await user.save();

        //return JSON webtoken
        const payload={
            user:{
                id:user.id
            }
        }
          jwt.sign(
              payload,
              config.get('jwtSecret'),
              {expiresIn:'5 days'},
              (err,token)=>{
                  if(err) throw err;
                  
                  res.json({token});

              });
        
        } catch (error) {

            res.status(500).json('server error');
            
        }
    });

module.exports = router;