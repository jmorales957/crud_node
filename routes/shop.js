const express = require('express')
const ShopController = require('../controllers/ShopController')
const router = express.Router()

router.get('/', ShopController.home)
router.get('/products', ShopController.index)
router.get('/cart', ShopController.cart)
router.post('/cart', ShopController.postCart)
router.post('/delete-to-cart', ShopController.delete)
router.get('/checkout', ShopController.chekcout)
router.get('/products/:id', ShopController.show)

module.exports = router