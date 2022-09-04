// module.exports.profile = function(req, res){
//     res.end('<h1>User Profile</h1>');
// }

const User = require('../models/user')


module.exports.profile = function(req, res){
    return res.render('user_profile' , {
        title: "User Profile"
    });
}

//render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req , res){
    return res.render('user_sign_in', {
        title: "Codieal | Sign In"
    })
}

//get the sign up data
module.exports.create = function(req , res){
    //1st we will check that is the passowrd and the confrm passowrd is same or not if not than we will redirect to the page
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    //2nd if the password is matched we will try to find a user with same email id , bcz the email id should be unique
    // The findOne() function is used to find one document according to the condition.
    User.findOne({email: req.body.email} , function(err, user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        console.log(req.body, "request body is here")
        //if the user is not there we will craete the user
        if(!user){
            User.create(req.body , function(err , user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                //when the user is created we will send the user to 'sign-in' page
                return res.redirect('/user/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })

}

//get the sign in data
module.exports.createSession = function(req, res){
    //TODO later
}