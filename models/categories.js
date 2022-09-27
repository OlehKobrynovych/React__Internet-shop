const mongoose = require('mongoose')

const CategoriesSchema = mongoose.Schema({
	name: {
        type: String,
        required: false,
        
    },
	image_url: {
        type: String,
        required: false,
        
    },
	parent_id: {
        type: String,
        required: false,
        
    },
	shop_id: {
        type: String,
        required: false,
        
    },
}, { collection: 'categories' })
const Categories = module.exports = mongoose.model('Categories', CategoriesSchema)

module.exports.create_categories = function (create_data) {
    return Categories.create(create_data)
}

module.exports.update_categories = function (categories_id, update_data) {
    return Categories.updateOne({ _id: categories_id }, update_data)
}

module.exports.get_categories = function (categories_id) {
    return Categories.findOne({ _id: categories_id })
}

module.exports.get_all_categories = function () {
    return Categories.find({})
}

module.exports.delete_categories = function (categories_id) {
    return Categories.deleteOne({ _id: categories_id })
}
    