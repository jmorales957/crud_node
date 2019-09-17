const Product = require('../models/Product')
exports.create = (req,res,next) => {
    res.render('products/add-product',{
        pageTitle: 'List'
    })
}

exports.store = (req,res,next) => {
    const title = req.body.title
    const imageUrl = req.body.image
    const description = req.body.description
    const price = req.body.price
    const product = new Product(null, title,imageUrl,description,price)
    console.log(product)
    product.save()
    res.redirect('/products')
}

exports.index = (req,res,next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'List'
        })
    })
}

exports.edit = (req,res,next) => {
    const id = req.params.id
    Product.findById(id,p => {
        res.render('admin/edit-product', {
            product: p
        })
    })
}

exports.update = (req,res,next) => {
    const id = req.body.id
    const title = req.body.title
    const imageUrl = req.body.image
    const description = req.body.description
    const price = req.body.price
    const product = new Product(id, title,imageUrl,description,price)
    product.save()
    res.redirect('/admin/products')
}

exports.delete = (req,res,next) => {
    const id = req.body.id
    Product.delete(id)
    res.redirect('/admin/products')

}