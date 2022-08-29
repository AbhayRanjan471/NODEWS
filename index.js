const express = require('express');
const app = express();
const port = 8001;


app.listen(function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
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