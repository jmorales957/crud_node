const fs = require('fs')
const path = require('path')
const rootDir = require('../util/path')
const Cart = require('../models/Cart')

const p = path.join(rootDir,'data','products.json')

const getProductsFromFile = (cb) => {
    fs.readFile(p,(e,fileContent) => {
        if (e) {
            cb([])
        } else {
            cb(JSON.parse(fileContent))
        }
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save () {
        getProductsFromFile(products => {
            if (this.id) {

                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProducts = [...products]
                updatedProducts[existingProductIndex] = this
                fs.writeFile(p,JSON.stringify(updatedProducts), (e) => {
                    console.log(e)
                })

            }else {
                this.id = Math.random().toString()
                products.push(this)
                fs.writeFile(p,JSON.stringify(products), (e) => {
                    console.log(e)
                })
            }
        })
    }

    static delete(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id)
            const updatedProducts = products.filter( productID => productID.id !== id )
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price)
                }
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(productID => productID.id === id )
            cb(product)
        })
    }
}