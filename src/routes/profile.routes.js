var express = require('express');
const { userController } = require('../controllers/userController');
var { ensureAuth, forwardAuth } = require('../middlewares/authClient');
var router = express.Router();

router.get('/', ensureAuth, userController.getUserByID);

router.post('/update/:username', userController.updateUser);

module.exports = router;
