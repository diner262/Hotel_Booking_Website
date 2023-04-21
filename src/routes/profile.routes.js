var express = require('express');
const { userController } = require('../controllers/userController');
var { ensureAuth, forwardAuth } = require('../middlewares/authClient');
var router = express.Router();

router.get('/:username', ensureAuth, userController.getUserByUN);

router.post('/update/:username', userController.updateUser);

module.exports = router;
