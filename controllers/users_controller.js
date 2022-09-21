// module.exports.profile = function(req, res){
//     res.end('<h1>User Profile</h1>');
// }

const User = require('../models/user')


module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile' , {
            title: "User Profile",
            profile_user: user
        });
    })   
}

// updating the user
module.exports.update = function(req, res){
    //adding this condition so that any loged in user can't change any other user id
    if(req.user.id == req.params.id){
                           // req.body OR {name: req.body.name , email: req.body.email}
        User.findByIdAndUpdate(req.params.id , req.body, function(err, user){
            return res.redirect('back');
        })
    }else{
        return  res.status(401).send('Unauthorized');
    }
}

//render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
       return res.redirect('/user/profile')
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req , res){
    if(req.isAuthenticated()){
       return res.redirect('/user/profile')
    }
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
//Sign in and create a session for the user
module.exports.createSession = function(req, res){
    //TODO later
    //redirecting to the home page
    return res.redirect('/');
}

module.exports.destroySession = function(req , res){
    // this request we get from passport.js
    req.logout(function(err){
        if(err){
            // console.log('getting error while logging out', err);
            // return;
         return next(err);
        }
        return res.redirect('/');
    }); 
     
   
}