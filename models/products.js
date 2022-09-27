const mongoose = require('mongoose')

const ProductsSchema = mongoose.Schema({
	shop_id: {
        type: String,
        required: false,
        
    },
	category_id: {
        type: String,
        required: false,
        
    },
	name: {
        type: String,
        required: false,
        
    },
	price: {
        type: Number,
        required: false,
        
    },
	new_price: {
        type: Number,
        required: false,
        
    },
	images: {
        type: Array,
        required: false,
        
    },
	details: {
        type: String,
        required: false,
        
    },
	colors: {
        type: Array,
        required: false,
        
    },
	sizes: {
        type: Array,
        required: false,
        
    },
}, { collection: 'products' })
const Products = module.exports = mongoose.model('Products', ProductsSchema)

module.exports.create_products = function (create_data) {
    return Products.create(create_data)
}

module.exports.update_products = function (products_id, update_data) {
    return Products.updateOne({ _id: products_id }, update_data)
}

module.exports.get_products = function (products_id) {
    return Products.findOne({ _id: products_id })
}

module.exports.get_all_products = function () {
    return Products.find({})
}

module.exports.delete_products = function (products_id) {
    return Products.deleteOne({ _id: products_id })
}
    