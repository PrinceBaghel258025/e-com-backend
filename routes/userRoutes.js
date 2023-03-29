const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const User = require('../models/userModel')

router.get('/all-user', userController.getAllUsers)
router.get('/:id', userController.getSingleUser)
router.post('/addUser', userController.addUser)
// router.patch('/update-user', userController.updateUser)
router.patch('/:id', userController.updateUser)
// router.delete('/delete-user', userController.deleteUser)
router.delete('/:id', userController.deleteUser)
router.patch('/change-password/:id', userController.changePassword)


module.exports = router;
