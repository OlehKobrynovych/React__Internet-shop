const mongoose = require('mongoose')

const ShopsSchema = mongoose.Schema({
	name: {
        type: String,
        required: false,
        
    },
	facebook_url: {
        type: String,
        required: false,
        
    },
	instagram_url: {
        type: String,
        required: false,
        
    },
	contact_number: {
        type: String,
        required: false,
        
    },
	contact_number_two: {
        type: String,
        required: false,
        
    },
	location: {
        type: String,
        required: false,
        
    },
	owner_id: {
        type: String,
        required: false,
        
    },
}, { collection: 'shops' })
const Shops = module.exports = mongoose.model('Shops', ShopsSchema)

module.exports.create_shops = function (create_data) {
    return Shops.create(create_data)
}

module.exports.update_shops = function (shops_id, update_data) {
    return Shops.updateOne({ _id: shops_id }, update_data)
}

module.exports.get_shops = function (shops_id) {
    return Shops.findOne({ _id: shops_id })
}

module.exports.get_all_shops = function () {
    return Shops.find({})
}

module.exports.delete_shops = function (shops_id) {
    return Shops.deleteOne({ _id: shops_id })
}
    