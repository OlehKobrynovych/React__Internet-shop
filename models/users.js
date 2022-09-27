const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
}, { collection: 'users' })

const Users = module.exports = mongoose.model('Users', UserSchema)

module.exports.create_user = function (create_data) {
    return Users.create(create_data)
}

module.exports.update_user = function (user_id, update_data) {
    return Users.updateOne({ _id: user_id }, update_data)
}

module.exports.get_user = function (user_id) {
    return Users.findOne({ _id: user_id })
}

module.exports.get_user_by_email = function (user_email) {
    return Users.findOne({ email: user_email })
}

module.exports.get_all_users = function () {
    return Users.find({})
}

module.exports.delete_user = function (user_id) {
    return Users.deleteOne({ _id: user_id })
}