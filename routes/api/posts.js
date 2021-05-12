const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const Post = require('../../models/posts');
const User = require('../../models/Users');
const auth = require('../../middleware/auth');
//const checkObjectId = require('../../middleware/checkObjectId')

//router api/posts

router.post(
    '/',
    auth,
    check('text', 'Text is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
  
        const newPost = new Post({
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        });
  
        const post = await newPost.save();
  
        res.json(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

// router get API POSTS api/posts

router.get('/' , auth , async (req, res)=>{
    try {
        const posts = await Post.find().sort({date:-1});
        res.json(posts) ;
    } catch (err) {
         
        console.err(err.message);
        res.send(500).json('server error');
    }
});


// get a POST BY ID
//router /api/post/:id

router.get('/:id' , auth ,async(req,res)=>{

    try {
        const post = await Post.findById(req.params.id);

        if(!post){

            return res.json({ msg:'POST NOT FOUND'});

        }
        res.json(post);
    } catch (err) {

        console.err(err.message);
        res.send(500).json('server error');
        
    }
});

//DELETE A POST BY ID


router.delete('/:id' , auth, async(req,res)=>{

    try {
        const post = await Post.findById(req.params.id);

        if(!post){

            return res.json({ msg:'POST NOT FOUND'});

        }

        //check user

        if(post.user.toString() !== req.user.id){
            res.status(401).json({msg:"POST NOT AUTHORIZED"})
        }
        await post.remove();
        res.json({msg:'Post removed'});
    } catch (err) {

        console.err(err.message);
        res.send(500).json('server error');
        
    }
});


// //POST LIKES
router.put('/like/:id', auth,  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has already been liked
      if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ msg: 'Post already liked' });
      }
  
      post.likes.unshift({ user: req.user.id });
  
      await post.save();
  
       res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


//   // @route    PUT api/posts/unlike/:id
// // @desc     Unlike a post
// // @access   Private
router.put('/unlike/:id', auth,  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has not yet been liked
      if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
  
      // remove the like
      post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route    POST api/posts/comment/:id
  // @desc     Comment on a post
  // @access   Private
  router.post(
    '/comment/:id',
    auth,
   
    check('text', 'Text is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
  
        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        };
  
        post.comments.unshift(newComment);
  
        await post.save();
  
        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  // @route    DELETE api/posts/comment/:id/:comment_id
  // @desc     Delete comment
  // @access   Private
  router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Pull out comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      post.comments = post.comments.filter(
        ({ id }) => id !== req.params.comment_id
      );
  
      await post.save();
  
      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  });



module.exports = router;