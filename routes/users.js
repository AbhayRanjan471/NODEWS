const express = require('express');
const { route } = require('.');
const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');
                    
                     //middleware function whcih we created in passprot-local-strategy.js
router.get('/profile/:id',passport.checkAuthentication ,usersController.profile);
router.post('/update/:id', passport.checkAuthentication , usersController.update);

router.get('/sign-up',usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.post('/create' , usersController.create);

//use passport as a middle to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},//if the user fail to sign-in
) , usersController.createSession );

router.get('/sign-out', usersController.destroySession);

module.exports = router;