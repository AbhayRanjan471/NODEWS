const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    //1st find the post by the post id and then create the comment, if there is no post we cannot create a comment
    Post.findById(req.body.post, function(err, post){
        //if we found the post
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                //handle error
                if(err){
                    console.log("Error" , error);
                    return;
                }
                //when the comments get created we will add comments to the post
                post.comments.push(comment);
                //whenever we are updating something after that we need to call the save()
                post.save();//after calling this it gets save in the dataBase

                res.redirect('/');
            })
        }
    })
}