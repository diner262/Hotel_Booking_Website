var express = require('express');
const { userController } = require('../controllers/userController');
var router = express.Router();


router.get('/:username', userController.getUserByUN);

router.post('/update/:username', userController.updateUser);
router.get('/update/:username', userController.updateUser);

module.exports = router;
