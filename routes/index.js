//making this index.js as the entry point for all the routes

//import express
const express = require('express')
//The express. Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests.
//route is the entry point of all the request from browser , it is the place where u get to know which controlroller function or action is to be called  
const router = express.Router();
console.log('router loaded')

//import home_controller
const homeController = require('../controllers/home_controller');
const { route } = require('./posts');



router.get('/' ,homeController.home);

//this route handle the user request
//when any request will came for /user it will require users
router.use('/user', require('./users'));

//this route handle the post request
router.use('/posts', require('./posts'));

// for anyfurther routes, access from here
//Syntex: router.use('/routerName', require('./routerfile'));




//we need to export so that it's available to other files 
//after exporting this router we will tell the index.js file app to use it
module.exports = router;