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
    usernameField: 'email'
   },
   //callback function
   function(email, passowrd , done){
       //fincd a user and establish the identity
       //{email(this email is the property which we are looking at , which is on the Schema): email(this email is the value which is passed in the above function)}
       User.findOne({email: email}, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            //done() takes two argument 1st the error and 2nd something
            return done(err);
        }
        //if the user is not found or the password donesn't match
        if(!user || user.passowrd != passowrd){
            console.log('Invalid Username/Password');
            return done(null, false);
        }
        //if the user if found we just pass-on the user
        return done(null, user);
       });
   }
));

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    //we want to store user id in the encripted formate into the cookie
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
    });
});

module.exports = passport;