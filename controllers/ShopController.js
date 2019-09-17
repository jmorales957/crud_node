const Product = require('../models/Product')
const Cart = require('../models/Cart')

exports.index = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('products/shop', {
            prods: products,
            pageTitle: 'List'
        })
    })
}

exports.home = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('products/index', {
            prods: products,
            pageTitle: 'List'
        })
    })
}

exports.cart = (req, res, next) => {
    Cart.index(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (product of products) {
                const CartProductData = cart.products.find(prod => prod.id === product.id)
                if (CartProductData) {
                    cartProducts.push({productData: product, qty: CartProductData.qty})
                }
            }
            res.render('products/cart', {
                path: '/cart',
                prods: cartProducts
            })
        })
    })

}

exports.postCart = (req, res, next) => {
    const id = req.body.id
    Product.findById(id, product => {
        Cart.addProduct(id, product.price)
    })
    res.redirect('/products')
}

exports.chekcout = (req, res, next) => {
    res.render('products/checkout', {
        path: '/cart'
    })
}

exports.show = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id, (product) => {
        res.render('products/product-detail', {
            product: product
        })
    })

}

exports.delete = (req,res,next) => {
const id = req.body.id
    Product.findById(id, product => {
        Cart.deleteProduct(id,product.price)
        res.redirect('/cart')

    })
}
