const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){

    /*
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
   */

   /// Converting to Async Await
   try{
    //creating a new Post
    //saving the data coming from the 'form' into the data base
    //will wait till the post get created
       await Post.create ({
            content: req.body.content,
            user: req.user._id // we just want to store the user id nd not whole user so we did this
       });

       return res.redirect('back');
   }
   catch(err){
      console.log('Error', err);
      return;
   }
}

// for DELETING the post
module.exports.destroy = async function(req, res){
    
    /*
     //before deleting a post we need to find weither it exist or not
     Post.findById(req.params.id , function(err, post){
        //Check for autherasition, so that the user who has posted it is only allowed to delete it
        // .id means converting the object id into String
         
        if(post.user == req.user.id){
            post.remove();
            //we will delete all the comment related to that post and if suppose there is an error we will return back
            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            })
        }
        else{
            //when the user didn't matched
            return res.redirect('back');
        }
     });
     */

     
    ///// Converting to Async Await  /////
    try{
         //before deleting a post we need to find weither it exist or not
        let post = await  Post.findById(req.params.id);

         //Check for autherasition, so that the user who has posted it is only allowed to delete it
        // .id means converting the object id into String
        if(post.user == req.user.id){
            post.remove();
            //we will delete all the comment related to that post and if suppose there is an error we will return back
            await Comment.deleteMany({post: req.params.id});
            
            return res.redirect('back');
        }
        else{
            //when the user didn't matched
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
}