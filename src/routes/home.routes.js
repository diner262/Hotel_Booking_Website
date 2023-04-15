var express = require('express');
var router = express.Router();

var { 
    validateSignUp, 
    validateLogin, 
    handleLoginClient 
} = require('../middlewares/validateForm');
var homeController = require('../controllers/homeController');
var { forwardAuth } = require('../middlewares/authClient');

router.post('/login', forwardAuth, validateLogin(), handleLoginClient, homeController.authenticateLogin);
router.post('/signup', validateSignUp(), homeController.regiterNewUser);

router.get('/login', forwardAuth, homeController.login)
router.get('/logout', homeController.logout)
router.get('/signup', forwardAuth, homeController.signup)
router.get('/home', homeController.home)
router.get('/', (req, res) => {
    res.redirect('home')
});



module.exports = router;