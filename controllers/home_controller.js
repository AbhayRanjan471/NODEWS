const { populate } = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')

module.exports.home = async function(req, res){
     
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

    /*
    //POPULATE the user of each Post
    // to fetch out which user has posted the comment we need to pre-populate the user from the the posts database using the refer user_id
    //finding all the post [Post.find({})] and populating user of each post [.populate('user')] after that doing the callBack [.exec(function(err, posts)]
    // sifted the call back in exec
    //we are populating the comment the user who has commented the post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: { //further populate
            path: 'user'
        }
    })
    .exec(function(err, posts){
        // console.log(posts);
         User.find({}, function(err, users){
            return res.render('home',{
                title: 'Codeial | Home',
                posts: posts,
                all_users: users
            })
         })
        
    })
    */

    // Convrting to Async Await 
    try{

        //POPULATE the user of each Post
        // to fetch out which user has posted the comment we need to pre-populate the user from the the posts database using the refer user_id
        //finding all the post [Post.find({})] and populating user of each post [.populate('user')] 
            let posts = await Post.find({})
            .sort('-createdAt') // this is a sort function
            .populate('user')
            .populate({
                path: 'comments',
                populate: { //further populate
                    path: 'user'
                }
            });

        let users = await User.find({});

        return res.render('home',{
            title: 'Codeial | Home',
            posts: posts,
            all_users: users
        });

    }
    catch(err){
        console.log("Error", err);
        return;
    }

}

/* For posts
step1: displayed the posts
step2: prepopulated the user
step3: displayed those user on the home page
*/


//Syntex: module.exports.actionName = function(req, res){}