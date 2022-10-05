const auth = require('../../middlewares/auth')
const create_products = require('./create_products')
const update_by_id_products = require('./update_products')
const select_all_from_products = require('./get_all_products')
const select_by_id_products = require('./get_products')
const delete_by_id_products = require('./delete_products')

const express = require('express')
const router = express.Router()

router.post('/', auth, create_products)
router.put('/:id', auth, update_by_id_products)
router.get('/:id/all', select_all_from_products)
router.get('/:id', select_by_id_products)
router.delete('/:id', auth, delete_by_id_products)

module.exports = router
    