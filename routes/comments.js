const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller')

//added a middleware to check the authentication that the user who is posting is authenticated or not 
//NOw if the user is not authenticated he/she cannot create an action
router.post('/create',passport.checkAuthentication, commentsController.create);

router.get('/destroy/:id' , passport.checkAuthentication , commentsController.destroy);

module.exports = router;