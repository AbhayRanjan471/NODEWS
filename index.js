const express = require('express');
//reqyiring the cookie
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
// requring the express-ejs-layout
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session coookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');

//middleware can be used to manipulate data, we can change data
app.use(express.urlencoded());



//tell the app to use cookie
app.use(cookieParser());

//middleawre
//setting up the static file , in this we will tell for which folder should the file look out for the static file
app.use(express.static('./assets'));

//now after getting the express-ejs library we will tell our app to use it
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts', true);



//middleware
//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial', //name of the cookie is codeial
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false, //whenever there is a request which is not inililize which means user has not logged-in on that case we don't want to save the extra data so we set it to false 
    resave: false,//if some sort of data is present in the session data(users inform) , using this there is no need to write user data again and again 
    //giving an age to the cookies , that for how long it will survive nd after that it will expire
    cookie: {
        maxAge: (1000 * 60 * 100) //its calculated in mili-sec
    },
    store: MongoStore.create(
        {
        // mongooseConnection: db,
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'

        },
        function(err){
            console.log(err || 'connect-mongodb steup ok')
        }
    )
}));
//tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());
//set up the current user which we created in the passport-local-strategy.js
app.use(passport.setAuthenticatedUser);

//use express router
app.use('/' , require('./routes'))

app.listen(port , function(err){
    if(err){
        console.log(`Error on runnnnning the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})


/*
step1: npm init
step2: npm install express 
step3: npm install ejs (to use the templates ie, the view engine)
*/ 

/*
 Note: if we want to make a common command to run our server instead of nodemon index.js
 we will go to the file package.json under the script part we will
 "start": "nodemon index.js"
now after doing this we can run our server using ( npm start)
*/

/* Installing express ejs library to make a common layout
 npm install express-ejs-layouts
*/

/* Sst up our own cookies , using cookies parser
step1: npm install cookie-parser   // in the terminal
step2:we will require 'cookie-parser'
step3: we will tell the app to use it

*/

/* Authentication STeps
1. Create user (Sign up)
2. Create session (Sign In)
3. show details of signed in user on profile page
4. sigh out */

/* Installing Passport.js 
// https://www.passportjs.org/packages/passport-local/
step1: npm install passport
step2: npm install passport-local
step3: npm install express-session 
*/

/*Setting up MOngo store for session cookies
step1: npm install connect-mongo */