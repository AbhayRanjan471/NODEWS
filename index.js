const express = require('express');
const app = express();
const port = 8000;

// recuring the express-ejs-layout
const expressLayouts = require('express-ejs-layouts');

//middleawre
//setting up the static file , in this we will tell for which folder should the file look out for the static file
app.use(express.static('./assets'));

//now after getting the express-ejs library we will tell our app to use it
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts', true);

//use express router
app.use('/' , require('./routes'))

//middleware
//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

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