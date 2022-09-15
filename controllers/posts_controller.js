const Post = require('../models/post');

module.exports.create = function(req, res){
    //creating a new Post
    //saving the data coming from the 'form' into the data base
   Post.create ({
    content: req.body.content,
    user: req.user._id // we just want to store the user id nd not whole user so we did this
   }, function(err, post){
    if(err){
        console.log('erro in creating a post');
        return;
    }
    return res.redirect('back');
   });
}