const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const axios = require('axios')
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const { check, validationResult } = require('express-validator');




//@router GET/api/profile
//desc test
//access public
router.get('/me' ,auth, async (req,res)=>{


    try {
        
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
    if(!profile){
        res.status(500).json('No Profile for this user')
    }

    res.json(profile);

    } catch (error) {
        console.log(error.message)
        res.status(400).json('server error');
        
    }
    
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private

router.post('/' ,
     auth , 
    check('skills', 'skills is required').notEmpty(),
    check('status', 'status is required').notEmpty(),

    async (req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json(400).json({errors:errors.array()});
    }

    //destructure the request
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        facebook,
        twitter,
        linkedin,
        instagram,
        youtube
    }=req.body;

    //build a profile object

    const profileFields = {};
    profileFields.user = req.user.id ;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills)
    {
         profileFields.skills = skills.split(',').map(skill=>skill.trim());
    }
 

    //build social projects
    const socialFields = {};
    socialFields.user = req.user.id;
    if(facebook) socialFields.facebook = facebook;
    if(twitter) socialFields.twitter = twitter;
    if(instagram) socialFields.instagram = instagram;
    if(youtube) socialFields.youtube = youtube;
    if(linkedin) socialFields.linkedin = linkedin;

      // add to profileFields
      profileFields.social = socialFields;

   try{
       let profile = await Profile.findOne({user:req.user.id});

       if(profile){
           //update
           profile = await Profile.findOneAndUpdate(
             {user:req.user.id},
             {$set:profileFields},
             {new:true}
            );
            return res.json(profile);
       }
       //create profile
       profile = new Profile(profileFields);
        
       console.log(profile);
       await profile.save();
       res.json(profile);
   }

   catch(err){
        console.error(err.message);
        res.status(500).send('server Error');
   }


});


// @route    GET api/profile
// @desc     get all profiles
// @access   Public
router.get('/' , async(req,res)=>{

    try {

        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
        
    } catch (err) {

        console.err(err.message);
        res.status(500).send('server error');
        
    }
 });


  // @route    GET api/profile/user/:user_id
// @desc      GET profile by id
// @access    Public
router.get('/user/:user_id' , auth , async(req,res)=>{

    try {

        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);

        if(!profile) return res.status(400).json({msg:'Profile not found'});
        res.json(profile);
        
    } catch (err) {

        console.err(err.message);
        res.status(500).send('server error');
        
    }
 });


 //route delete api/profile
 //desc delete the user

 router.delete('/' , auth, async(req,res)=>{

    try {
        //remove user by id
        await Profile.findOneAndRemove({user:req.user.id});

        await User.findOneAndRemove({_id:req.user.id});
        res.json({msg:'user deleted'})
    } catch (err) {

        console.err(err.message);
        res.status(500).send('server error')
        
    }
 });


 //route put api/profile/experience
 //desc  add experience

 router.put('/experience' , 
 [
     auth,
     [
     check('title', 'title is required').not().isEmpty(),
     check('company' , 'company is required').not().isEmpty(),
     check('from', 'from date is required').not().isEmpty()

 ]
], async (req,res)=>{
    const errors = validationResult(req);
     if(!errors.isEmpty()){

        res.status(400).json({errors:errors.array()});
     }

    const{

        title,
        company,
        location,
        from,
        to,
        current,
        description
        
    }= req.body

    const newExp = {

        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({user:req.user.id});

         profile.experience.unshift(newExp);
     
         await profile.save();
        
        res.json(profile);

    } catch (err) {
         console.error(err.message);
         res.json(500).send('server error');
    }
 });


 //route delete api/profile/exprience/:exp_id
 //desc delete the user experience by id

 router.delete('/experience/:exp_id' , auth, async (req,res)=>{

    try {
     const profile = await Profile.findOne({user:req.user.id});

     //Get Remove Index
     const removeIndex =  profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
     profile.experience.splice(removeIndex,1);
     await profile.save();
     res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(400).send('server error');
    }
});


 //route put api/profile/education
 //desc  add experience


 router.put('/education' , 
 [
     auth,
     [
     check('school', 'school is required').not().isEmpty(),
     check('degree' , 'degree is required').not().isEmpty(),
     check('fieldofStudy', 'fieldofStudy is required').not().isEmpty()

 ]
], async (req,res)=>{
    const errors = validationResult(req);
     if(!errors.isEmpty()){

       return  res.status(400).json({errors:errors.array()});
     }

    const{

        school,
        degree,
        fieldofStudy,
        from,
        to,
        current,
        description
        
    }= req.body

    const newEdu= {

        school,
        degree,
        fieldofStudy,
        from,
        to,
        current,
        description
    };
       
    try {
        const profile = await Profile.findOne({user:req.user.id});
       
        
       profile.education.unshift(newEdu);

        await profile.save();
        
       console.log('data i snot ')
       return  res.status(200).json(profile);
    } catch (err) {
         console.error(err.message);
        return res.json(500).send('server error');
    }
 });

  //route delete api/profile/exprience/:exp_id
 //desc delete the user experience by id

 router.delete('/education/:edu_id' , auth, async (req,res)=>{

    try {
     const profile = await Profile.findOne({user:req.user.id});

     //Get Remove Index
     const removeIndex =  profile.education.map(item=>item.id).indexOf(req.params.edu_id);
     profile.education.splice(removeIndex,1);
     await profile.save();
     res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(400).send('server error');
    }
});

//GET GITHUB REPOS
//route /api/profile/

//  router.get('/github/:username' , (req,res)=>{

//     try {

//         const options={
//             uri:`https://api.github.com/users/${req.params.username}/repos?
//             per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}
//             &client_secret=${config.get('githubSecret')}`,
//             method:'GET',
//             headers:{
//                 'user-agent':'node.js'}
//             };

//             request(options,(response,error,body)=>{
    
//                 if(response.statusCode !== 200){
//                     res.status(405).json({msg:'No Github Profile Found'});
//                 };
//                 if(error){
//                     console.log(error.msg)
//                 }

//                  res.json(JSON.parse(body));
//             });
        
//     } catch (err) {

//         console.error(err.message);
//         res.json(500).send('server error');
        
//     }
//  })



 router.get('/github/:username', async (req, res) => {
    try {
      const uri = encodeURI(
        `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
      );
      const headers = {
        'user-agent': 'node.js'
        //Authorization: `token ${config.get('githubToken')}`
      };
  
      const gitHubResponse = await axios.get(uri, { headers });
      return res.json(gitHubResponse.data);
    } catch (err) {
      console.error(err.message);
      return res.status(404).json({ msg: 'No Github profile found' });
    }
  });

module.exports = router;