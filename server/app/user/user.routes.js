const router = require('express').Router();
const userController = require('./user.controller');

router.post('/', userController.signup)
// router.put('/signout', userController.signOut)
router.put('/', userController.signin)

module.exports = router;