const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    //1st find the post by the post id and then create the comment, if there is no post we cannot create a comment
    Post.findById(req.body.post, function(err, post){
        //if we found the post, now create the comment
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                //handle error
                if(err){
                    console.log("Error creating the comment" , error);
                    return;
                }
                //when the comments get created we will add comments to the post
                // PostSchema contains the filed comment , which is of type error
                post.comments.push(comment);
                //whenever we are updating something after that we need to call the save()
                post.save();//after calling this it gets save in the dataBase

                res.redirect('/');
            })
        }
    })
}