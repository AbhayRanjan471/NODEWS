const Post = require('../models/post')

module.exports.home = function(req, res){
     
    /*
    //reading the cookies
    //cookie is comming as a request and going back as a resoponse
    console.log(req.cookies);
    //we can change the value of the cookie
    res.cookie('user_id', 35);
    */

    /*
    //through this we can only get the data which is present in the Post database ie, the content and user_id
    Post.find({}, function(err, posts){
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts
        });
    })
    */

    //POPULATE the user of each Post
    // to fetch out which user has posted the comment we need to pre-populate the user from the the posts database using the refer user_id
    //finding all the post [Post.find({})] and populating user of each post [.populate('user')] after that doing the callBack [.exec(function(err, posts)]
    // sifted the call back in exec
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home',{
            title: 'Codeial | Home',
            posts: posts
        })
    })
}

/* For posts
step1: displayed the posts
step2: prepopulated the user
step3: displayed those user on the home page
*/


//Syntex: module.exports.actionName = function(req, res){}