var express = require('express');
const { userController } = require('../controllers/userController');


var { ensureAuth, forwardAuth } = require('../middlewares/authClient');

var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:username', ensureAuth, userController.getUserByUN);

// router.post('/update/:username', function (req, res) {
//     const username = req.params.username;
//     const { phone, birthday, gender, address } = req.body;
//     console.log("Thong tin user: " + username);
//     console.log("Thong tin user: " + phone);
//     console.log("Thong tin user: " + birthday);
//     console.log("Thong tin user: " + gender);
//     res.redirect('/profile/' + username);
//     // res.redirect(username);
// });
router.post('/update/:username', userController.updateUser);
// router.get('/update/:username', userController.updateUser);

module.exports = router;
