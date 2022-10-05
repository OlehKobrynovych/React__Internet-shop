const auth = require('../../middlewares/auth')
const create_categories = require('./create_categories')
const update_by_id_categories = require('./update_categories')
const select_all_from_categories = require('./get_all_categories')
const select_by_id_categories = require('./get_categories')
const delete_by_id_categories = require('./delete_categories')

const express = require('express')
const router = express.Router()

router.post('/', auth, create_categories)
router.put('/:id', auth, update_by_id_categories)
router.get('/:id/all', select_all_from_categories)
router.get('/:id', select_by_id_categories)
router.delete('/:id', auth, delete_by_id_categories)

module.exports = router
    