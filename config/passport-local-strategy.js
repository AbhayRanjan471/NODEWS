//import the passport
const passport = require('passport');
//requiring the passport local library 
//and .Strategy specify that specially we are requiring the Strategy libarary
const LocalStrategy = require('passport-local').Strategy;

//requiring the user
const User = require('../models/user');

// authentication using passport
//we are telling the passport to use this LocalStrategy
passport.use(new LocalStrategy({
    //the thing which we are going to keep unique
    usernameField: 'email',
    passReqToCallback: true
   },
   //callback function
   function(req,email, password , done){
       //find a user and establish the identity
       //{email(this email is the property which we are looking at , which is on the Schema): email(this email is the value which is passed in the above function)}
       User.findOne({email: email}, function(err, user){
         
        if(err){
            //represent a flash message when there is an error
             req.flash('error', err);
            //done() takes two argument 1st the error and 2nd something
            return done(err);
        }
        //if the user is not found or the password donesn't match
        if(!user || user.password != password){
            req.flash('error', 'Invalid Username/Password');
            return done(null, false);
        }
        //if the user if found we just pass-on the user
        //it will return the user to the Serializer
        return done(null, user);
       });
   }
));

// **Note: Session DATA means USERS information

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    //we want to store user id in the encripted formate into the cookie
    //Serializing has user but it only passes the user_id to the session cookie OR
    //it will store only the user.id in the session cookie
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        //deserializing is just opposite of the Serializing it takes the user id and passes the user
        return done(null, user);
    });
});


// Check if the user is authenticated
//we will use this as a middleware
passport.checkAuthentication = function(req, res, next){
    //if the user is signes-in , then pass on the request to the next funciton(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed-in
    return res.redirect('/user/sign-in');
}

//set the user for Views ones the user has sign-in
//will use this middleware to check weither the user has sign-in or not
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the view
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;