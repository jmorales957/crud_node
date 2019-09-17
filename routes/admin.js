const express = require('express')

const AdminController = require('../controllers/AdminController')

const router = express.Router()

router.get('/add-product',AdminController.create)
router.post('/add-product',AdminController.store)
router.get('/products',AdminController.index)
router.get('/edit-product/:id',AdminController.edit)
router.post('/edit-product/',AdminController.update)
router.post('/delete-product/',AdminController.delete)

module.exports= router