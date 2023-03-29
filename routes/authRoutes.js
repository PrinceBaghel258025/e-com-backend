const express = require('express')
const authController = require('../controllers/authController')
const {loginCheck, isAuth, isAdmin} = require('../middleware/auth')

const router = express.Router();

router.post('/isadmin', authController.isAdmin)
router.post('/signup', authController.signup)
router.post('/signin', authController.signin)
router.get('/user', loginCheck, isAuth, isAdmin, authController.allUsers)


module.exports = router;