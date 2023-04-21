var express = require('express');
var router = express.Router();

var { 
    validateSignUp, 
    validateLogin, 
    handleLoginClient,
    handleSignUp
} = require('../middlewares/validateForm');
var homeController = require('../controllers/homeController');
var { ensureAuth,forwardAuth } = require('../middlewares/authClient');

router.post('/login', forwardAuth, validateLogin(), handleLoginClient, homeController.authenticateLogin);
router.post('/signup', forwardAuth, validateSignUp(), handleSignUp, homeController.regiterNewUser);

router.get('/login', forwardAuth, homeController.login)
router.get('/logout', homeController.logout)
router.get('/signup', forwardAuth, homeController.signup)
router.get('/home', homeController.home)
router.get('/room', homeController.room)
router.get('/bookroom/:id',ensureAuth, homeController.bookroom)
router.post('/bookroom/:id', ensureAuth,homeController.bookroomSucess)

router.get('/detail', homeController.detail)
router.get('/bill', homeController.bill)
router.get('/', (req, res) => {
    res.redirect('home')
});



module.exports = router;