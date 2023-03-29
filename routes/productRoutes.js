const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.getAllProducts);
router.get('/products-by-category', productController.getProductByCategory);
router.get('/products-by-price', productController.getProductByPrice);

router.post('/add-product', productController.addProduct)
router.patch('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)
router.get('/:id', productController.getSingleProduct )


module.exports = router;