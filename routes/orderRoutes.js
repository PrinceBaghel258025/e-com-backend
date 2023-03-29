const express = require('express')

const router = express.Router()

const orderController = require('../controllers/orderController')

router.get('/', orderController.getAllOrders)
router.get('/order-by-user/:userId', orderController.getOrderByUser)
router.post('/create-order', orderController.createOrder)
router.patch('/update-order/:orderId', orderController.updateOrder)
router.delete('/:orderId', orderController.deleteOrder)
router.get('/:orderId', orderController.getSingleOrder)
module.exports = router;