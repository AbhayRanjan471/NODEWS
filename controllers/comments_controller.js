const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){

    /*
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
    */

    ////// Converting to Aysnc Await ////////
    try{
        //1st find the post by the post id and then create the comment, if there is no post we cannot create a comment
        let post = await Post.findById(req.body.post);

        //if we found the post, now create the comment
        if(post){
           let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

                //when the comments get created we will add comments to the post
                // PostSchema contains the filed comment , which is of type error
                post.comments.push(comment);
                //whenever we are updating something after that we need to call the save()
                post.save();//after calling this it gets save in the dataBase

                res.redirect('/');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
}

//for DELETING the Comments
module.exports.destroy = async function(req, res){

    /*
    Comment.findById(req.params.id , function(err , comment){
        if(comment.user == req.user.id){

            //we will store the Id of the post which is present in the Comment Schema, So that we can delete the comment from the Post Schema also
            //suppose if we deleted the comment without storing the id of post , to fir Post Scehma me jo humne comments array banaya hai usme jo comment hai 
            //use nai hata paye ge .
            let postId = comment.post;

            comment.remove(); //deleting the comment

            //through this we will be deleting the reference Id of the comment , that's why we have store the post Id before deleting the commet
            //  {$pull: {comments: req.params.id}}  : this is the way to pull out the id from the post 
            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err , post){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
    */

    ///// Converting it to Aysnc Await //////////
    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            //we will store the Id of the post which is present in the Comment Schema, So that we can delete the comment from the Post Schema also
            //suppose if we deleted the comment without storing the id of post , to fir Post Scehma me jo humne comments array banaya hai usme jo comment hai 
            //use nai hata paye ge .
            let postId = comment.post;

            comment.remove(); //deleting the comment

            let post = await  Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
        
    }catch(err){
        console.log('Error', err);
        return;
    }
}