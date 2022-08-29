//making this index.js as the entry point for all the routes

//import express
const express = require('express')
//The express. Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests.
//route is the entry point of all the request from browser , it is the place where u get to know which controlroller function or action is to be called  
const router = express.Router();
console.log('router loaded')

//import home_controller
const homeController = require('../controllers/home_controller');



router.get('/' ,homeController.home);




//we need to export so that it's available to other files 
//after exporting this router we will tell the index.js file app to use it
module.exports = router;